& {
    $ErrorActionPreference = "Continue"

    Write-Host ""
    Write-Host " =========================================================" -ForegroundColor Cyan
    Write-Host "   __   __ _____ ____  ____  ___ _   _  ____ " -ForegroundColor Cyan
    Write-Host "   \ \ / // ____/ __ \|  _ \|_ _| \ | |/ ___|" -ForegroundColor Cyan
    Write-Host "    \ V /| |   | |  | | | | || ||  \| | |  _ " -ForegroundColor Cyan
    Write-Host "     | | | |___| |__| | |_| || || |\  | |_| |" -ForegroundColor Cyan
    Write-Host "     |_|  \_____\____/|____/|___|_| \_|\____|" -ForegroundColor Cyan
    Write-Host "       C++ Student Interactive IDE - 1-Click Installer" -ForegroundColor DarkGray
    Write-Host " =========================================================" -ForegroundColor Cyan
    Write-Host ""

    $installDir = "$env:LOCALAPPDATA\Programs\XCODING"
    $exePath = "$installDir\XCODING.exe"

    # Terminate any running IDE instances so binaries can be overwritten
    Get-Process -Name "XCODING", "XCODING_TEACHER", "CodeFork" -ErrorAction SilentlyContinue | Stop-Process -Force -ErrorAction SilentlyContinue
    Start-Sleep -Milliseconds 600

    if (-not (Test-Path $installDir)) {
        New-Item -ItemType Directory -Path $installDir -Force | Out-Null
    }

    Write-Host "[1/4] Resolving release download source..." -ForegroundColor Yellow
    [Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12

    $urlsToTry = @(
        "https://github.com/GunwantBhambra/XCODING/raw/main/XCODING_windows_x64.zip",
        "https://raw.githubusercontent.com/GunwantBhambra/XCODING/main/XCODING_windows_x64.zip",
        "https://raw.githubusercontent.com/GunwantBhambra/XCODING/main/bin/XCODING_windows_x64.zip",
        "https://github.com/GunwantBhambra/XCODING/releases/latest/download/XCODING_windows_x64.zip"
    )

    Write-Host "[2/4] Downloading and extracting XCODING package..." -ForegroundColor Yellow
    $downloadSuccess = $false

    $stagingDir = "$env:TEMP\XCODING_staging_$([System.Guid]::NewGuid().ToString('N').Substring(0,8))"
    New-Item -ItemType Directory -Path $stagingDir -Force | Out-Null
    $tempZip = "$stagingDir\XCODING_package.zip"

    foreach ($url in $urlsToTry) {
        try {
            Write-Host "  -> Fetching from: $url" -ForegroundColor DarkGray
            if (Test-Path $tempZip) { Remove-Item $tempZip -Force -ErrorAction SilentlyContinue }
            
            # Use curl.exe if available (fastest and handles redirects/TLS natively)
            $curlPath = "$env:SystemRoot\System32\curl.exe"
            if (Test-Path $curlPath) {
                & $curlPath -f -L -s -S --retry 2 -o $tempZip $url 2>$null
            }

            if ((-not (Test-Path $tempZip)) -or ((Get-Item $tempZip).Length -lt 1000000)) {
                $req = [System.Net.HttpWebRequest]::Create($url)
                $req.UserAgent = "Mozilla/5.0 (Windows NT 10.0; Win64; x64)"
                $req.AllowAutoRedirect = $true
                $req.Timeout = 60000
                $resp = $req.GetResponse()
                
                $fileStream = [System.IO.File]::Create($tempZip)
                $respStream = $resp.GetResponseStream()
                $respStream.CopyTo($fileStream)
                $fileStream.Close()
                $respStream.Close()
                $resp.Close()
            }

            if ((Test-Path $tempZip) -and ((Get-Item $tempZip).Length -gt 1000000)) {
                # 1. Back up metadata if it exists
                $metaBackup = $null
                if (Test-Path "$installDir\.meta") { $metaBackup = Get-Content "$installDir\.meta" -Raw }
                $winStateBackup = $null
                if (Test-Path "$installDir\.window_state") { $winStateBackup = Get-Content "$installDir\.window_state" -Raw }

                # 2. Terminate all lingering processes forcefully and wait
                Get-Process -Name "XCODING", "XCODING_TEACHER", "CodeFork", "msedgewebview2" -ErrorAction SilentlyContinue | Stop-Process -Force -ErrorAction SilentlyContinue
                Start-Sleep -Milliseconds 800

                # 3. DELETE AND REMAKE INSTALL DIRECTORY
                if (Test-Path $installDir) {
                    Remove-Item -Path $installDir -Recurse -Force -ErrorAction SilentlyContinue
                    Start-Sleep -Milliseconds 200
                }
                New-Item -ItemType Directory -Path $installDir -Force | Out-Null

                # 4. Extract package directly into clean $installDir
                $tarExe = "$env:SystemRoot\System32\tar.exe"
                if (Test-Path $tarExe) {
                    & $tarExe -xf $tempZip -C $installDir
                } else {
                    Expand-Archive -Path $tempZip -DestinationPath $installDir -Force
                }

                # 5. Restore metadata
                if ($metaBackup) { Set-Content -Path "$installDir\.meta" -Value $metaBackup -Force }
                if ($winStateBackup) { Set-Content -Path "$installDir\.window_state" -Value $winStateBackup -Force }

                # 6. Comprehensive cleanup
                Remove-Item -Path $stagingDir -Recurse -Force -ErrorAction SilentlyContinue
                Get-ChildItem -Path $installDir -Filter "*.zip" -File | Remove-Item -Force -ErrorAction SilentlyContinue
                Get-ChildItem -Path $installDir -Filter "*.old.*" -Recurse | Remove-Item -Force -ErrorAction SilentlyContinue
                if (Test-Path "$installDir\tracted") { Remove-Item -Path "$installDir\tracted" -Recurse -Force -ErrorAction SilentlyContinue }
                
                $downloadSuccess = $true
                Write-Host "[SUCCESS] Package installed successfully to $installDir" -ForegroundColor Green
                break
            }
        } catch {
            Write-Host "     Retry fallback: $($_.Exception.Message)" -ForegroundColor DarkGray
        }
    }

    if (-not $downloadSuccess) {
        $exeUrls = @(
            "https://github.com/GunwantBhambra/XCODING/raw/main/bin/XCODING.exe",
            "https://raw.githubusercontent.com/GunwantBhambra/XCODING/main/bin/XCODING.exe"
        )
        foreach ($eUrl in $exeUrls) {
            try {
                $req = [System.Net.HttpWebRequest]::Create($eUrl)
                $req.UserAgent = "Mozilla/5.0"
                $req.AllowAutoRedirect = $true
                $resp = $req.GetResponse()
                $fileStream = [System.IO.File]::Create($exePath)
                $resp.GetResponseStream().CopyTo($fileStream)
                $fileStream.Close()
                $resp.Close()

                if ((Test-Path $exePath) -and ((Get-Item $exePath).Length -gt 200000)) {
                    $downloadSuccess = $true
                    Write-Host "[SUCCESS] Downloaded binary to $exePath" -ForegroundColor Green
                    break
                }
            } catch {}
        }
    }

    if (-not $downloadSuccess) {
        Write-Host "[ERROR] Could not download package from any source. Please check your internet connection." -ForegroundColor Red
        return
    }

    # Unblock all files in installation directory
    Get-ChildItem -Path $installDir -Recurse | Unblock-File -ErrorAction SilentlyContinue

    Write-Host "[3/4] Configuring environment PATH & Shortcuts..." -ForegroundColor Yellow
    try {
        $userPath = [Environment]::GetEnvironmentVariable("Path", "User")
        if ($userPath -notlike "*$installDir*") {
            [Environment]::SetEnvironmentVariable("Path", "$userPath;$installDir", "User")
            $env:Path += ";$installDir"
            Write-Host "[SUCCESS] Added 'xcoding' command to PATH" -ForegroundColor Green
        }
    } catch {}

    try {
        $wshShell = New-Object -ComObject WScript.Shell
        $desktopPath = [Environment]::GetFolderPath("Desktop")
        $shortcut = $wshShell.CreateShortcut("$desktopPath\XCODING.lnk")
        $shortcut.TargetPath = $exePath
        $shortcut.WorkingDirectory = $installDir
        $shortcut.Description = "XCODING C++ Student Interactive IDE"
        if (Test-Path "$installDir\assets\app_icon.ico") {
            $shortcut.IconLocation = "$installDir\assets\app_icon.ico"
        }
        $shortcut.Save()
        Write-Host "[SUCCESS] Desktop shortcut created!" -ForegroundColor Green
    } catch {}

    # Check if a C++ compiler is installed on this machine
    $hasCompiler = $false
    if (Get-Command cl.exe -ErrorAction SilentlyContinue) { $hasCompiler = $true }
    elseif (Get-Command g++.exe -ErrorAction SilentlyContinue) { $hasCompiler = $true }
    elseif (Get-Command clang++.exe -ErrorAction SilentlyContinue) { $hasCompiler = $true }
    elseif (Test-Path "C:\Program Files\Microsoft Visual Studio\2022\BuildTools\VC\Auxiliary\Build\vcvars64.bat") { $hasCompiler = $true }
    elseif (Test-Path "C:\Program Files\Microsoft Visual Studio\2022\Community\VC\Auxiliary\Build\vcvars64.bat") { $hasCompiler = $true }
    elseif (Test-Path "C:\Program Files (x86)\Microsoft Visual Studio\2022\BuildTools\VC\Auxiliary\Build\vcvars64.bat") { $hasCompiler = $true }
    elseif (Test-Path "C:\Program Files (x86)\Microsoft Visual Studio\2019\BuildTools\VC\Auxiliary\Build\vcvars64.bat") { $hasCompiler = $true }
    elseif (Test-Path "C:\Program Files (x86)\Microsoft Visual Studio\2019\Community\VC\Auxiliary\Build\vcvars64.bat") { $hasCompiler = $true }
    elseif (Test-Path "C:\msys64\mingw64\bin\g++.exe") { $hasCompiler = $true }

    if (-not $hasCompiler) {
        Write-Host ""
        Write-Host "=========================================================" -ForegroundColor Yellow
        Write-Host " [NOTICE] No C++ Compiler Detected on this PC" -ForegroundColor Yellow
        Write-Host "=========================================================" -ForegroundColor Yellow
        Write-Host " XCODING needs a compiler (MSVC or MinGW) to run code." -ForegroundColor White
        Write-Host " You can install MSVC Build Tools automatically with:" -ForegroundColor Cyan
        Write-Host "   winget install Microsoft.VisualStudio.2022.BuildTools --override `"--add Microsoft.VisualStudio.Workload.VCTools --includeRecommended --passive`"" -ForegroundColor Green
        Write-Host "=========================================================" -ForegroundColor Yellow
        Write-Host ""
    }

    Write-Host "[4/4] Launching XCODING..." -ForegroundColor Cyan
    try {
        Start-Process $exePath
    } catch {
        Write-Host "[INFO] To launch XCODING, double-click the desktop shortcut or type 'xcoding'." -ForegroundColor Cyan
    }

    Write-Host ""
    Write-Host "=========================================================" -ForegroundColor Green
    Write-Host " Installation Complete! You can run 'xcoding' anytime." -ForegroundColor Green
    Write-Host "=========================================================" -ForegroundColor Green
    Write-Host ""
}
