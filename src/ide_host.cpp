#include "ide_host.hpp"
#include <iostream>
#include <fstream>
#include <sstream>
#include <iomanip>
#include <filesystem>
#include <commdlg.h>
#include <shlobj.h>
#include <shellapi.h>
#include <wininet.h>
#include <urlmon.h>

#pragma comment(lib, "Wininet.lib")
#pragma comment(lib, "Urlmon.lib")
#pragma comment(lib, "Shell32.lib")

namespace fs = std::filesystem;
using namespace Microsoft::WRL;

static const std::string APP_VERSION = "1.0.1";

// Helper: Convert wstring to string UTF-8
static std::string WideToUtf8(const std::wstring& wstr) {
    if (wstr.empty()) return std::string();
    int sizeNeeded = WideCharToMultiByte(CP_UTF8, 0, wstr.data(), (int)wstr.size(), NULL, 0, NULL, NULL);
    std::string str(sizeNeeded, 0);
    WideCharToMultiByte(CP_UTF8, 0, wstr.data(), (int)wstr.size(), &str[0], sizeNeeded, NULL, NULL);
    return str;
}

// Helper: Convert string UTF-8 to wstring
static std::wstring Utf8ToWide(const std::string& str) {
    if (str.empty()) return std::wstring();
    int sizeNeeded = MultiByteToWideChar(CP_UTF8, 0, str.data(), (int)str.size(), NULL, 0);
    std::wstring wstr(sizeNeeded, 0);
    MultiByteToWideChar(CP_UTF8, 0, str.data(), (int)str.size(), &wstr[0], sizeNeeded);
    return wstr;
}

// Robust lightweight JSON object parser
static std::unordered_map<std::string, std::string> ParseJsonObject(const std::string& json) {
    std::unordered_map<std::string, std::string> result;
    size_t i = 0;
    size_t len = json.length();

    // Skip to first '{'
    while (i < len && json[i] != '{') i++;
    if (i >= len) return result;
    i++; // Skip '{'

    while (i < len) {
        // Skip whitespace and commas
        while (i < len && (isspace((unsigned char)json[i]) || json[i] == ',')) i++;
        if (i >= len || json[i] == '}') break;

        // Expect key string
        if (json[i] != '"') {
            i++;
            continue;
        }
        i++; // skip opening quote
        std::string key;
        while (i < len && json[i] != '"') {
            if (json[i] == '\\' && i + 1 < len) {
                key += json[i + 1];
                i += 2;
            } else {
                key += json[i++];
            }
        }
        if (i < len) i++; // skip closing quote

        // Expect ':'
        while (i < len && (isspace((unsigned char)json[i]) || json[i] == ':')) i++;
        if (i >= len) break;

        // Read value
        std::string value;
        if (json[i] == '"') {
            i++; // skip opening quote
            while (i < len) {
                if (json[i] == '\\' && i + 1 < len) {
                    char next = json[i + 1];
                    if (next == 'n') value += '\n';
                    else if (next == 'r') value += '\r';
                    else if (next == 't') value += '\t';
                    else if (next == '"') value += '"';
                    else if (next == '\\') value += '\\';
                    else { value += '\\'; value += next; }
                    i += 2;
                } else if (json[i] == '"') {
                    i++; // skip closing quote
                    break;
                } else {
                    value += json[i++];
                }
            }
        } else if (json[i] == '{') {
            // Nested object - read balanced braces
            int braceCount = 1;
            value += json[i++];
            while (i < len && braceCount > 0) {
                if (json[i] == '"') {
                    value += json[i++];
                    while (i < len && json[i] != '"') {
                        if (json[i] == '\\' && i + 1 < len) {
                            value += json[i++];
                            value += json[i++];
                        } else {
                            value += json[i++];
                        }
                    }
                    if (i < len) value += json[i++];
                } else {
                    if (json[i] == '{') braceCount++;
                    else if (json[i] == '}') braceCount--;
                    value += json[i++];
                }
            }
        } else {
            // Primitive (number, bool, null)
            while (i < len && json[i] != ',' && json[i] != '}' && !isspace((unsigned char)json[i])) {
                value += json[i++];
            }
        }

        result[key] = value;
    }

    return result;
}

static std::wstring GetXcodingAppDataDir() {
    wchar_t localAppData[MAX_PATH];
    if (SUCCEEDED(SHGetFolderPathW(NULL, CSIDL_LOCAL_APPDATA, NULL, 0, localAppData))) {
        fs::path p = fs::path(localAppData) / "XCODING";
        std::error_code ec;
        fs::create_directories(p, ec);
        return p.wstring();
    }
    wchar_t tempPath[MAX_PATH];
    GetTempPathW(MAX_PATH, tempPath);
    fs::path p = fs::path(tempPath) / "XCODING";
    std::error_code ec;
    fs::create_directories(p, ec);
    return p.wstring();
}

IdeHost::IdeHost(HWND hWnd)
    : m_hWnd(hWnd),
      m_compilerRunner(std::make_unique<CompilerRunner>()) {
    
    fs::path tempDir = fs::path(GetXcodingAppDataDir()) / "temp";
    std::error_code ec;
    fs::create_directories(tempDir, ec);
    m_tempDir = tempDir.wstring();
}

IdeHost::~IdeHost() {
    if (m_compilerRunner) {
        m_compilerRunner->TerminateActiveProcess();
    }
    if (m_webViewController) {
        m_webViewController->Close();
    }
}

void IdeHost::Resize(int width, int height) {
    if (m_webViewController) {
        if (IsZoomed(m_hWnd)) {
            RECT bounds = { 0, 0, width, height };
            m_webViewController->put_Bounds(bounds);
        } else {
            const int border = 6;
            RECT bounds = { border, border, max(border, width - border), max(border, height - border) };
            m_webViewController->put_Bounds(bounds);
        }
    }
}

