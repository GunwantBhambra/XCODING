#ifndef WIN32_LEAN_AND_MEAN
#define WIN32_LEAN_AND_MEAN
#endif
#ifndef _WINSOCK_DEPRECATED_NO_WARNINGS
#define _WINSOCK_DEPRECATED_NO_WARNINGS
#endif
#include <winsock2.h>
#include <ws2tcpip.h>
#include <windows.h>
#include <shellapi.h>
#include <wrl.h>
#include <string>
#include <memory>
#include <thread>
#include <atomic>
#include <unordered_map>
#include "WebView2.h"
#include "compiler_runner.hpp"

#define WM_APP_POST_WEB_MESSAGE (WM_APP + 100)

class IdeHost {
public:
    IdeHost(HWND hWnd);
    ~IdeHost();

    void InitializeWebView(const std::wstring& htmlPath);
    void Resize(int width, int height);

    void HandleWebMessage(const std::wstring& rawJson);
    void PostJsonToWeb(const std::string& jsonString);
    void DispatchJsonToWeb(const std::string& jsonString);

    HWND GetHwnd() const { return m_hWnd; }

private:
    HWND m_hWnd;
    Microsoft::WRL::ComPtr<ICoreWebView2Environment> m_webViewEnv;
    Microsoft::WRL::ComPtr<ICoreWebView2Controller> m_webViewController;
    Microsoft::WRL::ComPtr<ICoreWebView2> m_webView;
    std::unique_ptr<CompilerRunner> m_compilerRunner;

    std::wstring m_tempDir;
    std::wstring m_currentFilePath;

    void HandleBuildAndRun(const std::string& fileName, const std::string& filePath, const std::string& code, const CompileOptions& options, bool autoRun);
    void HandleRunTestSuite(const std::string& fileName, const std::string& filePath, const std::string& code, const CompileOptions& options, const std::vector<std::pair<std::string, std::string>>& testCases);
    void HandleStop();
    void HandleStdin(const std::string& text);
    void HandleOpenFile();
    void HandleSaveFile(const std::string& filePath, const std::string& fileName, const std::string& content);
    void HandleSaveFileAs(const std::string& currentPath, const std::string& content);
    void SendToolchainsList();

    void HandleLoadMetaSession();
    void HandleSaveMetaSession(const std::string& jsonData);
    void HandleDeleteMetaSession();
    std::wstring GetMetaFilePath();

    void HandleCheckForUpdates(bool manualTrigger);
    void HandlePerformUpdate(const std::string& downloadUrl);

    void HandleGoogleLoginBrowser();
    void RunOAuthLoopback();
    void StopOAuthLoopback();

    std::wstring SaveCodeToDisk(const std::wstring& targetPath, const std::string& code);
    std::string PrepareCppCode(const std::string& code);
    std::string EscapeJsonString(const std::string& input);

    uintptr_t m_loopbackSocket = (uintptr_t)(~0);
    bool m_loopbackRunning = false;
};
