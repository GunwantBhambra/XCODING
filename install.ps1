& {
    $ErrorActionPreference = "Stop"

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
    $tempZip = "$env:TEMP\XCODING_windows_x64.zip"
    $exePath = "$installDir\XCODING.exe"

    if (-not (Test-Path $installDir)) {
        New-Item -ItemType Directory -Path $installDir -Force | Out-Null
    }

    Write-Host "[1/4] Finding release package from GitHub..." -ForegroundColor Yellow
    $zipUrl = "https://github.com/GunwantBhambra/XCODING/releases/download/v1.0.0/XCODING_windows_x64.zip"
    $exeFallbackUrl = "https://github.com/GunwantBhambra/XCODING/releases/download/v1.0.0/XCODING.exe"

    try {
        [Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12
        $releases = Invoke-RestMethod -Uri "https://api.github.com/repos/GunwantBhambra/XCODING/releases" -Headers @{"User-Agent"="Mozilla/5.0"}
        if ($releases.Count -gt 0) {
            foreach ($asset in $releases[0].assets) {
                if ($asset.name -like "*.zip") {
                    $zipUrl = $asset.browser_download_url
                    break
                }
            }
        }
    } catch {}

    Write-Host "[2/4] Downloading XCODING release package..." -ForegroundColor Yellow
    $downloadSuccess = $false
    try {
        $webClient = New-Object System.Net.WebClient
        $webClient.Headers.Add("User-Agent", "Mozilla/5.0")
        $webClient.DownloadFile($zipUrl, $tempZip)
        Expand-Archive -Path $tempZip -DestinationPath $installDir -Force
        Remove-Item $tempZip -Force -ErrorAction SilentlyContinue
        $downloadSuccess = $true
        Write-Host "[SUCCESS] Extracted release package to $installDir" -ForegroundColor Green
    } catch {
        # Fallback to direct EXE download
        try {
            $webClient = New-Object System.Net.WebClient
            $webClient.Headers.Add("User-Agent", "Mozilla/5.0")
            $webClient.DownloadFile($exeFallbackUrl, $exePath)
            $downloadSuccess = $true
            Write-Host "[SUCCESS] Downloaded binary to $exePath" -ForegroundColor Green
        } catch {
            Write-Host "[ERROR] Download failed: $_" -ForegroundColor Red
            return
        }
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
