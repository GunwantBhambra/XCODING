# XCODING - Standalone C++ Student Interactive Studio

> A ultra-fast, native Windows C++ IDE built with Visual Studio, powered by the VS Code Monaco Editor engine, featuring an integrated interactive console for `cin`/`cout`, Level Train gamified challenge navigation, and zero-dependency standalone portable architecture.

---

## ⚡ 1-Line Quick Install (PowerShell)

Open PowerShell and paste this command to automatically install XCODING, add it to your `PATH`, and create a desktop shortcut:

```powershell
irm https://raw.githubusercontent.com/GunwantBhambra/XCODING/main/install.ps1 | iex
```

Once installed, you can launch XCODING from anywhere simply by running:
```powershell
xcoding
```

---

## Key Highlights

- **100% Standalone Single-File Binary (`XCODING.exe`)**: Zero external DLL dependencies, starts up in milliseconds, and extracts its Monaco Web assets into `%LOCALAPPDATA%\XCODING` automatically.
- **Level Train Stepper Navigation**: Infinite interactive node carousel (Levels 0–100+) with smooth animated jumping, status tracking, and auto-centering.
- **VS Code Monaco Editor Engine**: Official **VS Code Dark+ theme**, full syntax highlighting, bracket pair colorization, minimap, and code folding.
- **Interactive Student Console**: Live two-way streaming of `std::cout` output and `std::cin` user input right inside the IDE panel with sub-millisecond latency.
- **In-App Auto-Updater**: Realtime update detection hooked to Firebase Realtime Database with 1-click self-updating execution.
- **Cyberpunk Glassmorphism Profile Dropdown**: Live cloud synchronization status, cumulative telemetry metrics (Compiles, Runs, Levels Cleared), and instant update check.
- **Starter Templates & Clickable Diagnostics**: Jump straight to error lines with beginner-friendly hints for missing semicolons, undeclared variables, or STL header issues.

---

## Default Keyboard Shortcuts

| Shortcut | Action |
| :--- | :--- |
| **`F5`** or **`Ctrl+F5`** | **Compile & Run** current C++ file |
| **`F7`** | **Compile Only** (Check for syntax/build errors) |
| **`Shift + F5`** | **Stop** running program |
| **`Ctrl + S`** | **Save** file |
| **`Ctrl + O`** | **Open** file |
| **`Ctrl + N`** | **New** file |
| **`Ctrl + /`** | **Toggle Line Comment** (`//`) |
| **`Shift + Alt + A`** | **Toggle Block Comment** (`/* ... */`) |
| **`Shift + Alt + F`** | **Format C++ Code** |
| **`Alt + ↑` / `Alt + ↓`** | **Move Line Up / Down** |
| **`Ctrl + D`** | **Select Next Occurrence** |
| **`Ctrl + Space`** | **Trigger IntelliSense / Autocomplete** |
| **`Ctrl + \``** | **Toggle Integrated Console** |
| **`Ctrl + K`** | **Clear Console Output** |

---

## Building from Source

To compile the standalone portable binary yourself:
```cmd
build.bat
```
Output executable will be located at `bin\XCODING.exe`.
