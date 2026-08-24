# ==============================================================================
#  XCODING 1-Click Interactive CLI Installer for Windows
#  Usage: irm https://raw.githubusercontent.com/GunwantBhambra/XCODING/main/install.ps1 | iex
# ==============================================================================

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
$downloadUrl = "https://github.com/GunwantBhambra/XCODING/releases/download/v1.0.0/XCODING.exe"

# Create installation directory
if (-not (Test-Path $installDir)) {
    New-Item -ItemType Directory -Path $installDir -Force | Out-Null
}

Write-Host "[1/4] Downloading latest XCODING binary..." -ForegroundColor Yellow
try {
    [Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12
    $webClient = New-Object System.Net.WebClient
    $webClient.Headers.Add("User-Agent", "XCODING-Installer/1.0")
    $webClient.DownloadFile($downloadUrl, $exePath)

    # Validate file is a real binary and not a 404 HTML page
    $fileSize = (Get-Item $exePath).Length
    if ($fileSize -lt 100000) {
        Remove-Item $exePath -Force -ErrorAction SilentlyContinue
        Write-Host ""
        Write-Host "[!] Download received invalid package ($fileSize bytes)." -ForegroundColor Red
        Write-Host "    Reason: The GitHub repository 'GunwantBhambra/XCODING' is currently set to PRIVATE." -ForegroundColor Yellow
        Write-Host "    Solution: Go to https://github.com/GunwantBhambra/XCODING/settings and set visibility to PUBLIC." -ForegroundColor Cyan
        Write-Host ""
        Read-Host "Press Enter to exit..."
        return
    }

    Write-Host "[SUCCESS] Downloaded to $exePath ($( [math]::Round($fileSize/1MB, 2) ) MB)" -ForegroundColor Green
} catch {
    Write-Host ""
    Write-Host "[ERROR] Download failed: $($_.Exception.Message)" -ForegroundColor Red
    Write-Host "Note: If your repository is Private, set it to Public on GitHub to allow 1-click CLI installs." -ForegroundColor Yellow
    Write-Host ""
    Read-Host "Press Enter to exit..."
    return
}

# Add to User PATH
Write-Host "[2/4] Configuring environment PATH..." -ForegroundColor Yellow
try {
    $userPath = [Environment]::GetEnvironmentVariable("Path", "User")
    if ($userPath -notlike "*$installDir*") {
        [Environment]::SetEnvironmentVariable("Path", "$userPath;$installDir", "User")
        $env:Path += ";$installDir"
        Write-Host "[SUCCESS] Added 'xcoding' command to PATH" -ForegroundColor Green
    } else {
        Write-Host "[INFO] PATH already configured" -ForegroundColor DarkGray
    }
} catch {
    Write-Host "[WARNING] Could not update PATH: $_" -ForegroundColor DarkGray
}

# Create Desktop Shortcut
Write-Host "[3/4] Creating Desktop shortcut..." -ForegroundColor Yellow
try {
    $wshShell = New-Object -ComObject WScript.Shell
    $desktopPath = [Environment]::GetFolderPath("Desktop")
    $shortcut = $wshShell.CreateShortcut("$desktopPath\XCODING.lnk")
    $shortcut.TargetPath = $exePath
    $shortcut.WorkingDirectory = $installDir
    $shortcut.Description = "XCODING C++ Student Interactive IDE"
    $shortcut.Save()
    Write-Host "[SUCCESS] Desktop shortcut created!" -ForegroundColor Green
} catch {
    Write-Host "[WARNING] Could not create shortcut: $_" -ForegroundColor DarkGray
}

# Launch Application
Write-Host "[4/4] Launching XCODING..." -ForegroundColor Cyan
Start-Process $exePath

Write-Host ""
Write-Host "=========================================================" -ForegroundColor Green
Write-Host " Installation Complete! You can run 'xcoding' anytime." -ForegroundColor Green
Write-Host "=========================================================" -ForegroundColor Green
Write-Host ""