void IdeHost::InitializeWebView(const std::wstring& htmlPath) {
    fs::path userDataFolder = fs::path(GetXcodingAppDataDir()) / "WebView2Data";
    std::error_code ec;
    fs::create_directories(userDataFolder, ec);

    CreateCoreWebView2EnvironmentWithOptions(
        nullptr,
        userDataFolder.c_str(),
        nullptr,
        Callback<ICoreWebView2CreateCoreWebView2EnvironmentCompletedHandler>(
            [this, htmlPath](HRESULT result, ICoreWebView2Environment* env) -> HRESULT {
                if (FAILED(result) || !env) return result;
                m_webViewEnv = env;

                m_webViewEnv->CreateCoreWebView2Controller(
                    m_hWnd,
                    Callback<ICoreWebView2CreateCoreWebView2ControllerCompletedHandler>(
                        [this, htmlPath](HRESULT res, ICoreWebView2Controller* controller) -> HRESULT {
                            if (FAILED(res) || !controller) return res;
                            m_webViewController = controller;
                            m_webViewController->get_CoreWebView2(&m_webView);

                            ComPtr<ICoreWebView2Settings> settings;
                            m_webView->get_Settings(&settings);
                            if (settings) {
                                settings->put_IsScriptEnabled(TRUE);
                                settings->put_AreDefaultScriptDialogsEnabled(TRUE);
                                settings->put_IsWebMessageEnabled(TRUE);
                                settings->put_AreDevToolsEnabled(TRUE);
                                settings->put_IsStatusBarEnabled(FALSE);
                            }

                            RECT bounds;
                            GetClientRect(m_hWnd, &bounds);
                            m_webViewController->put_Bounds(bounds);
                            m_webViewController->put_IsVisible(TRUE);

                            // Attach WebMessage Handler
                            m_webView->add_WebMessageReceived(
                                Callback<ICoreWebView2WebMessageReceivedEventHandler>(
                                    [this](ICoreWebView2* sender, ICoreWebView2WebMessageReceivedEventArgs* args) -> HRESULT {
                                        LPWSTR messageRaw = nullptr;
                                        HRESULT hr = args->TryGetWebMessageAsString(&messageRaw);
                                        if (SUCCEEDED(hr) && messageRaw) {
                                            HandleWebMessage(std::wstring(messageRaw));
                                            CoTaskMemFree(messageRaw);
                                        } else {
                                            LPWSTR jsonRaw = nullptr;
                                            hr = args->get_WebMessageAsJson(&jsonRaw);
                                            if (SUCCEEDED(hr) && jsonRaw) {
                                                HandleWebMessage(std::wstring(jsonRaw));
                                                CoTaskMemFree(jsonRaw);
                                            }
                                        }
                                        return S_OK;
                                    }
                                ).Get(),
                                nullptr
                            );

                            // Map local editor directory to https://localhost (pre-authorized by Firebase default)
                            fs::path editorDir = fs::path(htmlPath).parent_path();
                            fs::path htmlFilename = fs::path(htmlPath).filename();
                            std::wstring navUrl = L"https://localhost/" + htmlFilename.wstring();
                            Microsoft::WRL::ComPtr<ICoreWebView2_3> webView3;
                            if (SUCCEEDED(m_webView.As(&webView3))) {
                                webView3->SetVirtualHostNameToFolderMapping(
                                    L"localhost",
                                    editorDir.c_str(),
                                    COREWEBVIEW2_HOST_RESOURCE_ACCESS_KIND_ALLOW
                                );
                                m_webView->Navigate(navUrl.c_str());
                            } else {
                                std::wstring fileUri = L"file:///" + htmlPath;
                                for (auto& c : fileUri) {
                                    if (c == L'\\') c = L'/';
                                }
                                m_webView->Navigate(fileUri.c_str());
                            }

                            return S_OK;
                        }
                    ).Get()
                );
                return S_OK;
            }
        ).Get()
    );
}

// Thread-safe dispatch: posts to Win32 message queue so WebView2 call happens on UI thread
void IdeHost::PostJsonToWeb(const std::string& jsonString) {
    std::string* pStr = new std::string(jsonString);
    if (!PostMessageW(m_hWnd, WM_APP_POST_WEB_MESSAGE, 0, (LPARAM)pStr)) {
        delete pStr;
    }
}

// Called on UI thread
void IdeHost::DispatchJsonToWeb(const std::string& jsonString) {
    if (!m_webView) return;
    std::wstring wJson = Utf8ToWide(jsonString);
    m_webView->PostWebMessageAsJson(wJson.c_str());
}

std::string IdeHost::EscapeJsonString(const std::string& input) {
    std::ostringstream ss;
    for (char c : input) {
        switch (c) {
            case '"': ss << "\\\""; break;
            case '\\': ss << "\\\\"; break;
            case '\b': ss << "\\b"; break;
            case '\f': ss << "\\f"; break;
            case '\n': ss << "\\n"; break;
            case '\r': ss << "\\r"; break;
            case '\t': ss << "\\t"; break;
            default:
                if ('\x00' <= (unsigned char)c && (unsigned char)c <= '\x1f') {
                    ss << "\\u" << std::hex << std::setw(4) << std::setfill('0') << (int)(unsigned char)c;
                } else {
                    ss << c;
                }
        }
    }
    return ss.str();
}

void IdeHost::HandleWebMessage(const std::wstring& rawJson) {
    std::string jsonStr = WideToUtf8(rawJson);
    auto root = ParseJsonObject(jsonStr);
    std::string action = root["action"];

    if (action == "ready") {
        SendToolchainsList();
    } else if (action == "build_and_run" || action == "compile_only") {
        std::string fileName = root["fileName"];
        std::string filePath = root["filePath"];
        std::string code = root["code"];
        
        CompileOptions opts;
        opts.compilerId = "msvc";
        opts.cppStandard = "c++20";
        opts.warningLevel = "/W3";
        opts.optMode = "/Od";
        opts.integratedConsole = true;

        if (!root["options"].empty()) {
            auto optMap = ParseJsonObject(root["options"]);
            if (!optMap["compiler"].empty()) opts.compilerId = optMap["compiler"];
            if (!optMap["std"].empty()) opts.cppStandard = optMap["std"];
            if (!optMap["warnings"].empty()) opts.warningLevel = optMap["warnings"];
            if (!optMap["opt"].empty()) opts.optMode = optMap["opt"];
            if (optMap["integratedConsole"] == "false") opts.integratedConsole = false;
        }

        bool autoRun = (action == "build_and_run");
        HandleBuildAndRun(fileName, filePath, code, opts, autoRun);
    } else if (action == "stop") {
        HandleStop();
    } else if (action == "stdin") {
        std::string text = root["text"];
        HandleStdin(text);
    } else if (action == "open_file_dialog") {
        HandleOpenFile();
    } else if (action == "save_file") {
        std::string filePath = root["filePath"];
        std::string fileName = root["fileName"];
        std::string content = root["content"];
        HandleSaveFile(filePath, fileName, content);
    } else if (action == "run_test_suite") {
        std::string fileName = root["fileName"].empty() ? "main.cpp" : root["fileName"];
        std::string filePath = root["filePath"];
        std::string code = root["code"];
        
        std::vector<std::pair<std::string, std::string>> testCases;
        size_t tcPos = jsonStr.find("\"testCases\"");
        if (tcPos != std::string::npos) {
            size_t arrStart = jsonStr.find('[', tcPos);
            size_t arrEnd = (arrStart != std::string::npos) ? jsonStr.find(']', arrStart) : std::string::npos;
            if (arrStart != std::string::npos && arrEnd != std::string::npos) {
                size_t i = arrStart;
                while (i < arrEnd) {
                    size_t objStart = jsonStr.find('{', i);
                    if (objStart == std::string::npos || objStart > arrEnd) break;
                    size_t objEnd = jsonStr.find('}', objStart);
                    if (objEnd == std::string::npos || objEnd > arrEnd) break;
                    std::string objStr = jsonStr.substr(objStart, objEnd - objStart + 1);
                    auto m = ParseJsonObject(objStr);
                    testCases.push_back({m["input"], m["expected"]});
                    i = objEnd + 1;
                }
            }
        }

        CompileOptions opts;
        opts.compilerId = "msvc";
        opts.cppStandard = "c++20";
        opts.warningLevel = "/W3";
        opts.optMode = "/O2";
        opts.integratedConsole = true;
        HandleRunTestSuite(fileName, filePath, code, opts, testCases);
    } else if (action == "load_meta_session") {
        HandleLoadMetaSession();
    } else if (action == "save_meta_session") {
        std::string data = root["data"];
        if (data.empty() && !root["content"].empty()) data = root["content"];
        HandleSaveMetaSession(data);
    } else if (action == "delete_meta_session") {
        HandleDeleteMetaSession();
    } else if (action == "google_login_browser") {
        HandleGoogleLoginBrowser();
    } else if (action == "drag_window") {
        ReleaseCapture();
        SendMessageW(m_hWnd, WM_NCLBUTTONDOWN, HTCAPTION, 0);
    } else if (action == "check_updates") {
        bool manual = (root["manual"] == "true");
        HandleCheckForUpdates(manual);
    } else if (action == "perform_update") {
        std::string downloadUrl = root["downloadUrl"];
        HandlePerformUpdate(downloadUrl);
    } else if (action == "force_update" || action == "force_reinstall") {
        HandleForceUpdate();
    } else if (action == "get_app_version") {
        PostJsonToWeb("{\"type\":\"app_version\",\"version\":\"" + APP_VERSION + "\"}");
    } else if (action == "minimize_window") {
        ShowWindow(m_hWnd, SW_MINIMIZE);
    } else if (action == "maximize_window") {
        if (IsZoomed(m_hWnd)) {
            ShowWindow(m_hWnd, SW_RESTORE);
        } else {
            ShowWindow(m_hWnd, SW_MAXIMIZE);
        }
    } else if (action == "close_window") {
        PostMessageW(m_hWnd, WM_CLOSE, 0, 0);
    }
}

