import os
from rest_framework.decorators import api_view, parser_classes, permission_classes
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from .models import Resume
from .utils import extract_text_from_pdf
from .ai import analyze_resume_with_mistral


@api_view(["POST"])
@parser_classes([MultiPartParser, FormParser])
@permission_classes([IsAuthenticated])
def upload_resume(request):
    """
    Upload a resume file, extract text, analyze with local AI, and save results.
    """
    file = request.FILES.get("file")
    if not file:
        return Response({"error": "No file uploaded"}, status=400)

    resume = Resume.objects.create(user=request.user, file=file)
    path = resume.file.path

    text = extract_text_from_pdf(path)
    resume.text_content = text

    ai_data = analyze_resume_with_mistral(text)
    resume.ai_summary = ai_data
    resume.save()

    return Response({
        "message": "Resume uploaded and analyzed successfully",
        "resume_id": resume.id,
        "ai_summary": ai_data
    })
