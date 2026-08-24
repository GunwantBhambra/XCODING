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

    Write-Host "[1/4] Resolving release download source..." -ForegroundColor Yellow
    [Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12

    $urlsToTry = @(
        "https://github.com/GunwantBhambra/XCODING/releases/latest/download/XCODING_windows_x64.zip",
        "https://github.com/GunwantBhambra/XCODING/raw/main/XCODING_windows_x64.zip",
        "https://raw.githubusercontent.com/GunwantBhambra/XCODING/main/bin/XCODING_windows_x64.zip",
        "https://github.com/GunwantBhambra/XCODING/releases/download/v1.0.1/XCODING_windows_x64.zip"
    )

    try {
        $releases = Invoke-RestMethod -Uri "https://api.github.com/repos/GunwantBhambra/XCODING/releases" -Headers @{"User-Agent"="Mozilla/5.0"}
        if ($releases -and $releases.Count -gt 0) {
            foreach ($asset in $releases[0].assets) {
                if ($asset.name -like "*.zip") {
                    $urlsToTry = @($asset.browser_download_url) + $urlsToTry
                    break
                }
            }
        }
    } catch {}

    Write-Host "[2/4] Downloading and extracting XCODING package..." -ForegroundColor Yellow
    $downloadSuccess = $false

    foreach ($url in $urlsToTry) {
        try {
            Write-Host "  -> Fetching from: $url" -ForegroundColor DarkGray
            if (Test-Path $tempZip) { Remove-Item $tempZip -Force -ErrorAction SilentlyContinue }
            
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

            if ((Test-Path $tempZip) -and ((Get-Item $tempZip).Length -gt 1000000)) {
                Expand-Archive -Path $tempZip -DestinationPath $installDir -Force
                Remove-Item $tempZip -Force -ErrorAction SilentlyContinue
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