std::wstring IdeHost::GetMetaFilePath() {
    fs::path metaPath = fs::path(GetXcodingAppDataDir()) / ".meta_session";
    return metaPath.wstring();
}

void IdeHost::HandleCheckForUpdates(bool manualTrigger) {
    std::thread([this, manualTrigger]() {
        const std::string updateUrl = "https://xcoding-29d3a-default-rtdb.europe-west1.firebasedatabase.app/version.json";
        
        HINTERNET hInternet = InternetOpenW(L"XCODING_Updater/1.0", INTERNET_OPEN_TYPE_PRECONFIG, NULL, NULL, 0);
        if (!hInternet) {
            if (manualTrigger) {
                PostJsonToWeb("{\"type\":\"update_check_result\",\"status\":\"error\",\"message\":\"Unable to initialize network.\"}");
            }
            return;
        }

        HINTERNET hUrl = InternetOpenUrlA(hInternet, updateUrl.c_str(), NULL, 0, 
                                          INTERNET_FLAG_RELOAD | INTERNET_FLAG_NO_CACHE_WRITE | INTERNET_FLAG_SECURE, 0);
        if (!hUrl) {
            InternetCloseHandle(hInternet);
            if (manualTrigger) {
                PostJsonToWeb("{\"type\":\"update_check_result\",\"status\":\"error\",\"message\":\"Could not reach update server.\"}");
            }
            return;
        }

        char buffer[4096] = {};
        DWORD bytesRead = 0;
        std::string jsonResponse;
        while (InternetReadFile(hUrl, buffer, sizeof(buffer) - 1, &bytesRead) && bytesRead > 0) {
            jsonResponse.append(buffer, bytesRead);
        }

        InternetCloseHandle(hUrl);
        InternetCloseHandle(hInternet);

        auto info = ParseJsonObject(jsonResponse);
        std::string remoteVer = info["version"];
        std::string downloadUrl = info["downloadUrl"];
        std::string changelog = info["changelog"];

        if (remoteVer.empty() || remoteVer == "null") {
            if (manualTrigger) {
                PostJsonToWeb("{\"type\":\"update_check_result\",\"status\":\"up_to_date\",\"currentVersion\":\"" + APP_VERSION + "\"}");
            }
            return;
        }

        if (remoteVer != APP_VERSION && remoteVer > APP_VERSION) {
            std::string msg = "{\"type\":\"update_available\",\"currentVersion\":\"" + APP_VERSION + 
                              "\",\"newVersion\":\"" + EscapeJsonString(remoteVer) + 
                              "\",\"downloadUrl\":\"" + EscapeJsonString(downloadUrl) + 
                              "\",\"changelog\":\"" + EscapeJsonString(changelog) + "\"}";
            PostJsonToWeb(msg);
        } else {
            if (manualTrigger) {
                PostJsonToWeb("{\"type\":\"update_check_result\",\"status\":\"up_to_date\",\"currentVersion\":\"" + APP_VERSION + "\"}");
            }
        }
    }).detach();
}

