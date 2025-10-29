import os
from django.db import connection
from rest_framework.decorators import api_view, parser_classes, permission_classes
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status

from .models import Resume
from .tasks import process_resume
from .utils import extract_text_from_pdf, generate_embedding
from .ai import analyze_resume_with_mistral


@api_view(["POST"])
@parser_classes([MultiPartParser, FormParser])
@permission_classes([IsAuthenticated])
def upload_resume(request):
    """
    Upload a resume file, extract text, analyze with local AI, generate embedding,
    and save results to the database.
    """
    file = request.FILES.get("file")
    if not file:
        return Response({"error": "No file uploaded"}, status=status.HTTP_400_BAD_REQUEST)

    resume = Resume.objects.create(user=request.user, file=file)
    process_resume.delay(resume.id)
    path = resume.file.path

    text = extract_text_from_pdf(path)
    resume.text_content = text

    try:
        embedding = generate_embedding(text)
        resume.embedding = embedding
    except Exception as e:
        resume.embedding = None
        print(f"[WARN] Embedding generation failed: {e}")

    try:
        ai_data = analyze_resume_with_mistral(text)
        resume.ai_summary = ai_data
    except Exception as e:
        ai_data = {"error": str(e)}
        resume.ai_summary = ai_data
        print(f"[WARN] AI analysis failed: {e}")

    resume.save(update_fields=["text_content", "embedding", "ai_summary"])

    return Response({
        "message": "✅ Resume uploaded and analyzed successfully.",
        "resume_id": resume.id,
        "file_url": resume.file.url if hasattr(resume.file, 'url') else None,
        "ai_summary": ai_data,
        "text_excerpt": text[:300] + "..." if text else None,
    }, status=status.HTTP_201_CREATED)

@api_view(["POST"])
@permission_classes([IsAuthenticated])
def match_jobs(request):
    """
    Given a job description, generate its embedding and
    find top N matching resumes using pgvector cosine similarity.
    Used by automation agents and dashboards.
    """
    description = request.data.get("description")
    top_n = int(request.data.get("limit", 5))

    if not description:
        return Response({"error": "Missing 'description' field"}, status=status.HTTP_400_BAD_REQUEST)

    try:
        job_embedding = generate_embedding(description)
    except Exception as e:
        return Response({"error": f"Embedding generation failed: {e}"}, status=500)

    query = """
    SELECT id, user_id, full_name, email, file, text_content,
           1 - (embedding <=> %s::vector) AS similarity
    FROM resumes_resume
    WHERE embedding IS NOT NULL
    ORDER BY embedding <=> %s::vector
    LIMIT %s;
    """

    with connection.cursor() as cursor:
        cursor.execute(query, [job_embedding, job_embedding, top_n])
        columns = [col[0] for col in cursor.description]
        results = [dict(zip(columns, row)) for row in cursor.fetchall()]

    return Response({
        "matches": results,
        "count": len(results),
        "description_excerpt": description[:200] + "..."
    })
