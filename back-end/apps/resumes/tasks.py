from celery import shared_task
from .models import Resume
from .utils import extract_text_from_pdf, generate_embedding, generate_ai_summary


@shared_task
def process_resume(resume_id):
    """
    Background task to analyze uploaded resume.
    """
    try:
        resume = Resume.objects.get(id=resume_id)
        path = resume.file.path

        text = extract_text_from_pdf(path)
        resume.text_content = text

        resume.embedding = generate_embedding(text)
        resume.ai_summary = generate_ai_summary(text)

        resume.save()
        return f"✅ Resume {resume.id} processed successfully"
    except Exception as e:
        return f"❌ Failed to process resume {resume_id}: {e}"
