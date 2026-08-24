import os
import zipfile
import shutil

ROOT_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))
BIN_DIR = os.path.join(ROOT_DIR, "bin")
OUT_ZIP_BIN = os.path.join(BIN_DIR, "XCODING_windows_x64.zip")
OUT_ZIP_ROOT = os.path.join(ROOT_DIR, "XCODING_windows_x64.zip")

def build_release_zip():
    print(f"[*] Building release zip bundle: XCODING_windows_x64.zip")
    
    # Remove existing zip if present
    if os.path.exists(OUT_ZIP_BIN):
        try:
            os.remove(OUT_ZIP_BIN)
        except Exception:
            pass

    # Files to include in the release zip
    files_to_include = [
        ("XCODING.exe", os.path.join(BIN_DIR, "XCODING.exe")),
        ("XCODING_TEACHER.exe", os.path.join(BIN_DIR, "XCODING_TEACHER.exe")),
        ("CodeFork.exe", os.path.join(BIN_DIR, "CodeFork.exe")),
        ("WebView2Loader.dll", os.path.join(BIN_DIR, "WebView2Loader.dll")),
        ("README.md", os.path.join(ROOT_DIR, "README.md")),
        ("install.ps1", os.path.join(ROOT_DIR, "install.ps1")),
    ]

    assets_dir = os.path.join(BIN_DIR, "assets")

    with zipfile.ZipFile(OUT_ZIP_BIN, "w", zipfile.ZIP_DEFLATED) as zf:
        # Add root binaries and files
        for arcname, filepath in files_to_include:
            if os.path.exists(filepath):
                zf.write(filepath, arcname)
                print(f"  + Added: {arcname}")
            else:
                print(f"  - Warning: file not found: {filepath}")

        # Add assets folder
        if os.path.exists(assets_dir):
            for root, dirs, files in os.walk(assets_dir):
                for file in files:
                    filepath = os.path.join(root, file)
                    relpath = os.path.relpath(filepath, BIN_DIR)
                    zf.write(filepath, relpath)
            print(f"  + Added assets/ tree")

    # Copy to root as well for convenience
    shutil.copy2(OUT_ZIP_BIN, OUT_ZIP_ROOT)

    size_mb = os.path.getsize(OUT_ZIP_BIN) / (1024 * 1024)
    print(f"\n[SUCCESS] Created release bundle:")
    print(f"  -> {OUT_ZIP_BIN} ({size_mb:.2f} MB)")
    print(f"  -> {OUT_ZIP_ROOT} ({size_mb:.2f} MB)")

if __name__ == "__main__":
    build_release_zip()