void IdeHost::HandlePerformUpdate(const std::string& downloadUrl) {
    if (downloadUrl.empty()) return;

    std::thread([this, downloadUrl]() {
        PostJsonToWeb("{\"type\":\"update_progress\",\"status\":\"downloading\",\"message\":\"Downloading update package...\"}");

        fs::path updatesDir = fs::path(GetXcodingAppDataDir()) / "updates";
        std::error_code ec;
        fs::create_directories(updatesDir, ec);
        fs::path newExePath = updatesDir / "XCODING_update.exe";

        // Download via standard WinINet HTTPS stream
        HINTERNET hInternet = InternetOpenW(L"Mozilla/5.0 (Windows NT 10.0; Win64; x64) XCODING/1.0", INTERNET_OPEN_TYPE_PRECONFIG, NULL, NULL, 0);
        if (!hInternet) {
            PostJsonToWeb("{\"type\":\"update_progress\",\"status\":\"error\",\"message\":\"Unable to initialize download network.\"}");
            return;
        }

        HINTERNET hUrl = InternetOpenUrlA(hInternet, downloadUrl.c_str(), NULL, 0,
                                          INTERNET_FLAG_RELOAD | INTERNET_FLAG_NO_CACHE_WRITE | INTERNET_FLAG_SECURE, 0);
        if (!hUrl) {
            InternetCloseHandle(hInternet);
            PostJsonToWeb("{\"type\":\"update_progress\",\"status\":\"error\",\"message\":\"Could not connect to release download server.\"}");
            return;
        }

        std::ofstream outFile(newExePath, std::ios::binary | std::ios::out);
        if (!outFile.is_open()) {
            InternetCloseHandle(hUrl);
            InternetCloseHandle(hInternet);
            PostJsonToWeb("{\"type\":\"update_progress\",\"status\":\"error\",\"message\":\"Could not write update file to disk.\"}");
            return;
        }

        char buffer[32768];
        DWORD bytesRead = 0;
        while (InternetReadFile(hUrl, buffer, sizeof(buffer), &bytesRead) && bytesRead > 0) {
            outFile.write(buffer, bytesRead);
        }
        outFile.close();

        InternetCloseHandle(hUrl);
        InternetCloseHandle(hInternet);

        if (!fs::exists(newExePath) || fs::file_size(newExePath) < 50000) {
            PostJsonToWeb("{\"type\":\"update_progress\",\"status\":\"error\",\"message\":\"Downloaded package corrupted or incomplete.\"}");
            return;
        }

        PostJsonToWeb("{\"type\":\"update_progress\",\"status\":\"installing\",\"message\":\"Applying update and restarting...\"}");

        wchar_t currentExePath[MAX_PATH];
        GetModuleFileNameW(NULL, currentExePath, MAX_PATH);

        // Generate self-executing updater batch script
        fs::path updaterScript = updatesDir / "apply_update.bat";
        std::ofstream ofs(updaterScript);
        ofs << "@echo off\n";
        ofs << "timeout /t 1 /nobreak >nul\n";
        ofs << ":retry\n";
        ofs << "copy /Y \"" << newExePath.string() << "\" \"" << WideToUtf8(currentExePath) << "\" >nul 2>&1\n";
        ofs << "if errorlevel 1 (\n";
        ofs << "    timeout /t 1 /nobreak >nul\n";
        ofs << "    goto retry\n";
        ofs << ")\n";
        ofs << "start \"\" \"" << WideToUtf8(currentExePath) << "\"\n";
        ofs << "del \"" << newExePath.string() << "\" >nul 2>&1\n";
        ofs << "(goto) 2>nul & del \"%~f0\"\n";
        ofs.close();

        // Launch updater script detached
        STARTUPINFOW si = { sizeof(si) };
        si.dwFlags = STARTF_USESHOWWINDOW;
        si.wShowWindow = SW_HIDE;
        PROCESS_INFORMATION pi = { 0 };

        std::wstring cmd = L"cmd.exe /c \"" + updaterScript.wstring() + L"\"";
        std::vector<wchar_t> cmdBuf(cmd.begin(), cmd.end());
        cmdBuf.push_back(0);

        if (CreateProcessW(NULL, cmdBuf.data(), NULL, NULL, FALSE, CREATE_NO_WINDOW, NULL, NULL, &si, &pi)) {
            CloseHandle(pi.hProcess);
            CloseHandle(pi.hThread);
        }

        // Close current application gracefully
        PostMessageW(m_hWnd, WM_CLOSE, 0, 0);
    }).detach();
}

void IdeHost::HandleForceUpdate() {
    std::thread([this]() {
        PostJsonToWeb("{\"type\":\"force_update_start\",\"message\":\"Launching cloud updater...\"}");

        wchar_t tempPath[MAX_PATH];
        GetTempPathW(MAX_PATH, tempPath);
        fs::path batPath = fs::path(tempPath) / "xcoding_cloud_update.bat";

        std::ofstream ofs(batPath);
        if (ofs.is_open()) {
            ofs << "@echo off\n";
            ofs << "title XCODING Cloud Updater\n";
            ofs << "cls\n";
            ofs << "echo =========================================================\n";
            ofs << "echo   XCODING - Native Cloud Updater & Reinstaller\n";
            ofs << "echo =========================================================\n";
            ofs << "echo.\n";
            ofs << "set \"INSTALL_DIR=%LOCALAPPDATA%\\Programs\\XCODING\"\n";
            ofs << "set \"TEMP_ZIP=%TEMP%\\xcoding_release.zip\"\n";
            ofs << "set \"EXE_PATH=%LOCALAPPDATA%\\Programs\\XCODING\\XCODING.exe\"\n";
            ofs << "set \"BACKUP_DIR=%TEMP%\\xcoding_meta_backup\"\n";
            ofs << "echo [1/3] Terminating running instances of XCODING...\n";
            ofs << "taskkill /F /IM XCODING.exe /T >nul 2>&1\n";
            ofs << "taskkill /F /IM XCODING_TEACHER.exe /T >nul 2>&1\n";
            ofs << "taskkill /F /IM CodeFork.exe /T >nul 2>&1\n";
            ofs << "timeout /t 2 /nobreak >nul\n";
            ofs << "if not exist \"%INSTALL_DIR%\" mkdir \"%INSTALL_DIR%\"\n";
            ofs << "echo [2/3] Fetching latest release package from GitHub...\n";
            ofs << "curl.exe -f -L -s -S --retry 3 -o \"%TEMP_ZIP%\" \"https://github.com/GunwantBhambra/XCODING/raw/main/XCODING_windows_x64.zip\"\n";
            ofs << "if not exist \"%TEMP_ZIP%\" (\n";
            ofs << "    echo   Retrying with mirror...\n";
            ofs << "    curl.exe -f -L -s -S --retry 3 -o \"%TEMP_ZIP%\" \"https://raw.githubusercontent.com/GunwantBhambra/XCODING/main/XCODING_windows_x64.zip\"\n";
            ofs << ")\n";
            ofs << "if not exist \"%TEMP_ZIP%\" (\n";
            ofs << "    echo [ERROR] Could not download update package. Please check your internet connection.\n";
            ofs << "    echo.\n";
            ofs << "    pause\n";
            ofs << "    exit /b 1\n";
            ofs << ")\n";
            ofs << "echo [3/3] Performing 100%% clean wipe and installing fresh package...\n";
            ofs << "if not exist \"%BACKUP_DIR%\" mkdir \"%BACKUP_DIR%\" >nul 2>&1\n";
            ofs << "if exist \"%INSTALL_DIR%\\.meta\" copy /Y \"%INSTALL_DIR%\\.meta\" \"%BACKUP_DIR%\\.meta\" >nul 2>&1\n";
            ofs << "if exist \"%INSTALL_DIR%\\.window_state\" copy /Y \"%INSTALL_DIR%\\.window_state\" \"%BACKUP_DIR%\\.window_state\" >nul 2>&1\n";
            ofs << "if exist \"%INSTALL_DIR%\" rd /s /q \"%INSTALL_DIR%\" >nul 2>&1\n";
            ofs << "mkdir \"%INSTALL_DIR%\" >nul 2>&1\n";
            ofs << "tar.exe -xf \"%TEMP_ZIP%\" -C \"%INSTALL_DIR%\"\n";
            ofs << "del \"%TEMP_ZIP%\" >nul 2>&1\n";
            ofs << "if exist \"%BACKUP_DIR%\\.meta\" copy /Y \"%BACKUP_DIR%\\.meta\" \"%INSTALL_DIR%\\.meta\" >nul 2>&1\n";
            ofs << "if exist \"%BACKUP_DIR%\\.window_state\" copy /Y \"%BACKUP_DIR%\\.window_state\" \"%INSTALL_DIR%\\.window_state\" >nul 2>&1\n";
            ofs << "rd /s /q \"%BACKUP_DIR%\" >nul 2>&1\n";
            ofs << "echo.\n";
            ofs << "echo =========================================================\n";
            ofs << "echo  [SUCCESS] XCODING has been updated successfully!\n";
            ofs << "echo =========================================================\n";
            ofs << "echo.\n";
            ofs << "echo Launching XCODING...\n";
            ofs << "start \"\" \"%EXE_PATH%\"\n";
            ofs << "timeout /t 2 >nul\n";
            ofs << "exit\n";
            ofs.close();
        }

        // Launch the native batch updater
        HINSTANCE hInst = ShellExecuteW(
            NULL,
            L"open",
            batPath.wstring().c_str(),
            NULL,
            NULL,
            SW_SHOW
        );

        if ((INT_PTR)hInst > 32) {
            std::this_thread::sleep_for(std::chrono::milliseconds(200));
            ExitProcess(0);
        } else {
            PostJsonToWeb("{\"type\":\"force_update_error\",\"message\":\"Failed to launch updater process.\"}");
        }
    }).detach();
}

