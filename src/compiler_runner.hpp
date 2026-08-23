#pragma once

#include <string>
#include <vector>
#include <functional>
#include <memory>
#include <mutex>
#include <thread>
#include <windows.h>

struct ToolchainInfo {
    std::string id;
    std::string name;
    std::wstring compilerPath;
    std::wstring vcvarsPath;
    bool isAvailable;
};

struct CompileOptions {
    std::string compilerId;   // "msvc", "gcc", "clang"
    std::string cppStandard;  // "c++20", "c++17", "c++23", "c++14"
    std::string warningLevel; // "/W3", "/W4", "/Wall", "/W0"
    std::string optMode;      // "/Od", "/O2"
    bool integratedConsole;
};

struct CompileRequest {
    std::wstring sourceFilePath;
    std::wstring outputExePath;
    std::wstring workingDirectory;
    CompileOptions options;
};

struct CompileResult {
    bool success;
    int exitCode;
    long long durationMs;
    int errorCount;
    int warningCount;
    std::string rawOutput;
};

class CompilerRunner {
public:
    CompilerRunner();
    ~CompilerRunner();

    std::vector<ToolchainInfo> DetectToolchains();
    ToolchainInfo GetActiveToolchain(const std::string& id);

    CompileResult Compile(
        const CompileRequest& req,
        std::function<void(const std::string&)> onOutputChunk = nullptr
    );

    bool RunExecutable(
        const std::wstring& exePath,
        const std::wstring& workingDir,
        bool inExternalTerminal,
        std::function<void(const std::string&)> onStdout,
        std::function<void(const std::string&)> onStderr,
        std::function<void(int exitCode, long long durationMs)> onExit
    );

    bool RunTestCaseSync(
        const std::wstring& exePath,
        const std::wstring& workingDir,
        const std::string& inputData,
        int timeoutMs,
        std::string& outStdout,
        std::string& outStderr,
        int& outExitCode,
        long long& outDurationMs
    );

    bool SendStdin(const std::string& input);
    void TerminateActiveProcess();
    bool IsProcessRunning() const;

private:
    std::vector<ToolchainInfo> m_toolchains;
    std::wstring m_vsDevCmdPath;
    std::wstring m_vcvars64Path;
    std::wstring m_msvcClPath;

    // Running process management
    PROCESS_INFORMATION m_runningProcInfo;
    HANDLE m_hStdinWrite;
    HANDLE m_hStdoutRead;
    HANDLE m_hStderrRead;
    bool m_hasActiveProcess;
    mutable std::mutex m_procMutex;
    std::thread m_stdoutThread;
    std::thread m_stderrThread;
    std::thread m_waitThread;

    void FindVisualStudioPaths();
    std::wstring FindProgramInPath(const std::wstring& exeName);
};
