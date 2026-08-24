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

# Create installation directory
if (-not (Test-Path $installDir)) {
    New-Item -ItemType Directory -Path $installDir -Force | Out-Null
}

Write-Host "[1/4] Finding latest release..." -ForegroundColor Yellow
$downloadUrl = $null
try {
    [Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12
    $releases = Invoke-RestMethod -Uri "https://api.github.com/repos/GunwantBhambra/XCODING/releases" -Headers @{"User-Agent"="XCODING-Installer"}
    if ($releases.Count -gt 0) {
        $latest = $releases[0]
        foreach ($asset in $latest.assets) {
            if ($asset.name.EndsWith(".exe")) {
                $downloadUrl = $asset.browser_download_url
                break
            }
        }
    }
} catch {}

if (-not $downloadUrl) {
    $downloadUrl = "https://github.com/GunwantBhambra/XCODING/releases/download/v1.0.0/XCODING_1.0.1.exe"
}

Write-Host "[2/4] Downloading XCODING executable from GitHub..." -ForegroundColor Yellow
try {
    $webClient = New-Object System.Net.WebClient
    $webClient.Headers.Add("User-Agent", "Mozilla/5.0")
    $webClient.DownloadFile($downloadUrl, $exePath)

    $fileSize = (Get-Item $exePath).Length
    if ($fileSize -lt 100000) {
        Remove-Item $exePath -Force -ErrorAction SilentlyContinue
        Write-Host "[ERROR] Downloaded file is too small ($fileSize bytes)." -ForegroundColor Red
        return
    }

    Write-Host "[SUCCESS] Downloaded to $exePath ($( [math]::Round($fileSize/1MB, 2) ) MB)" -ForegroundColor Green
} catch {
    Write-Host "[ERROR] Download failed: $($_.Exception.Message)" -ForegroundColor Red
    return
}

# Add to User PATH
Write-Host "[3/4] Configuring environment PATH & Shortcuts..." -ForegroundColor Yellow
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
