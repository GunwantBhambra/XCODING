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
    $exePath = "$installDir\XCODING.exe"

    if (-not (Test-Path $installDir)) {
        New-Item -ItemType Directory -Path $installDir -Force | Out-Null
    }

    Write-Host "[1/4] Finding latest release..." -ForegroundColor Yellow
    $downloadUrl = "https://github.com/GunwantBhambra/XCODING/releases/download/v1.0.0/XCODING_1.0.1.exe"
    try {
        [Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12
        $releases = Invoke-RestMethod -Uri "https://api.github.com/repos/GunwantBhambra/XCODING/releases" -Headers @{"User-Agent"="Mozilla/5.0"}
        if ($releases.Count -gt 0) {
            foreach ($asset in $releases[0].assets) {
                if ($asset.name -like "*.exe") {
                    $downloadUrl = $asset.browser_download_url
                    break
                }
            }
        }
    } catch {}

    Write-Host "[2/4] Downloading XCODING executable from GitHub..." -ForegroundColor Yellow
    try {
        $webClient = New-Object System.Net.WebClient
        $webClient.Headers.Add("User-Agent", "Mozilla/5.0")
        $webClient.DownloadFile($downloadUrl, $exePath)

        # Unblock file from Windows Mark-of-the-Web (Zone.Identifier)
        Unblock-File -Path $exePath -ErrorAction SilentlyContinue

        $fileSize = (Get-Item $exePath).Length
        Write-Host "[SUCCESS] Downloaded to $exePath ($( [math]::Round($fileSize/1MB, 2) ) MB)" -ForegroundColor Green
    } catch {
        Write-Host "[ERROR] Download failed: $_" -ForegroundColor Red
        return
    }

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
        $shortcut.Save()
        Write-Host "[SUCCESS] Desktop shortcut created!" -ForegroundColor Green
    } catch {}

    Write-Host "[4/4] Launching XCODING..." -ForegroundColor Cyan
    try {
        Start-Process $exePath
    } catch {
        Write-Host ""
        Write-Host "[NOTE] Windows Defender is blocking the newly downloaded file." -ForegroundColor Yellow
        Write-Host "       To run it: Double-click the 'XCODING' icon on your Desktop" -ForegroundColor Cyan
        Write-Host "       and click 'More info' -> 'Run anyway' once." -ForegroundColor Cyan
        Write-Host ""
    }

    Write-Host ""
    Write-Host "=========================================================" -ForegroundColor Green
    Write-Host " Installation Complete! You can run 'xcoding' anytime." -ForegroundColor Green
    Write-Host "=========================================================" -ForegroundColor Green
    Write-Host ""
}
