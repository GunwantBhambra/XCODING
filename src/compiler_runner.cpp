#include "compiler_runner.hpp"
#include <iostream>
#include <fstream>
#include <sstream>
#include <chrono>
#include <filesystem>
#include <array>
#include <shlwapi.h>

#pragma comment(lib, "Shlwapi.lib")

namespace fs = std::filesystem;

static std::string WideToUtf8Str(const std::wstring& wstr) {
    if (wstr.empty()) return std::string();
    int sizeNeeded = WideCharToMultiByte(CP_UTF8, 0, wstr.data(), (int)wstr.size(), NULL, 0, NULL, NULL);
    std::string str(sizeNeeded, 0);
    WideCharToMultiByte(CP_UTF8, 0, wstr.data(), (int)wstr.size(), &str[0], sizeNeeded, NULL, NULL);
    return str;
}

CompilerRunner::CompilerRunner()
    : m_hasActiveProcess(false),
      m_hStdinWrite(NULL),
      m_hStdoutRead(NULL),
      m_hStderrRead(NULL) {
    ZeroMemory(&m_runningProcInfo, sizeof(m_runningProcInfo));
    FindVisualStudioPaths();
}

CompilerRunner::~CompilerRunner() {
    TerminateActiveProcess();
}

void CompilerRunner::FindVisualStudioPaths() {
    m_vcvars64Path.clear();
    m_vsDevCmdPath.clear();

    // 1. Try vswhere.exe if present
    wchar_t progFiles86[MAX_PATH] = {0};
    if (GetEnvironmentVariableW(L"ProgramFiles(x86)", progFiles86, MAX_PATH) == 0) {
        wcscpy_s(progFiles86, L"C:\\Program Files (x86)");
    }
    fs::path vswherePath = fs::path(progFiles86) / "Microsoft Visual Studio" / "Installer" / "vswhere.exe";
    if (fs::exists(vswherePath)) {
        std::wstring cmd = L"\"\"" + vswherePath.wstring() + L"\" -latest -products * -requires Microsoft.VisualStudio.Component.VC.Tools.x86.x64 -property installationPath\"";
        FILE* pipe = _wpopen(cmd.c_str(), L"rt, ccs=UTF-8");
        if (pipe) {
            wchar_t buffer[1024] = {0};
            std::wstring vsPath;
            if (fgetws(buffer, 1024, pipe)) {
                vsPath = buffer;
                while (!vsPath.empty() && (vsPath.back() == L'\r' || vsPath.back() == L'\n' || vsPath.back() == L' ')) {
                    vsPath.pop_back();
                }
            }
            _pclose(pipe);

            if (!vsPath.empty()) {
                fs::path p = fs::path(vsPath) / "VC" / "Auxiliary" / "Build" / "vcvars64.bat";
                if (fs::exists(p)) {
                    m_vcvars64Path = p.wstring();
                    m_vsDevCmdPath = (fs::path(vsPath) / "Common7" / "Tools" / "VsDevCmd.bat").wstring();
                    return;
                }
                fs::path p32 = fs::path(vsPath) / "VC" / "Auxiliary" / "Build" / "vcvars32.bat";
                if (fs::exists(p32)) {
                    m_vcvars64Path = p32.wstring();
                    m_vsDevCmdPath = (fs::path(vsPath) / "Common7" / "Tools" / "VsDevCmd.bat").wstring();
                    return;
                }
                fs::path pall = fs::path(vsPath) / "VC" / "Auxiliary" / "Build" / "vcvarsall.bat";
                if (fs::exists(pall)) {
                    m_vcvars64Path = pall.wstring();
                    m_vsDevCmdPath = (fs::path(vsPath) / "Common7" / "Tools" / "VsDevCmd.bat").wstring();
                    return;
                }
            }
        }
    }

    // 2. Search common Visual Studio & BuildTools directories across drives C, D, E
    const std::vector<std::wstring> potentialVsRoots = {
        L"C:\\Program Files\\Microsoft Visual Studio\\2022\\Community",
        L"C:\\Program Files\\Microsoft Visual Studio\\2022\\BuildTools",
        L"C:\\Program Files\\Microsoft Visual Studio\\2022\\Professional",
        L"C:\\Program Files\\Microsoft Visual Studio\\2022\\Enterprise",
        L"C:\\Program Files\\Microsoft Visual Studio\\2022\\Preview",
        L"C:\\Program Files (x86)\\Microsoft Visual Studio\\2022\\BuildTools",
        L"C:\\Program Files (x86)\\Microsoft Visual Studio\\2022\\Community",
        L"C:\\Program Files (x86)\\Microsoft Visual Studio\\2019\\Community",
        L"C:\\Program Files (x86)\\Microsoft Visual Studio\\2019\\BuildTools",
        L"C:\\Program Files (x86)\\Microsoft Visual Studio\\2019\\Professional",
        L"C:\\Program Files (x86)\\Microsoft Visual Studio\\2019\\Enterprise",
        L"C:\\Program Files (x86)\\Microsoft Visual Studio\\2017\\Community",
        L"C:\\Program Files (x86)\\Microsoft Visual Studio\\2017\\BuildTools",
        L"C:\\Program Files\\Microsoft Visual Studio\\18\\Community",
        L"C:\\Program Files\\Microsoft Visual Studio\\18\\BuildTools",
        L"C:\\Program Files\\Microsoft Visual Studio\\18\\Enterprise",
        L"C:\\Program Files\\Microsoft Visual Studio\\18\\Professional",
        L"D:\\Program Files\\Microsoft Visual Studio\\2022\\Community",
        L"D:\\Program Files\\Microsoft Visual Studio\\2022\\BuildTools",
        L"D:\\VS2022\\Community",
        L"D:\\VS2022\\BuildTools"
    };

    for (const auto& root : potentialVsRoots) {
        std::wstring vcvars = root + L"\\VC\\Auxiliary\\Build\\vcvars64.bat";
        if (fs::exists(vcvars)) {
            m_vcvars64Path = vcvars;
            m_vsDevCmdPath = root + L"\\Common7\\Tools\\VsDevCmd.bat";
            return;
        }
        std::wstring vcvarsall = root + L"\\VC\\Auxiliary\\Build\\vcvarsall.bat";
        if (fs::exists(vcvarsall)) {
            m_vcvars64Path = vcvarsall;
            m_vsDevCmdPath = root + L"\\Common7\\Tools\\VsDevCmd.bat";
            return;
        }
    }
}

