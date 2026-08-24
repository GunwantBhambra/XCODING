#include "ide_host.hpp"
#include "resource.h"
#include "assets_version.h"
#include <dwmapi.h>
#include <shlobj.h>
#include <filesystem>
#include <fstream>
#include <iostream>
#include <vector>

#pragma comment(lib, "dwmapi.lib")
#pragma comment(lib, "User32.lib")
#pragma comment(lib, "Gdi32.lib")
#pragma comment(lib, "Shell32.lib")
#pragma comment(lib, "Ole32.lib")
#pragma comment(lib, "OleAut32.lib")

namespace fs = std::filesystem;

#ifndef DWMWA_USE_IMMERSIVE_DARK_MODE
#define DWMWA_USE_IMMERSIVE_DARK_MODE 20
#endif

static IdeHost* g_pIdeHost = nullptr;

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

static std::wstring EnsureAssetsExtracted(HINSTANCE hInstance) {
    wchar_t exePathBuffer[MAX_PATH];
    GetModuleFileNameW(NULL, exePathBuffer, MAX_PATH);
    fs::path exeDir = fs::path(exePathBuffer).parent_path();

    // 1. Check if assets/editor/index.html exists adjacent to the exe
    fs::path localHtml = exeDir / "assets" / "editor" / "index.html";
    if (fs::exists(localHtml)) {
        return localHtml.wstring();
    }

    // 2. Fallback check in %LOCALAPPDATA%\XCODING\assets
    fs::path appDataDir = fs::path(GetXcodingAppDataDir());
    fs::path appDataHtml = appDataDir / "assets" / "editor" / "index.html";
    if (fs::exists(appDataHtml)) {
        return appDataHtml.wstring();
    }

    return localHtml.wstring();
}

LRESULT CALLBACK WndProc(HWND hWnd, UINT message, WPARAM wParam, LPARAM lParam) {
    switch (message) {
        case WM_NCCALCSIZE: {
            if (wParam == TRUE) {
                return 0;
            }
            break;
        }

        case WM_NCHITTEST: {
            if (IsZoomed(hWnd)) {
                return HTCLIENT;
            }
            POINT pt;
            pt.x = (short)LOWORD(lParam);
            pt.y = (short)HIWORD(lParam);

            RECT rc;
            GetWindowRect(hWnd, &rc);
            const int border = 8;

            bool left   = pt.x >= rc.left && pt.x < rc.left + border;
            bool right  = pt.x <= rc.right && pt.x > rc.right - border;
            bool top    = pt.y >= rc.top && pt.y < rc.top + border;
            bool bottom = pt.y <= rc.bottom && pt.y > rc.bottom - border;

            if (top && left) return HTTOPLEFT;
            if (top && right) return HTTOPRIGHT;
            if (bottom && left) return HTBOTTOMLEFT;
            if (bottom && right) return HTBOTTOMRIGHT;
            if (left) return HTLEFT;
            if (right) return HTRIGHT;
            if (top) return HTTOP;
            if (bottom) return HTBOTTOM;

            return HTCLIENT;
        }

        case WM_GETMINMAXINFO: {
            MINMAXINFO* pMinMax = reinterpret_cast<MINMAXINFO*>(lParam);
            HMONITOR hMonitor = MonitorFromWindow(hWnd, MONITOR_DEFAULTTONEAREST);
            MONITORINFO monitorInfo = { sizeof(MONITORINFO) };
            if (GetMonitorInfo(hMonitor, &monitorInfo)) {
                RECT rcWork = monitorInfo.rcWork;
                RECT rcMonitor = monitorInfo.rcMonitor;
                pMinMax->ptMaxPosition.x = rcWork.left - rcMonitor.left;
                pMinMax->ptMaxPosition.y = rcWork.top - rcMonitor.top;
                pMinMax->ptMaxSize.x = rcWork.right - rcWork.left;
                pMinMax->ptMaxSize.y = rcWork.bottom - rcWork.top;
            }
            pMinMax->ptMinTrackSize.x = 600;
            pMinMax->ptMinTrackSize.y = 400;
            return 0;
        }

        case WM_SIZE: {
            int width = LOWORD(lParam);
            int height = HIWORD(lParam);
            if (g_pIdeHost) {
                g_pIdeHost->Resize(width, height);
            }
            return 0;
        }

        case WM_APP_POST_WEB_MESSAGE: {
            std::string* pStr = reinterpret_cast<std::string*>(lParam);
            if (pStr) {
                if (g_pIdeHost) {
                    g_pIdeHost->DispatchJsonToWeb(*pStr);
                }
                delete pStr;
            }
            return 0;
        }

        case WM_DESTROY: {
            WINDOWPLACEMENT wp = { sizeof(WINDOWPLACEMENT) };
            if (GetWindowPlacement(hWnd, &wp)) {
                RECT rc = wp.rcNormalPosition;
                int sx = rc.left;
                int sy = rc.top;
                int sw = rc.right - rc.left;
                int sh = rc.bottom - rc.top;
                int maxFlag = (wp.showCmd == SW_SHOWMAXIMIZED || IsZoomed(hWnd)) ? 1 : 0;
                
                fs::path winStatePath = fs::path(GetXcodingAppDataDir()) / ".window_state";
                std::ofstream ofs(winStatePath);
                if (ofs.is_open()) {
                    ofs << sx << " " << sy << " " << sw << " " << sh << " " << maxFlag << "\n";
                }
            }

            if (g_pIdeHost) {
                delete g_pIdeHost;
                g_pIdeHost = nullptr;
            }
            PostQuitMessage(0);
            return 0;
        }

        case WM_ERASEBKGND:
            return 1;
    }
    return DefWindowProcW(hWnd, message, wParam, lParam);
}

