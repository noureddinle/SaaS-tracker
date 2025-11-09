# apps/templates_engine/views.py
import requests, os
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

FIGMA_API = "https://api.figma.com/v1"

@api_view(["GET"])
@permission_classes([IsAuthenticated])
def fetch_figma_layout(request):
    file_key = request.query_params.get("file_key")
    if not file_key:
        return Response({"error": "file_key required"}, status=400)

    token = os.getenv("FIGMA_TOKEN")
    headers = {"X-Figma-Token": token}

    files_res = requests.get(f"{FIGMA_API}/files/{file_key}", headers=headers)

    if files_res.status_code != 200:
        return Response({"error": "Failed to fetch file"}, status=files_res.status_code)

    data = files_res.json()
    frames = [
        f for f in data["document"]["children"][0]["children"]
        if f["type"] in ["FRAME", "COMPONENT", "INSTANCE"]
    ]
    ids = ",".join(f["id"] for f in frames)

    img_res = request.get(f"{FIGMA_API}/images/{file_key}?ids={ids}&scale=2", headers=headers)
    image_data = img_res.json().get("images", {})
    
    layout = [
        {
            "id": f["id"],
            "name": f["name"],
            "type": f["type"],
            "thumbnail": f["thumbnail"]
         }
        for f in frames
    ]
    return Response({"layout": layout})