std::wstring CompilerRunner::FindProgramInPath(const std::wstring& exeName) {
    wchar_t fullPath[MAX_PATH] = {0};
    if (SearchPathW(NULL, exeName.c_str(), L".exe", MAX_PATH, fullPath, NULL) > 0) {
        return std::wstring(fullPath);
    }
    return L"";
}

std::vector<ToolchainInfo> CompilerRunner::DetectToolchains() {
    m_toolchains.clear();
    FindVisualStudioPaths();

    // 1. MSVC Toolchain
    ToolchainInfo msvc;
    msvc.id = "msvc";
    msvc.name = "Visual Studio MSVC (cl.exe)";
    msvc.vcvarsPath = m_vcvars64Path;
    msvc.isAvailable = !m_vcvars64Path.empty() || !FindProgramInPath(L"cl").empty();
    m_toolchains.push_back(msvc);

    // 2. GCC / MinGW Toolchain
    ToolchainInfo gcc;
    gcc.id = "gcc";
    gcc.name = "MinGW GCC (g++)";
    gcc.compilerPath = FindProgramInPath(L"g++");
    if (gcc.compilerPath.empty()) {
        const std::vector<std::wstring> gccPaths = {
            L"C:\\msys64\\mingw64\\bin\\g++.exe",
            L"C:\\msys64\\ucrt64\\bin\\g++.exe",
            L"C:\\msys64\\clang64\\bin\\g++.exe",
            L"C:\\MinGW\\bin\\g++.exe",
            L"C:\\w64devkit\\bin\\g++.exe",
            L"C:\\TDM-GCC-64\\bin\\g++.exe",
            L"C:\\Strawberry\\c\\bin\\g++.exe",
            L"C:\\winlibs\\bin\\g++.exe"
        };
        for (const auto& p : gccPaths) {
            if (fs::exists(p)) {
                gcc.compilerPath = p;
                break;
            }
        }
    }
    gcc.isAvailable = !gcc.compilerPath.empty();
    m_toolchains.push_back(gcc);

    // 3. Clang Toolchain
    ToolchainInfo clang;
    clang.id = "clang";
    clang.name = "Clang++";
    clang.compilerPath = FindProgramInPath(L"clang++");
    if (clang.compilerPath.empty()) {
        const std::vector<std::wstring> clangPaths = {
            L"C:\\Program Files\\LLVM\\bin\\clang++.exe",
            L"C:\\msys64\\clang64\\bin\\clang++.exe",
            L"C:\\msys64\\mingw64\\bin\\clang++.exe"
        };
        for (const auto& p : clangPaths) {
            if (fs::exists(p)) {
                clang.compilerPath = p;
                break;
            }
        }
    }
    clang.isAvailable = !clang.compilerPath.empty();
    m_toolchains.push_back(clang);

    return m_toolchains;
}

