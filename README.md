# CodeFork - Lightweight C++ Student IDE

> A fast, native Windows C++ IDE built with Visual Studio, powered by the VS Code Monaco Editor engine, featuring an integrated interactive console for `cin`/`cout` and beginner-friendly compiler diagnostics.

---

## Key Highlights

- **Ultra Lightweight Native Executable (`.exe`)**: Starts up in milliseconds and consumes minimal RAM (unlike full Electron-based VS Code).
- **VS Code Look & Feel**: Microsoft Monaco editor engine with official **VS Code Dark+ theme**, full syntax highlighting, bracket pair colorization, minimap, and code folding.
- **Built-in Student C++ Snippets & Defaults**:
  - `main` + `Tab` -> Standard boilerplate with `#include <iostream>`
  - `cout` + `Tab` -> `std::cout << ... << std::endl;`
  - `cin` + `Tab` -> `std::cin >> var;`
  - `for` + `Tab` -> Indexed `for` loop
  - `forr` + `Tab` -> Range-based `for` loop
  - `vector` + `Tab` -> `std::vector<int>`
  - `class` + `Tab` -> Full OOP class structure with constructor
- **One-Click / F5 Build & Run**: Automatically detects **Visual Studio MSVC (`cl.exe`)**, **MinGW GCC (`g++`)**, or **Clang++**.
- **Interactive Student Console**:
  - Live two-way streaming of `std::cout` output and `std::cin` user input right inside the IDE panel.
  - Option to spawn into an external Windows Terminal / Command Prompt.
- **Clickable Compiler Diagnostics & Student Hints**:
  - Clicking on compiler errors (e.g. `main.cpp: Line 15, Col 8`) immediately jumps the editor cursor to that line.
  - Provides beginner-friendly hints for common mistakes (missing semicolons `;`, undeclared variables, missing `#include <iostream>`, namespace issues).
- **Starter Templates**: 1-click loading of common student assignments (Hello World, Interactive Calculator, Dynamic Vectors, Loops & Arrays, Functions & References, Classes & OOP).

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

## Project Structure

```
CodeForkIntractive/
├── bin/
│   ├── CodeFork.exe             <-- Compiled Native Windows Desktop IDE
│   ├── WebView2Loader.dll
│   └── assets/                  <-- Bundled Monaco editor & template assets
├── src/
│   ├── main.cpp                 <-- Win32 window entry point, dark mode titlebar
│   ├── ide_host.hpp / .cpp      <-- Native C++ bridge connecting Win32 & Monaco
│   └── compiler_runner.hpp / .cpp <-- Compiler detection, process executor, stdin/stdout pipes
├── assets/
│   ├── editor/
│   │   ├── index.html           <-- IDE HTML shell
│   │   ├── style.css            <-- VS Code Dark+ styling & layout
│   │   ├── app.js               <-- Monaco configuration, snippets, diagnostics
│   │   └── vs/                  <-- Offline Monaco Editor bundle
│   └── templates/               <-- Student C++ starter programs
├── third_party/
│   └── webview2/                <-- Microsoft WebView2 C++ SDK (headers & libs)
├── build.bat                    <-- One-click Visual Studio MSVC build script
├── CMakeLists.txt               <-- Standard CMake configuration
└── README.md
```

---

## How to Build

### Using `build.bat` (Recommended)
1. Ensure Visual Studio 2022 or 2026 (Community, Professional, or Enterprise) with C++ Desktop Development is installed.
2. Run:
   ```cmd
   build.bat
   ```
3. The executable will be produced in:
   ```
   bin\CodeFork.exe
   ```

### Using CMake
```cmd
mkdir build
cd build
cmake .. -G "Visual Studio 17 2022" -A x64
cmake --build . --config Release
```

---

## Running CodeFork

Simply run:
```cmd
bin\CodeFork.exe
```
Or double-click `CodeFork.exe` in Windows File Explorer!
