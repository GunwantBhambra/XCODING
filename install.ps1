# ==============================================================================
#  XCODING 1-Click Interactive CLI Installer for Windows
#  Usage: irm https://raw.githubusercontent.com/GunwantBhambra/XCODING/main/install.ps1 | iex
# ==============================================================================

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
$exePath = "$installDir\XCODING.exe"
$downloadUrl = "https://github.com/GunwantBhambra/XCODING/releases/download/v1.0.0/XCODING.exe"

# Create installation directory
if (-not (Test-Path $installDir)) {
    New-Item -ItemType Directory -Path $installDir -Force | Out-Null
}

Write-Host "[1/4] Downloading latest XCODING binary..." -ForegroundColor Yellow
try {
    [Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12
    Invoke-WebRequest -Uri $downloadUrl -OutFile $exePath -UseBasicParsing
    Write-Host "[SUCCESS] Downloaded to $exePath" -ForegroundColor Green
} catch {
    Write-Host "[ERROR] Download failed: $_" -ForegroundColor Red
    exit 1
}

# Add to User PATH
Write-Host "[2/4] Configuring environment PATH..." -ForegroundColor Yellow
$userPath = [Environment]::GetEnvironmentVariable("Path", "User")
if ($userPath -notlike "*$installDir*") {
    [Environment]::SetEnvironmentVariable("Path", "$userPath;$installDir", "User")
    $env:Path += ";$installDir"
    Write-Host "[SUCCESS] Added 'xcoding' command to PATH" -ForegroundColor Green
} else {
    Write-Host "[INFO] PATH already configured" -ForegroundColor DarkGray
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
