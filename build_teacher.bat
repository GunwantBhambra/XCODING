@echo off
setlocal enabledelayedexpansion

echo =======================================================
echo  Building XCODING Teacher Edition (Native Windows EXE)
echo =======================================================

:: 1. Initialize Visual Studio Build Tools
echo [1/3] Initializing Visual Studio build environment...
if defined VSCMD_VER goto vs_ready

set "VS_LOCATIONS="
set "VS_LOCATIONS=!VS_LOCATIONS! "C:\Program Files\Microsoft Visual Studio\2022\Community\VC\Auxiliary\Build\vcvars64.bat""
set "VS_LOCATIONS=!VS_LOCATIONS! "C:\Program Files\Microsoft Visual Studio\2022\Professional\VC\Auxiliary\Build\vcvars64.bat""
set "VS_LOCATIONS=!VS_LOCATIONS! "C:\Program Files\Microsoft Visual Studio\2022\Enterprise\VC\Auxiliary\Build\vcvars64.bat""
set "VS_LOCATIONS=!VS_LOCATIONS! "C:\Program Files\Microsoft Visual Studio\2022\BuildTools\VC\Auxiliary\Build\vcvars64.bat""
set "VS_LOCATIONS=!VS_LOCATIONS! "C:\Program Files (x86)\Microsoft Visual Studio\2019\Community\VC\Auxiliary\Build\vcvars64.bat""
set "VS_LOCATIONS=!VS_LOCATIONS! "C:\Program Files (x86)\Microsoft Visual Studio\2019\BuildTools\VC\Auxiliary\Build\vcvars64.bat""

set "FOUND_VCVARS="
for %%V in (!VS_LOCATIONS!) do (
    if exist %%V (
        set "FOUND_VCVARS=%%~V"
        goto found_vcvars
    )
)

if not defined FOUND_VCVARS (
    echo [ERROR] Visual Studio C++ build environment not found.
    exit /b 1
)

:found_vcvars
call "!FOUND_VCVARS!" >nul 2>&1
if errorlevel 1 (
    echo [ERROR] Failed to initialize MSVC vcvars64 environment.
    exit /b 1
)

:vs_ready
:: 2. Ensure bin directory exists
if not exist "bin" mkdir bin

:: 3. Compile Windows Resources and C++ source files with /D XCODING_TEACHER_BUILD
echo [2/3] Compiling Teacher Edition C++ sources (/MT, /D XCODING_TEACHER_BUILD)...
rc.exe /nologo /fo src\app.res src\app.rc

cl.exe /nologo /O2 /MT /EHsc /std:c++17 /W3 /utf-8 /permissive- /D XCODING_TEACHER_BUILD ^
    /I "third_party\webview2\include" ^
    /I "src" ^
    src\main.cpp src\ide_host.cpp src\compiler_runner.cpp src\app.res ^
    /link ^
    /LIBPATH:"third_party\webview2\lib\x64" ^
    WebView2LoaderStatic.lib ^
    User32.lib Gdi32.lib Shell32.lib Ole32.lib OleAut32.lib Comdlg32.lib Shlwapi.lib Advapi32.lib Dwmapi.lib Ws2_32.lib Wininet.lib Version.lib ^
    /SUBSYSTEM:WINDOWS ^
    /OUT:bin\XCODING_TEACHER.exe

if errorlevel 1 (
    echo [ERROR] Compilation of Teacher Edition failed.
    exit /b 1
)

:: 4. Synchronize assets into bin\assets
echo [3/3] Synchronizing assets into bin\assets...
if not exist "bin\assets" mkdir "bin\assets"
xcopy /E /I /Y /Q "assets" "bin\assets" >nul 2>&1

echo.
echo =======================================================
echo  [SUCCESS] XCODING Teacher Edition build completed
echo  Binary location: bin\XCODING_TEACHER.exe
echo =======================================================
echo.

endlocal
exit /b 0
