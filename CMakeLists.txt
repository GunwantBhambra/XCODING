cmake_minimum_required(VERSION 3.20)
project(CodeFork LANGUAGES CXX)

set(CMAKE_CXX_STANDARD 17)
set(CMAKE_CXX_STANDARD_REQUIRED ON)

add_executable(CodeFork WIN32
    src/main.cpp
    src/ide_host.cpp
    src/ide_host.hpp
    src/compiler_runner.cpp
    src/compiler_runner.hpp
)

target_include_directories(CodeFork PRIVATE
    ${CMAKE_CURRENT_SOURCE_DIR}/src
    ${CMAKE_CURRENT_SOURCE_DIR}/third_party/webview2/include
)

target_link_directories(CodeFork PRIVATE
    ${CMAKE_CURRENT_SOURCE_DIR}/third_party/webview2/lib/x64
)

target_link_libraries(CodeFork PRIVATE
    WebView2LoaderStatic
    User32
    Gdi32
    Shell32
    Ole32
    OleAut32
    Comdlg32
    Shlwapi
    Advapi32
    Dwmapi
)

add_custom_command(TARGET CodeFork POST_BUILD
    COMMAND ${CMAKE_COMMAND} -E copy_directory
        ${CMAKE_CURRENT_SOURCE_DIR}/assets
        $<TARGET_FILE_DIR:CodeFork>/assets
    COMMAND ${CMAKE_COMMAND} -E copy_if_different
        ${CMAKE_CURRENT_SOURCE_DIR}/third_party/webview2/lib/x64/WebView2Loader.dll
        $<TARGET_FILE_DIR:CodeFork>/WebView2Loader.dll
)
