from celery import shared_task
import os, requests
from django.conf import settings
from .models import InvoiceTemplate

FIGMA_API = "https://api.figma.com/v1"

@shared_task
def refresh_figma_thumbnails():
    """Update thumbnails for all active Figma templates"""
    token = os.getenv("FIGMA_TOKEN") or getattr(settings, "FIGMA_TOKEN", None)
    if not token:
        return "FIGMA_TOKEN not found"
    headers = {"X-Figma-Token": token}

    for template in InvoiceTemplate.objects.exclude(figma_file_key__isnull=True):
        res = requests.get(f"{FIGMA_API}/files/{template.figma_file_key}", headers=headers)
        if res.status_code != 200:
            continue
        data = res.json()
        frames = data["document"]["children"][0]["children"]
        ids = ",".join(f["id"] for f in frames)
        img_res = requests.get(f"{FIGMA_API}/images/{template.figma_file_key}?ids={ids}&scale=2", headers=headers)
        images = img_res.json().get("images", {}) if img_res.ok else {}
        first_thumb = next(iter(images.values()), None)
        if first_thumb and first_thumb != template.thumbnail_url:
            template.thumbnail_url = first_thumb
            template.save(update_fields=["thumbnail_url"])
    return "Thumbnails refreshed successfully"
