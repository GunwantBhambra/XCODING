import os
import zipfile
import hashlib

def pack_assets():
    assets_dir = "assets"
    output_zip = "assets.zip"

    if not os.path.exists(assets_dir):
        print(f"[ERROR] {assets_dir} does not exist.")
        return

    # Create zip file with highest deflation
    with zipfile.ZipFile(output_zip, 'w', zipfile.ZIP_DEFLATED, compresslevel=9) as zipf:
        for root, dirs, files in os.walk(assets_dir):
            for file in files:
                file_path = os.path.join(root, file)
                rel_path = os.path.relpath(file_path, os.path.dirname(assets_dir))
                zipf.write(file_path, rel_path)

    zip_size = os.path.getsize(output_zip)
    
    # Calculate hash of zip
    with open(output_zip, "rb") as f:
        zip_hash = hashlib.sha256(f.read()).hexdigest()[:16]

    # Write version/hash file
    with open("src/assets_version.h", "w") as f:
        f.write(f'// Auto-generated assets metadata\n')
        f.write(f'#pragma once\n')
        f.write(f'#define ASSETS_BUILD_HASH "{zip_hash}"\n')
        f.write(f'#define ASSETS_ZIP_SIZE {zip_size}\n')

    print(f"[SUCCESS] Packed {assets_dir}/ -> {output_zip} ({zip_size / (1024*1024):.2f} MB, Hash: {zip_hash})")

if __name__ == "__main__":
    pack_assets()