void IdeHost::HandleLoadMetaSession() {
    std::wstring metaPath = GetMetaFilePath();
    if (fs::exists(metaPath)) {
        std::ifstream inFile(metaPath, std::ios::in | std::ios::binary);
        if (inFile.is_open()) {
            std::string content((std::istreambuf_iterator<char>(inFile)), std::istreambuf_iterator<char>());
            inFile.close();

            if (!content.empty()) {
                std::string response = "{\"type\":\"meta_session_loaded\",\"exists\":true,\"data\":" + content + "}";
                PostJsonToWeb(response);
                return;
            }
        }
    }
    PostJsonToWeb("{\"type\":\"meta_session_loaded\",\"exists\":false}");
}

void IdeHost::HandleSaveMetaSession(const std::string& jsonData) {
    std::wstring metaPath = GetMetaFilePath();
    std::ofstream outFile(metaPath, std::ios::out | std::ios::binary);
    if (outFile.is_open()) {
        outFile.write(jsonData.data(), jsonData.size());
        outFile.close();
        PostJsonToWeb("{\"type\":\"meta_session_saved\",\"success\":true}");
        return;
    }
    PostJsonToWeb("{\"type\":\"meta_session_saved\",\"success\":false}");
}

void IdeHost::HandleDeleteMetaSession() {
    std::wstring metaPath = GetMetaFilePath();
    if (fs::exists(metaPath)) {
        std::error_code ec;
        fs::remove(metaPath, ec);
    }
    PostJsonToWeb("{\"type\":\"meta_session_deleted\",\"success\":true}");
}

void IdeHost::SendToolchainsList() {
    auto toolchains = m_compilerRunner->DetectToolchains();
    std::ostringstream ss;
    ss << "{\"type\":\"toolchains\",\"data\":[";
    for (size_t i = 0; i < toolchains.size(); ++i) {
        ss << "{"
           << "\"id\":\"" << toolchains[i].id << "\","
           << "\"name\":\"" << toolchains[i].name << "\","
           << "\"available\":" << (toolchains[i].isAvailable ? "true" : "false")
           << "}";
        if (i + 1 < toolchains.size()) ss << ",";
    }
    ss << "]}";
    PostJsonToWeb(ss.str());
}

std::string IdeHost::PrepareCppCode(const std::string& code) {
    if (code.find("using namespace std;") == std::string::npos && 
        code.find("using namespace std") == std::string::npos) {
        size_t lastInclude = code.rfind("#include");
        if (lastInclude != std::string::npos) {
            size_t endOfLine = code.find('\n', lastInclude);
            if (endOfLine != std::string::npos) {
                std::string modified = code;
                modified.insert(endOfLine + 1, "\nusing namespace std;\n");
                return modified;
            }
        }
        return "using namespace std;\n" + code;
    }
    return code;
}

std::wstring IdeHost::SaveCodeToDisk(const std::wstring& targetPath, const std::string& code) {
    std::string processedCode = PrepareCppCode(code);
    std::ofstream outFile(targetPath, std::ios::out | std::ios::binary);
    if (outFile.is_open()) {
        outFile.write(processedCode.data(), processedCode.size());
        outFile.close();
        return targetPath;
    }
    return L"";
}

void IdeHost::HandleBuildAndRun(
    const std::string& fileName,
    const std::string& filePath,
    const std::string& code,
    const CompileOptions& options,
    bool autoRun
) {
    std::thread([this, fileName, filePath, code, options, autoRun]() {
        std::wstring srcPath;
        std::wstring outExePath;
        std::wstring workDir;

        if (!filePath.empty() && fs::exists(Utf8ToWide(filePath))) {
            srcPath = Utf8ToWide(filePath);
            SaveCodeToDisk(srcPath, code);
            fs::path p(srcPath);
            workDir = p.parent_path().wstring();
            outExePath = (p.parent_path() / (p.stem().wstring() + L".exe")).wstring();
        } else {
            std::wstring safeName = fileName.empty() ? L"main.cpp" : Utf8ToWide(fileName);
            srcPath = m_tempDir + L"\\" + safeName;
            SaveCodeToDisk(srcPath, code);
            workDir = m_tempDir;
            outExePath = m_tempDir + L"\\" + fs::path(safeName).stem().wstring() + L".exe";
        }

        // Notify UI that compilation started
        std::string startMsg = "{\"type\":\"compile_start\",\"file\":\"" + 
                               EscapeJsonString(fileName.empty() ? "main.cpp" : fileName) + "\",\"compiler\":\"" + 
                               options.compilerId + "\"}";
        PostJsonToWeb(startMsg);

        CompileRequest req;
        req.sourceFilePath = srcPath;
        req.outputExePath = outExePath;
        req.workingDirectory = workDir;
        req.options = options;

        CompileResult compResult = m_compilerRunner->Compile(req, [this](const std::string& chunk) {
            std::string outMsg = "{\"type\":\"compile_output\",\"text\":\"" + 
                                 EscapeJsonString(chunk) + "\"}";
            PostJsonToWeb(outMsg);
        });

        // Notify Compile Complete
        std::ostringstream completeJson;
        completeJson << "{"
                     << "\"type\":\"compile_complete\","
                     << "\"success\":" << (compResult.success ? "true" : "false") << ","
                     << "\"exitCode\":" << compResult.exitCode << ","
                     << "\"durationMs\":" << compResult.durationMs << ","
                     << "\"errorCount\":" << compResult.errorCount << ","
                     << "\"warningCount\":" << compResult.warningCount << ","
                     << "\"rawOutput\":\"" << EscapeJsonString(compResult.rawOutput) << "\","
                     << "\"autoRun\":" << (autoRun && compResult.success ? "true" : "false")
                     << "}";
        PostJsonToWeb(completeJson.str());

        // Run executable if build succeeded and autoRun requested
        if (autoRun && compResult.success) {
            std::string runStart = "{\"type\":\"run_start\",\"executable\":\"" + 
                                   EscapeJsonString(WideToUtf8(fs::path(outExePath).filename().wstring())) + "\"}";
            PostJsonToWeb(runStart);

            m_compilerRunner->RunExecutable(
                outExePath,
                workDir,
                !options.integratedConsole,
                [this](const std::string& stdoutText) {
                    std::string msg = "{\"type\":\"run_stdout\",\"text\":\"" + 
                                      EscapeJsonString(stdoutText) + "\"}";
                    PostJsonToWeb(msg);
                },
                [this](const std::string& stderrText) {
                    std::string msg = "{\"type\":\"run_stderr\",\"text\":\"" + 
                                      EscapeJsonString(stderrText) + "\"}";
                    PostJsonToWeb(msg);
                },
                [this](int exitCode, long long durationMs) {
                    std::ostringstream exitMsg;
                    exitMsg << "{"
                            << "\"type\":\"run_exit\","
                            << "\"exitCode\":" << exitCode << ","
                            << "\"durationMs\":" << durationMs
                            << "}";
                    PostJsonToWeb(exitMsg.str());
                }
            );
        }
    }).detach();
}