ToolchainInfo CompilerRunner::GetActiveToolchain(const std::string& id) {
    for (const auto& tc : m_toolchains) {
        if (tc.id == id) return tc;
    }
    if (!m_toolchains.empty()) return m_toolchains[0];
    return { "msvc", "Visual Studio MSVC", L"", L"", false };
}

CompileResult CompilerRunner::Compile(
    const CompileRequest& req,
    std::function<void(const std::string&)> onOutputChunk
) {
    auto startTime = std::chrono::high_resolution_clock::now();
    CompileResult result = { false, -1, 0, 0, 0, "" };

    std::wstring workDir = req.workingDirectory;
    if (workDir.empty()) {
        workDir = fs::path(req.sourceFilePath).parent_path().wstring();
    }
    fs::create_directories(workDir);

    // Re-detect toolchains if necessary
    DetectToolchains();

    // Check available compilers
    std::wstring gccPath;
    std::wstring clangPath;
    for (const auto& tc : m_toolchains) {
        if (tc.id == "gcc" && tc.isAvailable) gccPath = tc.compilerPath.empty() ? L"g++" : tc.compilerPath;
        if (tc.id == "clang" && tc.isAvailable) clangPath = tc.compilerPath.empty() ? L"clang++" : tc.compilerPath;
    }

    bool hasMsvc = !m_vcvars64Path.empty() || !FindProgramInPath(L"cl").empty();
    bool hasGcc = !gccPath.empty();
    bool hasClang = !clangPath.empty();

    // Determine target compiler
    std::string chosenTool = req.options.compilerId;
    if (chosenTool.empty() || chosenTool == "msvc_cl" || chosenTool == "msvc") {
        if (hasMsvc) {
            chosenTool = "msvc";
        } else if (hasGcc) {
            chosenTool = "gcc";
        } else if (hasClang) {
            chosenTool = "clang";
        } else {
            chosenTool = "none";
        }
    }

    // Write temporary batch job file
    std::wstring batchPath = workDir + L"\\compile_job.bat";
    std::ofstream batFile(batchPath, std::ios::out);
    if (!batFile.is_open()) {
        result.rawOutput = "Error: Failed to write build script to disk.";
        return result;
    }

    batFile << "@echo off\n";

    if (chosenTool == "none") {
        batFile << "echo ================================================================================\n";
        batFile << "echo  [XCODING COMPILER DETECTOR] No C++ compiler detected on this computer.\n";
        batFile << "echo ================================================================================\n";
        batFile << "echo.\n";
        batFile << "echo  To compile and execute C++ programs in XCODING, please install a compiler:\n";
        batFile << "echo.\n";
        batFile << "echo  [Option 1: MSVC C++ Build Tools (Recommended)]\n";
        batFile << "echo    Run in PowerShell (Admin):\n";
        batFile << "echo    winget install Microsoft.VisualStudio.2022.BuildTools --override \"--add Microsoft.VisualStudio.Workload.VCTools --includeRecommended --passive\"\n";
        batFile << "echo.\n";
        batFile << "echo  [Option 2: MinGW-w64 GCC (Lightweight)]\n";
        batFile << "echo    Run in PowerShell:\n";
        batFile << "echo    winget install MSYS2.MSYS2\n";
        batFile << "echo.\n";
        batFile << "exit /b 1\n";
    } else if (chosenTool == "gcc" || chosenTool == "clang") {
        std::wstring compExe = (chosenTool == "gcc") ? (gccPath.empty() ? L"g++" : gccPath) : (clangPath.empty() ? L"clang++" : clangPath);
        std::string stdGcc = "-std=c++20";
        if (req.options.cppStandard == "c++17") stdGcc = "-std=c++17";
        else if (req.options.cppStandard == "c++23") stdGcc = "-std=c++23";
        else if (req.options.cppStandard == "c++14") stdGcc = "-std=c++14";

        batFile << "\"" << WideToUtf8Str(compExe) << "\" " << stdGcc << " -Wall -O2 \"" << WideToUtf8Str(req.sourceFilePath) << "\" -o \"" << WideToUtf8Str(req.outputExePath) << "\"\n";
    } else {
        // MSVC
        if (!m_vcvars64Path.empty()) {
            batFile << "call \"" << WideToUtf8Str(m_vcvars64Path) << "\" >nul 2>&1\n";
        }
        std::string standardFlag = "/std:c++20";
        if (req.options.cppStandard == "c++17") standardFlag = "/std:c++17";
        else if (req.options.cppStandard == "c++23" || req.options.cppStandard == "c++latest") standardFlag = "/std:c++latest";
        else if (req.options.cppStandard == "c++14") standardFlag = "/std:c++14";

        std::string warningFlag = req.options.warningLevel.empty() ? "/W3" : req.options.warningLevel;
        std::string optFlag = (req.options.optMode == "/O2") ? "/O2" : "/Od";
        
        fs::path outPath(req.outputExePath);
        std::string objPath = WideToUtf8Str((outPath.parent_path() / (outPath.stem().wstring() + L".obj")).wstring());

        batFile << "cl.exe /nologo /EHsc /utf-8 " << standardFlag << " " << warningFlag << " " << optFlag 
                << " \"" << WideToUtf8Str(req.sourceFilePath) << "\" /Fe:\"" << WideToUtf8Str(req.outputExePath) 
                << "\" /Fo:\"" << objPath << "\"\n";
    }
    batFile.close();

    std::wstring cmdLine = L"cmd.exe /c \"" + batchPath + L"\"";

    // Prepare Pipes
    HANDLE hReadPipe, hWritePipe;
    SECURITY_ATTRIBUTES sa;
    sa.nLength = sizeof(SECURITY_ATTRIBUTES);
    sa.bInheritHandle = TRUE;
    sa.lpSecurityDescriptor = NULL;

    if (!CreatePipe(&hReadPipe, &hWritePipe, &sa, 0)) {
        result.rawOutput = "Error: Failed to create pipes for compiler output.";
        return result;
    }
    SetHandleInformation(hReadPipe, HANDLE_FLAG_INHERIT, 0);

    STARTUPINFOW si;
    PROCESS_INFORMATION pi;
    ZeroMemory(&si, sizeof(si));
    si.cb = sizeof(si);
    si.hStdOutput = hWritePipe;
    si.hStdError = hWritePipe;
    si.dwFlags |= STARTF_USESTDHANDLES | STARTF_USESHOWWINDOW;
    si.wShowWindow = SW_HIDE;

    ZeroMemory(&pi, sizeof(pi));

    std::vector<wchar_t> cmdVec(cmdLine.begin(), cmdLine.end());
    cmdVec.push_back(0);

    BOOL created = CreateProcessW(
        NULL,
        cmdVec.data(),
        NULL,
        NULL,
        TRUE,
        CREATE_NO_WINDOW,
        NULL,
        workDir.c_str(),
        &si,
        &pi
    );

    CloseHandle(hWritePipe);

    if (!created) {
        CloseHandle(hReadPipe);
        result.rawOutput = "Error: Failed to launch compiler process. Error code: " + std::to_string(GetLastError());
        return result;
    }

    // Read compiler output
    char buffer[4096];
    DWORD bytesRead;
    std::string fullOutput;

    while (ReadFile(hReadPipe, buffer, sizeof(buffer) - 1, &bytesRead, NULL) && bytesRead > 0) {
        buffer[bytesRead] = '\0';
        fullOutput.append(buffer, bytesRead);
        if (onOutputChunk) {
            onOutputChunk(std::string(buffer, bytesRead));
        }
    }

    WaitForSingleObject(pi.hProcess, INFINITE);

    DWORD exitCode = 0;
    GetExitCodeProcess(pi.hProcess, &exitCode);

    CloseHandle(pi.hProcess);
    CloseHandle(pi.hThread);
    CloseHandle(hReadPipe);

    auto endTime = std::chrono::high_resolution_clock::now();
    result.durationMs = std::chrono::duration_cast<std::chrono::milliseconds>(endTime - startTime).count();
    result.exitCode = static_cast<int>(exitCode);
    result.success = (exitCode == 0 && fs::exists(req.outputExePath));
    result.rawOutput = fullOutput;

    // Count errors / warnings
    std::istringstream iss(fullOutput);
    std::string line;
    while (std::getline(iss, line)) {
        if (line.find("error C") != std::string::npos || line.find(": error:") != std::string::npos || line.find("fatal error") != std::string::npos) {
            result.errorCount++;
        } else if (line.find("warning C") != std::string::npos || line.find(": warning:") != std::string::npos) {
            result.warningCount++;
        }
    }

    return result;
}