int WINAPI wWinMain(HINSTANCE hInstance, HINSTANCE hPrevInstance, PWSTR pCmdLine, int nCmdShow) {
    SetProcessDpiAwarenessContext(DPI_AWARENESS_CONTEXT_PER_MONITOR_AWARE_V2);

    HRESULT hrCoInit = CoInitializeEx(NULL, COINIT_APARTMENTTHREADED | COINIT_DISABLE_OLE1DDE);

    const wchar_t CLASS_NAME[] = L"XCODING_WindowClass";

    HICON hAppIcon = (HICON)LoadImageW(hInstance, MAKEINTRESOURCEW(IDI_APP_ICON), IMAGE_ICON, GetSystemMetrics(SM_CXICON), GetSystemMetrics(SM_CYICON), LR_DEFAULTCOLOR);
    HICON hAppIconSm = (HICON)LoadImageW(hInstance, MAKEINTRESOURCEW(IDI_APP_ICON), IMAGE_ICON, GetSystemMetrics(SM_CXSMICON), GetSystemMetrics(SM_CYSMICON), LR_DEFAULTCOLOR);
    if (!hAppIcon) hAppIcon = LoadIcon(NULL, IDI_APPLICATION);
    if (!hAppIconSm) hAppIconSm = LoadIcon(NULL, IDI_APPLICATION);

    WNDCLASSEXW wc = { 0 };
    wc.cbSize = sizeof(WNDCLASSEXW);
    wc.style = CS_HREDRAW | CS_VREDRAW;
    wc.lpfnWndProc = WndProc;
    wc.hInstance = hInstance;
    wc.hCursor = LoadCursor(NULL, IDC_ARROW);
    wc.hbrBackground = (HBRUSH)GetStockObject(BLACK_BRUSH);
    wc.lpszClassName = CLASS_NAME;
    wc.hIcon = hAppIcon;
    wc.hIconSm = hAppIconSm;

    if (!RegisterClassExW(&wc)) {
        MessageBoxW(NULL, L"Failed to register window class.", L"XCODING Error", MB_OK | MB_ICONERROR);
        return 1;
    }

    // Get desktop work area
    RECT workArea = { 0 };
    SystemParametersInfo(SPI_GETWORKAREA, 0, &workArea, 0);
    int workWidth = workArea.right - workArea.left;
    int workHeight = workArea.bottom - workArea.top;
    int windowWidth = (workWidth > 1200) ? 1200 : (workWidth - 40);
    int windowHeight = (workHeight > 800) ? 800 : (workHeight - 40);
    int windowX = workArea.left + (workWidth - windowWidth) / 2;
    int windowY = workArea.top + (workHeight - windowHeight) / 2;
    bool isMaximized = false;

    // Restore saved window size & position from %LOCALAPPDATA%\XCODING\.window_state
    fs::path winStatePath = fs::path(GetXcodingAppDataDir()) / ".window_state";
    if (fs::exists(winStatePath)) {
        std::ifstream ifs(winStatePath);
        if (ifs.is_open()) {
            int sx = 0, sy = 0, sw = 0, sh = 0, maxFlag = 0;
            if (ifs >> sx >> sy >> sw >> sh >> maxFlag) {
                if (sw >= 600 && sh >= 400 && sx >= workArea.left - 200 && sy >= workArea.top - 200) {
                    windowX = sx;
                    windowY = sy;
                    windowWidth = sw;
                    windowHeight = sh;
                    isMaximized = (maxFlag == 1);
                }
            }
        }
    }

    HWND hWnd = CreateWindowExW(
        WS_EX_APPWINDOW,
        CLASS_NAME,
        L"XCODING",
        WS_OVERLAPPEDWINDOW,
        windowX, windowY, windowWidth, windowHeight,
        NULL,
        NULL,
        hInstance,
        NULL
    );

    if (!hWnd) {
        MessageBoxW(NULL, L"Failed to create application window.", L"XCODING Error", MB_OK | MB_ICONERROR);
        return 1;
    }

    // Set Taskbar and Title icons
    SendMessage(hWnd, WM_SETICON, ICON_BIG, (LPARAM)hAppIcon);
    SendMessage(hWnd, WM_SETICON, ICON_SMALL, (LPARAM)hAppIconSm);

    // Dark Mode & Frame Shadow
    BOOL useDarkMode = TRUE;
    DwmSetWindowAttribute(hWnd, DWMWA_USE_IMMERSIVE_DARK_MODE, &useDarkMode, sizeof(useDarkMode));
    
    MARGINS margins = { 1, 1, 1, 1 };
    DwmExtendFrameIntoClientArea(hWnd, &margins);

    SetWindowPos(hWnd, NULL, 0, 0, 0, 0, 
                 SWP_FRAMECHANGED | SWP_NOMOVE | SWP_NOSIZE | SWP_NOZORDER | SWP_NOACTIVATE);

    std::wstring htmlPath = EnsureAssetsExtracted(hInstance);

    g_pIdeHost = new IdeHost(hWnd);
    g_pIdeHost->InitializeWebView(htmlPath);

    if (isMaximized) {
        ShowWindow(hWnd, SW_MAXIMIZE);
    } else {
        ShowWindow(hWnd, nCmdShow);
    }
    UpdateWindow(hWnd);

    MSG msg;
    while (GetMessageW(&msg, NULL, 0, 0)) {
        TranslateMessage(&msg);
        DispatchMessageW(&msg);
    }

    CoUninitialize();
    return (int)msg.wParam;
}
