"""
XCODING One-Click Update Publisher Tool
Use this script to push a new version update to all XCODING users via Firebase Realtime Database.
"""

import sys
import json
import urllib.request

FIREBASE_DB_URL = "https://xcoding-29d3a-default-rtdb.europe-west1.firebasedatabase.app/version.json"

def push_update(version, download_url, changelog):
    payload = {
        "version": version,
        "downloadUrl": download_url,
        "changelog": changelog
    }
    
    data_bytes = json.dumps(payload).encode('utf-8')
    req = urllib.request.Request(
        FIREBASE_DB_URL,
        data=data_bytes,
        headers={'Content-Type': 'application/json'},
        method='PUT'
    )
    
    try:
        with urllib.request.urlopen(req) as resp:
            if resp.status in (200, 204):
                print(f"\n[SUCCESS] Update pushed successfully to Firebase!")
                print(f" - Target Version : v{version}")
                print(f" - Download URL   : {download_url}")
                print(f" - Changelog      : {changelog}\n")
                print("All running XCODING instances will now detect this update!")
            else:
                print(f"[ERROR] HTTP response: {resp.status}")
    except Exception as e:
        print(f"[ERROR] Failed to push update: {e}")

if __name__ == "__main__":
    if len(sys.argv) < 3:
        print("Usage: python tools/push_update.py <version> <downloadUrl> [changelog]")
        print("Example:")
        print('  python tools/push_update.py 1.1.0 "https://github.com/user/repo/releases/download/v1.1.0/XCODING.exe" "New challenges added"')
        sys.exit(1)
        
    ver = sys.argv[1].lstrip('v')
    url = sys.argv[2]
    log = sys.argv[3] if len(sys.argv) > 3 else "New performance updates and bug fixes."
    push_update(ver, url, log)
