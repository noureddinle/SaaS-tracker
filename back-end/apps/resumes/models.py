from django.db import models
from django.conf import settings
from pgvector.django import VectorField
from .utils import extract_text_from_pdf, generate_ai_summary, generate_embedding


class Resume(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    file = models.FileField(upload_to="resumes/")
    text_content = models.TextField(blank=True, null=True)
    ai_summary = models.JSONField(blank=True, null=True)
    embedding = VectorField(dimensions=384, null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def save(self, *args, **kwargs):
        """
        Automatically extract text, generate AI summary and embedding
        when a new resume is uploaded.
        """
        if self.file and not self.text_content:
            self.text_content = extract_text_from_pdf(self.file.path)

        if self.text_content:
            summary = generate_ai_summary(self.text_content)
            self.ai_summary = {"summary": summary} if isinstance(summary, str) else summary
            self.embedding = generate_embedding(self.text_content)

        super().save(*args, **kwargs)

    def __str__(self):
        return f"Resume of {self.user.get_full_name() or self.user.email}"