void IdeHost::HandleRunTestSuite(
    const std::string& fileName,
    const std::string& filePath,
    const std::string& code,
    const CompileOptions& options,
    const std::vector<std::pair<std::string, std::string>>& testCases
) {
    std::thread([this, fileName, filePath, code, options, testCases]() {
        std::wstring safeName = fileName.empty() ? L"main.cpp" : Utf8ToWide(fileName);
        std::wstring srcPath = m_tempDir + L"\\" + safeName;
        SaveCodeToDisk(srcPath, code);
        std::wstring workDir = m_tempDir;
        std::wstring outExePath = m_tempDir + L"\\" + fs::path(safeName).stem().wstring() + L".exe";

        // Notify Compile Start
        PostJsonToWeb("{\"type\":\"test_suite_compile_start\"}");

        CompileRequest req;
        req.sourceFilePath = srcPath;
        req.outputExePath = outExePath;
        req.workingDirectory = workDir;
        req.options = options;

        CompileResult compResult = m_compilerRunner->Compile(req);
        if (!compResult.success) {
            std::string errJson = "{\"type\":\"test_suite_compile_error\",\"rawOutput\":\"" + 
                                  EscapeJsonString(compResult.rawOutput) + "\"}";
            PostJsonToWeb(errJson);
            return;
        }

        // Run each test case
        int passedCount = 0;
        int totalCount = static_cast<int>(testCases.size());

        for (int i = 0; i < totalCount; ++i) {
            std::string inData = testCases[i].first;
            if (!inData.empty() && inData.back() != '\n') inData += "\n";

            std::string expected = testCases[i].second;
            std::string actualOut;
            std::string actualErr;
            int exitCode = 0;
            long long durationMs = 0;

            bool ok = m_compilerRunner->RunTestCaseSync(
                outExePath,
                workDir,
                inData,
                3000,
                actualOut,
                actualErr,
                exitCode,
                durationMs
            );

            auto normalizeOutput = [](const std::string& raw) -> std::string {
                // 1. Remove all '\r' carriage returns (Windows CRLF normalization)
                std::string s;
                s.reserve(raw.size());
                for (char c : raw) {
                    if (c != '\r') {
                        s.push_back(c);
                    }
                }

                // 2. Trim trailing whitespace from each line
                std::string result;
                std::istringstream iss(s);
                std::string line;
                bool first = true;
                while (std::getline(iss, line)) {
                    while (!line.empty() && (line.back() == ' ' || line.back() == '\t')) {
                        line.pop_back();
                    }
                    if (!first) result += "\n";
                    result += line;
                    first = false;
                }

                // 3. Trim leading & trailing newlines/whitespace
                while (!result.empty() && (result.back() == '\n' || result.back() == ' ' || result.back() == '\t')) {
                    result.pop_back();
                }
                size_t start = 0;
                while (start < result.size() && (result[start] == '\n' || result[start] == ' ' || result[start] == '\t')) {
                    start++;
                }
                if (start > 0) {
                    result = result.substr(start);
                }
                return result;
            };

            std::string trimmedActual = normalizeOutput(actualOut);
            std::string trimmedExpected = normalizeOutput(expected);
            bool testPassed = (ok && exitCode == 0 && trimmedActual == trimmedExpected);
            if (testPassed) passedCount++;

            std::ostringstream tcMsg;
            tcMsg << "{"
                  << "\"type\":\"test_case_result\","
                  << "\"index\":" << i << ","
                  << "\"input\":\"" << EscapeJsonString(testCases[i].first) << "\","
                  << "\"expected\":\"" << EscapeJsonString(trimmedExpected) << "\","
                  << "\"actual\":\"" << EscapeJsonString(trimmedActual) << "\","
                  << "\"rawActual\":\"" << EscapeJsonString(actualOut) << "\","
                  << "\"passed\":" << (testPassed ? "true" : "false") << ","
                  << "\"exitCode\":" << exitCode << ","
                  << "\"durationMs\":" << durationMs
                  << "}";
            PostJsonToWeb(tcMsg.str());
        }

        std::ostringstream suiteMsg;
        suiteMsg << "{"
                 << "\"type\":\"test_suite_complete\","
                 << "\"passedCount\":" << passedCount << ","
                 << "\"totalCount\":" << totalCount << ","
                 << "\"allPassed\":" << (passedCount == totalCount ? "true" : "false")
                 << "}";
        PostJsonToWeb(suiteMsg.str());
    }).detach();
}

void IdeHost::HandleStop() {
    if (m_compilerRunner) {
        m_compilerRunner->TerminateActiveProcess();
    }
}

void IdeHost::HandleStdin(const std::string& text) {
    if (m_compilerRunner) {
        m_compilerRunner->SendStdin(text);
    }
}

