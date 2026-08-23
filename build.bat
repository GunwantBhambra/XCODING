@echo off
setlocal enabledelayedexpansion

echo =======================================================
echo  Building XCODING C++ Student IDE (Native Windows EXE)
echo =======================================================

set "VCVARS="

if exist "C:\Program Files\Microsoft Visual Studio\18\Community\VC\Auxiliary\Build\vcvars64.bat" (
    set "VCVARS=C:\Program Files\Microsoft Visual Studio\18\Community\VC\Auxiliary\Build\vcvars64.bat"
) else if exist "C:\Program Files\Microsoft Visual Studio\2022\Community\VC\Auxiliary\Build\vcvars64.bat" (
    set "VCVARS=C:\Program Files\Microsoft Visual Studio\2022\Community\VC\Auxiliary\Build\vcvars64.bat"
) else if exist "C:\Program Files\Microsoft Visual Studio\2022\Enterprise\VC\Auxiliary\Build\vcvars64.bat" (
    set "VCVARS=C:\Program Files\Microsoft Visual Studio\2022\Enterprise\VC\Auxiliary\Build\vcvars64.bat"
) else if exist "C:\Program Files\Microsoft Visual Studio\2022\Professional\VC\Auxiliary\Build\vcvars64.bat" (
    set "VCVARS=C:\Program Files\Microsoft Visual Studio\2022\Professional\VC\Auxiliary\Build\vcvars64.bat"
)

if "%VCVARS%"=="" (
    echo [ERROR] Could not find Visual Studio vcvars64.bat.
    exit /b 1
)

echo [1/3] Initializing Visual Studio build environment...
call "%VCVARS%" >nul 2>&1
if errorlevel 1 (
    echo [ERROR] Failed to initialize MSVC environment.
    exit /b 1
)

if not exist "bin" mkdir "bin"

echo [2/4] Packing embedded assets into assets.zip...
python tools\pack_assets.py
if errorlevel 1 (
    echo [ERROR] Asset packing failed.
    exit /b 1
)

echo [3/4] Compiling Windows Resources and C++ source files (/MT Static)...
rc.exe /nologo /fo src\app.res src\app.rc

cl.exe /nologo /O2 /MT /EHsc /std:c++17 /W3 /utf-8 /permissive- ^
    /I "third_party\webview2\include" ^
    /I "src" ^
    src\main.cpp src\ide_host.cpp src\compiler_runner.cpp src\app.res ^
    /link ^
    /LIBPATH:"third_party\webview2\lib\x64" ^
    WebView2LoaderStatic.lib ^
    User32.lib Gdi32.lib Shell32.lib Ole32.lib OleAut32.lib Comdlg32.lib Shlwapi.lib Advapi32.lib Dwmapi.lib Ws2_32.lib Wininet.lib Urlmon.lib Version.lib ^
    /SUBSYSTEM:WINDOWS ^
    /OUT:bin\XCODING.exe

if errorlevel 1 (
    echo [ERROR] Compilation failed.
    exit /b 1
)

echo [4/4] Finalizing portable binaries...
if not exist "bin\assets" mkdir "bin\assets"
xcopy /E /I /Y "assets" "bin\assets" >nul
copy /Y "bin\XCODING.exe" "bin\CodeFork.exe" >nul

del /Q *.obj 2>nul

echo.
echo =======================================================
echo  [SUCCESS] XCODING build completed!
echo  Binary location: bin\XCODING.exe
echo =======================================================
