import os
import requests

FIGMA_API_BASE = "https://api.figma.com/v1"

def get_figma_file(file_key: str) -> dict:
    token = os.getenv("FIGMA_TOKEN")
    if not token:
        return {}
    r = requests.get(
        f"{FIGMA_API_BASE}/files/{file_key}",
        headers={"X-Figma-Token": token},
        timeout=15,
    )
    if r.status_code == 200:
        return r.json()
    return {}

def get_figma_thumbnail_url(file_key: str) -> str:
    token = os.getenv("FIGMA_TOKEN")
    if not token:
        return ""
    r = requests.get(
        f"{FIGMA_API_BASE}/images/{file_key}",
        headers={"X-Figma-Token": token},
        timeout=15,
    )
    data = r.json() if r.ok else {}
    return (data.get("images") or {}).get(file_key, "")