void IdeHost::HandleOpenFile() {
    wchar_t szFile[MAX_PATH] = { 0 };
    OPENFILENAMEW ofn;
    ZeroMemory(&ofn, sizeof(ofn));
    ofn.lStructSize = sizeof(ofn);
    ofn.hwndOwner = m_hWnd;
    ofn.lpstrFile = szFile;
    ofn.nMaxFile = sizeof(szFile) / sizeof(wchar_t);
    ofn.lpstrFilter = L"C++ Source Files (*.cpp;*.cxx;*.cc;*.h;*.hpp)\0*.cpp;*.cxx;*.cc;*.h;*.hpp\0All Files (*.*)\0*.*\0";
    ofn.nFilterIndex = 1;
    ofn.Flags = OFN_PATHMUSTEXIST | OFN_FILEMUSTEXIST;

    if (GetOpenFileNameW(&ofn)) {
        std::wstring filePath(szFile);
        std::ifstream fileStream(filePath, std::ios::in | std::ios::binary);
        if (fileStream.is_open()) {
            std::ostringstream ss;
            ss << fileStream.rdbuf();
            std::string content = ss.str();
            std::string fileName = WideToUtf8(fs::path(filePath).filename().wstring());
            std::string pathUtf8 = WideToUtf8(filePath);

            std::string msg = "{\"type\":\"file_opened\",\"filePath\":\"" + 
                              EscapeJsonString(pathUtf8) + "\",\"fileName\":\"" + 
                              EscapeJsonString(fileName) + "\",\"content\":\"" + 
                              EscapeJsonString(content) + "\"}";
            PostJsonToWeb(msg);
        }
    }
}

void IdeHost::HandleSaveFile(const std::string& filePath, const std::string& fileName, const std::string& content) {
    if (filePath.empty()) {
        HandleSaveFileAs("", content);
        return;
    }

    std::wstring wPath = Utf8ToWide(filePath);
    SaveCodeToDisk(wPath, content);

    std::string msg = "{\"type\":\"file_saved\",\"filePath\":\"" + 
                      EscapeJsonString(filePath) + "\",\"fileName\":\"" + 
                      EscapeJsonString(fileName) + "\"}";
    PostJsonToWeb(msg);
}

void IdeHost::HandleSaveFileAs(const std::string& currentPath, const std::string& content) {
    wchar_t szFile[MAX_PATH] = L"main.cpp";
    if (!currentPath.empty()) {
        wcsncpy_s(szFile, Utf8ToWide(currentPath).c_str(), _TRUNCATE);
    }

    OPENFILENAMEW ofn;
    ZeroMemory(&ofn, sizeof(ofn));
    ofn.lStructSize = sizeof(ofn);
    ofn.hwndOwner = m_hWnd;
    ofn.lpstrFile = szFile;
    ofn.nMaxFile = sizeof(szFile) / sizeof(wchar_t);
    ofn.lpstrFilter = L"C++ Source (*.cpp)\0*.cpp\0C++ Header (*.h;*.hpp)\0*.h;*.hpp\0All Files (*.*)\0*.*\0";
    ofn.nFilterIndex = 1;
    ofn.lpstrDefExt = L"cpp";
    ofn.Flags = OFN_PATHMUSTEXIST | OFN_OVERWRITEPROMPT;

    if (GetSaveFileNameW(&ofn)) {
        std::wstring filePath(szFile);
        SaveCodeToDisk(filePath, content);
        std::string fileName = WideToUtf8(fs::path(filePath).filename().wstring());
        std::string pathUtf8 = WideToUtf8(filePath);

        std::string msg = "{\"type\":\"file_saved\",\"filePath\":\"" + 
                          EscapeJsonString(pathUtf8) + "\",\"fileName\":\"" + 
                          EscapeJsonString(fileName) + "\"}";
        PostJsonToWeb(msg);
    }
}

void IdeHost::HandleGoogleLoginBrowser() {
    StopOAuthLoopback();
    m_loopbackRunning = true;
    std::thread(&IdeHost::RunOAuthLoopback, this).detach();

    // Open default system browser to local authorization server
    ShellExecuteW(NULL, L"open", L"http://localhost:58231/login", NULL, NULL, SW_SHOWNORMAL);
}

void IdeHost::StopOAuthLoopback() {
    m_loopbackRunning = false;
    if (m_loopbackSocket != (uintptr_t)(~0)) {
        closesocket((SOCKET)m_loopbackSocket);
        m_loopbackSocket = (uintptr_t)(~0);
    }
}

static std::string UrlDecode(const std::string& in) {
    std::string out;
    out.reserve(in.length());
    for (size_t i = 0; i < in.length(); ++i) {
        if (in[i] == '%') {
            if (i + 2 < in.length()) {
                int value = 0;
                std::istringstream is(in.substr(i + 1, 2));
                if (is >> std::hex >> value) {
                    out += static_cast<char>(value);
                    i += 2;
                } else {
                    out += in[i];
                }
            }
        } else if (in[i] == '+') {
            out += ' ';
        } else {
            out += in[i];
        }
    }
    return out;
}

static std::string ExtractQueryParam(const std::string& url, const std::string& key) {
    std::string pattern = key + "=";
    size_t pos = url.find(pattern);
    if (pos == std::string::npos) return "";
    pos += pattern.length();
    size_t endPos = url.find_first_of(" &\r\n\t", pos);
    std::string raw = (endPos == std::string::npos) ? url.substr(pos) : url.substr(pos, endPos - pos);
    return UrlDecode(raw);
}