bool CompilerRunner::RunExecutable(
    const std::wstring& exePath,
    const std::wstring& workingDir,
    bool inExternalTerminal,
    std::function<void(const std::string&)> onStdout,
    std::function<void(const std::string&)> onStderr,
    std::function<void(int exitCode, long long durationMs)> onExit
) {
    TerminateActiveProcess();

    if (!fs::exists(exePath)) {
        if (onStderr) onStderr("Executable file does not exist: " + fs::path(exePath).string() + "\n");
        return false;
    }

    std::wstring dir = workingDir.empty() ? fs::path(exePath).parent_path().wstring() : workingDir;

    if (inExternalTerminal) {
        std::wstring cmd = L"cmd.exe /c \"\"" + exePath + L"\" & echo. & pause\"";
        std::vector<wchar_t> cmdVec(cmd.begin(), cmd.end());
        cmdVec.push_back(0);

        STARTUPINFOW si;
        PROCESS_INFORMATION pi;
        ZeroMemory(&si, sizeof(si));
        si.cb = sizeof(si);
        ZeroMemory(&pi, sizeof(pi));

        BOOL success = CreateProcessW(
            NULL,
            cmdVec.data(),
            NULL,
            NULL,
            FALSE,
            CREATE_NEW_CONSOLE,
            NULL,
            dir.c_str(),
            &si,
            &pi
        );

        if (success) {
            CloseHandle(pi.hProcess);
            CloseHandle(pi.hThread);
            if (onExit) onExit(0, 0);
            return true;
        }
        return false;
    }

    // Integrated Console with two-way Stdin / Stdout / Stderr redirection
    SECURITY_ATTRIBUTES sa;
    sa.nLength = sizeof(SECURITY_ATTRIBUTES);
    sa.bInheritHandle = TRUE;
    sa.lpSecurityDescriptor = NULL;

    HANDLE hStdoutWrite = NULL;
    HANDLE hStderrWrite = NULL;
    HANDLE hStdinRead = NULL;

    if (!CreatePipe(&m_hStdoutRead, &hStdoutWrite, &sa, 0) ||
        !CreatePipe(&m_hStderrRead, &hStderrWrite, &sa, 0) ||
        !CreatePipe(&hStdinRead, &m_hStdinWrite, &sa, 0)) {
        return false;
    }

    SetHandleInformation(m_hStdoutRead, HANDLE_FLAG_INHERIT, 0);
    SetHandleInformation(m_hStderrRead, HANDLE_FLAG_INHERIT, 0);
    SetHandleInformation(m_hStdinWrite, HANDLE_FLAG_INHERIT, 0);

    STARTUPINFOW si;
    ZeroMemory(&si, sizeof(si));
    si.cb = sizeof(si);
    si.hStdOutput = hStdoutWrite;
    si.hStdError = hStderrWrite;
    si.hStdInput = hStdinRead;
    si.dwFlags |= STARTF_USESTDHANDLES | STARTF_USESHOWWINDOW;
    si.wShowWindow = SW_HIDE;

    ZeroMemory(&m_runningProcInfo, sizeof(m_runningProcInfo));

    std::wstring quotedExe = L"\"" + exePath + L"\"";
    std::vector<wchar_t> cmdVec(quotedExe.begin(), quotedExe.end());
    cmdVec.push_back(0);

    BOOL created = CreateProcessW(
        NULL,
        cmdVec.data(),
        NULL,
        NULL,
        TRUE,
        CREATE_NO_WINDOW,
        NULL,
        dir.c_str(),
        &si,
        &m_runningProcInfo
    );

    CloseHandle(hStdoutWrite);
    CloseHandle(hStderrWrite);
    CloseHandle(hStdinRead);

    if (!created) {
        CloseHandle(m_hStdoutRead);
        CloseHandle(m_hStderrRead);
        CloseHandle(m_hStdinWrite);
        m_hStdoutRead = m_hStderrRead = m_hStdinWrite = NULL;
        return false;
    }

    {
        std::lock_guard<std::mutex> lock(m_procMutex);
        m_hasActiveProcess = true;
    }

    auto startTime = std::chrono::high_resolution_clock::now();

    // Async thread for reading Stdout
    m_stdoutThread = std::thread([this, onStdout]() {
        char buffer[2048];
        DWORD bytesRead;
        while (m_hStdoutRead && ReadFile(m_hStdoutRead, buffer, sizeof(buffer) - 1, &bytesRead, NULL) && bytesRead > 0) {
            buffer[bytesRead] = '\0';
            if (onStdout) onStdout(std::string(buffer, bytesRead));
        }
    });

    // Async thread for reading Stderr
    m_stderrThread = std::thread([this, onStderr]() {
        char buffer[2048];
        DWORD bytesRead;
        while (m_hStderrRead && ReadFile(m_hStderrRead, buffer, sizeof(buffer) - 1, &bytesRead, NULL) && bytesRead > 0) {
            buffer[bytesRead] = '\0';
            if (onStderr) onStderr(std::string(buffer, bytesRead));
        }
    });

    // Async thread for waiting on process exit
    HANDLE hProcess = m_runningProcInfo.hProcess;
    m_waitThread = std::thread([this, hProcess, startTime, onExit]() {
        WaitForSingleObject(hProcess, INFINITE);

        DWORD exitCode = 0;
        GetExitCodeProcess(hProcess, &exitCode);

        auto endTime = std::chrono::high_resolution_clock::now();
        long long durationMs = std::chrono::duration_cast<std::chrono::milliseconds>(endTime - startTime).count();

        if (m_hStdinWrite) {
            CloseHandle(m_hStdinWrite);
            m_hStdinWrite = NULL;
        }

        if (m_stdoutThread.joinable()) m_stdoutThread.join();
        if (m_stderrThread.joinable()) m_stderrThread.join();

        if (m_hStdoutRead) { CloseHandle(m_hStdoutRead); m_hStdoutRead = NULL; }
        if (m_hStderrRead) { CloseHandle(m_hStderrRead); m_hStderrRead = NULL; }

        {
            std::lock_guard<std::mutex> lock(m_procMutex);
            m_hasActiveProcess = false;
            if (m_runningProcInfo.hProcess) {
                CloseHandle(m_runningProcInfo.hProcess);
                m_runningProcInfo.hProcess = NULL;
            }
            if (m_runningProcInfo.hThread) {
                CloseHandle(m_runningProcInfo.hThread);
                m_runningProcInfo.hThread = NULL;
            }
        }

        if (onExit) {
            onExit(static_cast<int>(exitCode), durationMs);
        }
    });

    m_waitThread.detach();
    return true;
}

