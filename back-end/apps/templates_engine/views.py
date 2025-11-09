import os
import requests
from rest_framework import generics, permissions
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from django.conf import settings

from .models import InvoiceTemplate, UserInvoiceTheme
from .serializers import InvoiceTemplateSerializer, UserInvoiceThemeSerializer

FIGMA_API = "https://api.figma.com/v1"


@api_view(["POST"])
@permission_classes([IsAuthenticated])
def import_figma_templates(request):
    file_key = request.query_params.get("file_key")
    if not file_key:
        return Response({"error": "file_key required"}, status=400)

    token = os.getenv("FIGMA_TOKEN") or getattr(settings, "FIGMA_TOKEN", None)
    if not token:
        return Response({"error": "FIGMA_TOKEN missing"}, status=500)

    headers = {"X-Figma-Token": token}

    res = requests.get(f"{FIGMA_API}/files/{file_key}", headers=headers)
    if res.status_code != 200:
        return Response({"error": "Failed to fetch Figma file"}, status=res.status_code)

    data = res.json()
    frames = [
        f for f in data["document"]["children"][0]["children"]
        if f["type"] in ["FRAME", "COMPONENT", "INSTANCE"]
    ]
    if not frames:
        return Response({"message": "No frames found"}, status=200)

    ids = ",".join(f["id"] for f in frames)
    img_res = requests.get(f"{FIGMA_API}/images/{file_key}?ids={ids}&scale=2", headers=headers)
    image_data = img_res.json().get("images", {}) if img_res.ok else {}

    imported = []
    for f in frames:
        name = f["name"]
        thumb = image_data.get(f["id"])
        template, created = InvoiceTemplate.objects.get_or_create(
            figma_file_key=file_key, name=name,
            defaults={"thumbnail_url": thumb, "created_by": request.user}
        )
        if not created and thumb and template.thumbnail_url != thumb:
            template.thumbnail_url = thumb
            template.save(update_fields=["thumbnail_url"])
        imported.append({
            "id": template.id,
            "name": template.name,
            "thumbnail_url": template.thumbnail_url,
            "created": created,
        })

    return Response({"imported_count": len(imported), "templates": imported})


class UserInvoiceThemeView(generics.RetrieveUpdateAPIView):
    serializer_class = UserInvoiceThemeSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_object(self):
        theme, _ = UserInvoiceTheme.objects.get_or_create(user=self.request.user)
        return theme


# 🔍 List available templates
class InvoiceTemplateListView(generics.ListAPIView):
    serializer_class = InvoiceTemplateSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return InvoiceTemplate.objects.filter(is_active=True).order_by("-created_at")