void IdeHost::RunOAuthLoopback() {
    WSADATA wsaData;
    if (WSAStartup(MAKEWORD(2, 2), &wsaData) != 0) {
        return;
    }

    SOCKET serverSock = socket(AF_INET, SOCK_STREAM, IPPROTO_TCP);
    if (serverSock == INVALID_SOCKET) {
        WSACleanup();
        return;
    }

    m_loopbackSocket = (uintptr_t)serverSock;

    int opt = 1;
    setsockopt(serverSock, SOL_SOCKET, SO_REUSEADDR, (const char*)&opt, sizeof(opt));

    sockaddr_in serverAddr = {};
    serverAddr.sin_family = AF_INET;
    serverAddr.sin_addr.s_addr = inet_addr("127.0.0.1");
    serverAddr.sin_port = htons(58231);

    if (bind(serverSock, (sockaddr*)&serverAddr, sizeof(serverAddr)) == SOCKET_ERROR) {
        closesocket(serverSock);
        m_loopbackSocket = (uintptr_t)(~0);
        WSACleanup();
        return;
    }

    if (listen(serverSock, 5) == SOCKET_ERROR) {
        closesocket(serverSock);
        m_loopbackSocket = (uintptr_t)(~0);
        WSACleanup();
        return;
    }

    while (m_loopbackRunning) {
        sockaddr_in clientAddr = {};
        int clientLen = sizeof(clientAddr);
        SOCKET clientSock = accept(serverSock, (sockaddr*)&clientAddr, &clientLen);
        if (clientSock == INVALID_SOCKET) break;

        char buffer[8192] = {};
        int bytesRead = recv(clientSock, buffer, sizeof(buffer) - 1, 0);
        if (bytesRead > 0) {
            std::string req(buffer, bytesRead);
            if (req.find("OPTIONS /") != std::string::npos) {
                std::string resp = "HTTP/1.1 200 OK\r\nAccess-Control-Allow-Origin: *\r\nAccess-Control-Allow-Methods: GET, POST, OPTIONS\r\nAccess-Control-Allow-Headers: *\r\nContent-Length: 0\r\nConnection: close\r\n\r\n";
                send(clientSock, resp.c_str(), (int)resp.length(), 0);
                closesocket(clientSock);
                continue;
            }

            if (req.find("GET /login") != std::string::npos) {
                std::string html = R"raw(<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>XCODING - Google Sign In</title>
  <script src="https://www.gstatic.com/firebasejs/10.8.0/firebase-app-compat.js"></script>
  <script src="https://www.gstatic.com/firebasejs/10.8.0/firebase-auth-compat.js"></script>
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body { background: #0a0a0a; color: #f5f5f7; font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; display: flex; align-items: center; justify-content: center; height: 100vh; }
    .card { background: #141414; border: 1px solid #282828; border-radius: 12px; padding: 36px 32px; width: 380px; text-align: center; box-shadow: 0 20px 40px rgba(0,0,0,0.8); }
    .brand { font-family: "Arial Black", sans-serif; font-style: italic; font-weight: 900; font-size: 26px; color: #ff2222; margin-bottom: 6px; letter-spacing: 2px; }
    .subtitle { color: #86868b; font-size: 13px; margin-bottom: 24px; line-height: 1.4; }
    .btn { width: 100%; background: #1e1e1e; border: 1px solid #383838; border-radius: 6px; color: #fff; font-size: 14px; font-weight: 600; padding: 12px 0; display: flex; align-items: center; justify-content: center; gap: 10px; cursor: pointer; transition: all 0.15s; }
    .btn:hover { background: #282828; border-color: #555; }
    .status-msg { margin-top: 16px; font-size: 13px; color: #888; }
    .success-icon { font-size: 44px; color: #34A853; margin-bottom: 12px; }
  </style>
</head>
<body>
  <div class="card" id="card-box">
    <div class="brand">XCODING</div>
    <div class="subtitle" id="sub-msg">Click below to authorize with your Google account:</div>
    <button class="btn" id="btn-auth" onclick="startGoogleAuth()">
      <svg viewBox="0 0 48 48" width="18" height="18"><path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/><path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/><path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/><path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/></svg>
      Sign in with Google
    </button>
    <div class="status-msg" id="status-text">Opening Google Sign-In popup...</div>
  </div>
  <script>
    const firebaseConfig = {
      apiKey: "AIzaSyC7sb5XDjPyzxKKlU7k_YCCZNEh4AU9EbI",
      authDomain: "xcoding-29d3a.firebaseapp.com",
      projectId: "xcoding-29d3a",
      appId: "1:923463455151:web:ed12fb53feaecdc3c45f5a"
    };
    firebase.initializeApp(firebaseConfig);

    async function startGoogleAuth() {
      const statusText = document.getElementById('status-text');
      statusText.textContent = "Connecting to Google...";
      try {
        const provider = new firebase.auth.GoogleAuthProvider();
        const res = await firebase.auth().signInWithPopup(provider);
        const user = res.user;
        const token = await user.getIdToken();
        const displayName = user.displayName || (user.email ? user.email.split('@')[0] : "Student");

        document.getElementById('card-box').innerHTML = `
          <div class="brand">XCODING</div>
          <div class="success-icon">✓</div>
          <h3 style="color:#fff; margin-bottom:8px;">Signed in as ${displayName}!</h3>
          <p style="color:#888; font-size:13px;">Authentication successful. You can close this tab and return to XCODING.</p>
        `;

        const qName = encodeURIComponent(displayName);
        const qEmail = encodeURIComponent(user.email || "");
        const qUid = encodeURIComponent(user.uid || "");
        const qToken = encodeURIComponent(token || "");

        await fetch(`/auth_callback?uid=${qUid}&email=${qEmail}&name=${qName}&token=${qToken}`);
        setTimeout(() => { window.close(); }, 1500);
      } catch (err) {
        statusText.style.color = "#ff6b6b";
        statusText.textContent = err.message;
      }
    }
    window.onload = startGoogleAuth;
  </script>
</body>
</html>)raw";

                std::string resp = "HTTP/1.1 200 OK\r\nAccess-Control-Allow-Origin: *\r\nContent-Type: text/html\r\nContent-Length: " + std::to_string(html.length()) + "\r\nConnection: close\r\n\r\n" + html;
                send(clientSock, resp.c_str(), (int)resp.length(), 0);
            } else if (req.find("/auth_callback") != std::string::npos) {
                std::string uid = ExtractQueryParam(req, "uid");
                std::string email = ExtractQueryParam(req, "email");
                std::string displayName = ExtractQueryParam(req, "name");
                std::string token = ExtractQueryParam(req, "token");

                if (uid.empty() || displayName.empty()) {
                    size_t bodyPos = req.find("\r\n\r\n");
                    if (bodyPos != std::string::npos) {
                        auto fields = ParseJsonObject(req.substr(bodyPos + 4));
                        if (uid.empty()) uid = fields["uid"];
                        if (email.empty()) email = fields["email"];
                        if (displayName.empty()) displayName = fields["displayName"];
                        if (token.empty()) token = fields["token"];
                    }
                }

                if (displayName.empty() && !email.empty()) {
                    size_t atPos = email.find('@');
                    displayName = (atPos != std::string::npos) ? email.substr(0, atPos) : email;
                }
                if (displayName.empty()) {
                    displayName = "Student";
                }

                std::ostringstream ss;
                ss << "{\"type\":\"google_auth_success\",\"user\":{"
                   << "\"uid\":\"" << EscapeJsonString(uid) << "\","
                   << "\"email\":\"" << EscapeJsonString(email) << "\","
                   << "\"displayName\":\"" << EscapeJsonString(displayName) << "\","
                   << "\"token\":\"" << EscapeJsonString(token) << "\""
                   << "}}";
                PostJsonToWeb(ss.str());

                std::string okJson = "{\"status\":\"ok\"}";
                std::string resp = "HTTP/1.1 200 OK\r\nAccess-Control-Allow-Origin: *\r\nContent-Type: application/json\r\nContent-Length: " + std::to_string(okJson.length()) + "\r\nConnection: close\r\n\r\n" + okJson;
                send(clientSock, resp.c_str(), (int)resp.length(), 0);

                closesocket(clientSock);
                break;
            }
        }
        closesocket(clientSock);
    }

    closesocket(serverSock);
    m_loopbackSocket = (uintptr_t)(~0);
    WSACleanup();
}