bool CompilerRunner::RunTestCaseSync(
    const std::wstring& exePath,
    const std::wstring& workingDir,
    const std::string& inputData,
    int timeoutMs,
    std::string& outStdout,
    std::string& outStderr,
    int& outExitCode,
    long long& outDurationMs
) {
    outStdout.clear();
    outStderr.clear();
    outExitCode = -1;
    outDurationMs = 0;

    if (!fs::exists(exePath)) {
        outStderr = "Executable not found: " + fs::path(exePath).string();
        return false;
    }

    std::wstring dir = workingDir.empty() ? fs::path(exePath).parent_path().wstring() : workingDir;

    SECURITY_ATTRIBUTES sa;
    sa.nLength = sizeof(SECURITY_ATTRIBUTES);
    sa.bInheritHandle = TRUE;
    sa.lpSecurityDescriptor = NULL;

    HANDLE hStdoutRead = NULL;
    HANDLE hStdoutWrite = NULL;
    HANDLE hStderrRead = NULL;
    HANDLE hStderrWrite = NULL;
    HANDLE hStdinRead = NULL;
    HANDLE hStdinWrite = NULL;

    if (!CreatePipe(&hStdoutRead, &hStdoutWrite, &sa, 0) ||
        !CreatePipe(&hStderrRead, &hStderrWrite, &sa, 0) ||
        !CreatePipe(&hStdinRead, &hStdinWrite, &sa, 0)) {
        return false;
    }

    SetHandleInformation(hStdoutRead, HANDLE_FLAG_INHERIT, 0);
    SetHandleInformation(hStderrRead, HANDLE_FLAG_INHERIT, 0);
    SetHandleInformation(hStdinWrite, HANDLE_FLAG_INHERIT, 0);

    // Pre-feed inputData to stdin pipe
    if (!inputData.empty()) {
        DWORD written = 0;
        WriteFile(hStdinWrite, inputData.c_str(), static_cast<DWORD>(inputData.length()), &written, NULL);
    }
    // Close stdin write handle so process sees EOF after reading input
    CloseHandle(hStdinWrite);
    hStdinWrite = NULL;

    STARTUPINFOW si;
    ZeroMemory(&si, sizeof(si));
    si.cb = sizeof(si);
    si.hStdOutput = hStdoutWrite;
    si.hStdError = hStderrWrite;
    si.hStdInput = hStdinRead;
    si.dwFlags |= STARTF_USESTDHANDLES | STARTF_USESHOWWINDOW;
    si.wShowWindow = SW_HIDE;

    PROCESS_INFORMATION pi;
    ZeroMemory(&pi, sizeof(pi));

    std::wstring cmd = L"\"" + exePath + L"\"";
    std::vector<wchar_t> cmdVec(cmd.begin(), cmd.end());
    cmdVec.push_back(0);

    auto startTime = std::chrono::high_resolution_clock::now();

    BOOL success = CreateProcessW(
        NULL,
        cmdVec.data(),
        NULL,
        NULL,
        TRUE,
        CREATE_NO_WINDOW,
        NULL,
        dir.c_str(),
        &si,
        &pi
    );

    // Close pipe write ends in parent process
    CloseHandle(hStdoutWrite);
    CloseHandle(hStderrWrite);
    CloseHandle(hStdinRead);

    if (!success) {
        CloseHandle(hStdoutRead);
        CloseHandle(hStderrRead);
        outStderr = "Failed to create process";
        return false;
    }

    // Read stdout & stderr asynchronously in background threads while waiting for process
    std::string capturedStdout;
    std::string capturedStderr;

    std::thread outTh([hStdoutRead, &capturedStdout]() {
        char buf[2048];
        DWORD readBytes = 0;
        while (ReadFile(hStdoutRead, buf, sizeof(buf) - 1, &readBytes, NULL) && readBytes > 0) {
            buf[readBytes] = 0;
            capturedStdout.append(buf, readBytes);
        }
        CloseHandle(hStdoutRead);
    });

    std::thread errTh([hStderrRead, &capturedStderr]() {
        char buf[2048];
        DWORD readBytes = 0;
        while (ReadFile(hStderrRead, buf, sizeof(buf) - 1, &readBytes, NULL) && readBytes > 0) {
            buf[readBytes] = 0;
            capturedStderr.append(buf, readBytes);
        }
        CloseHandle(hStderrRead);
    });

    DWORD waitRes = WaitForSingleObject(pi.hProcess, timeoutMs > 0 ? timeoutMs : 5000);
    auto endTime = std::chrono::high_resolution_clock::now();
    outDurationMs = std::chrono::duration_cast<std::chrono::milliseconds>(endTime - startTime).count();

    if (waitRes == WAIT_TIMEOUT) {
        TerminateProcess(pi.hProcess, 101);
        outExitCode = 101; // TLE
        outStderr = "Time Limit Exceeded (Timeout)";
    } else {
        DWORD exitCode = 0;
        GetExitCodeProcess(pi.hProcess, &exitCode);
        outExitCode = static_cast<int>(exitCode);
    }

    CloseHandle(pi.hProcess);
    CloseHandle(pi.hThread);

    if (outTh.joinable()) outTh.join();
    if (errTh.joinable()) errTh.join();

    outStdout = capturedStdout;
    if (outStderr.empty()) outStderr = capturedStderr;

    return true;
}

bool CompilerRunner::SendStdin(const std::string& input) {
    std::lock_guard<std::mutex> lock(m_procMutex);
    if (!m_hasActiveProcess || !m_hStdinWrite) return false;

    DWORD bytesWritten = 0;
    return WriteFile(m_hStdinWrite, input.c_str(), static_cast<DWORD>(input.length()), &bytesWritten, NULL) != FALSE;
}

void CompilerRunner::TerminateActiveProcess() {
    std::lock_guard<std::mutex> lock(m_procMutex);
    if (m_hasActiveProcess && m_runningProcInfo.hProcess) {
        TerminateProcess(m_runningProcInfo.hProcess, 1);
        m_hasActiveProcess = false;
    }
}

bool CompilerRunner::IsProcessRunning() const {
    std::lock_guard<std::mutex> lock(m_procMutex);
    return m_hasActiveProcess;
}

