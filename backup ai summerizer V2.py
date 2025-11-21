import os
import shutil
import time
from datetime import datetime
from pathlib import Path

# === CONFIGURA ===
PROGETTO = Path(r"C:\Users\Iltuo\Documents\Lavori\AI-Summarizer-v2")

WATCH_DIRS = ["backend", "frontend"]          # radici da sorvegliare
EST = {".js", ".ts", ".tsx", ".json", ".css", ".env"}
EXCLUDE = {".git", "node_modules", ".next", ".vercel", "temp"}

BACKUP = PROGETTO / "backup_sicuro"
BACKUP.mkdir(exist_ok=True)
# ==================

mtime_cache = {}

print("🟢 Backup attivo (Ctrl-C per uscire)…\n")

try:
    while True:
        for root_name in WATCH_DIRS:
            root_dir = PROGETTO / root_name
            if not root_dir.exists():
                continue
                
            for path in root_dir.rglob("*"):
                if path.is_dir():
                    if path.name in EXCLUDE or BACKUP in path.parents:
                        continue
                    continue

                if path.suffix not in EST:
                    continue
                if any(part in EXCLUDE for part in path.parts):
                    continue

                mtime = path.stat().st_mtime
                if mtime_cache.get(path) == mtime:
                    continue

                mtime_cache[path] = mtime

                rel_path = path.relative_to(PROGETTO)
                dest_dir = BACKUP / rel_path.parent
                dest_dir.mkdir(parents=True, exist_ok=True)

                ts = datetime.now().strftime("%Y%m%d_%H%M%S")
                new_name = f"{path.stem}_{ts}{path.suffix}"
                shutil.copy2(path, dest_dir / new_name)

                print(f"📁 {rel_path} → {new_name}")

        time.sleep(3)

except KeyboardInterrupt:
    print("\n⛔ Backup interrotto.")

input("\n✅ Monitoraggio concluso. Premi INVIO per uscire.")