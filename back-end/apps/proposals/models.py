from django.db import models
from django.conf import settings
from apps.jobs.models import JobMatch

class Proposal(models.Model):
    """
    Stores AI-generated proposals and employer messages for matched jobs.
    """
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="proposals")
    job_match = models.ForeignKey(JobMatch, on_delete=models.CASCADE, related_name="proposals")

    ai_proposal = models.TextField(blank=True, null=True, help_text="AI-generated proposal text for freelancer")
    ai_employer_msg = models.TextField(blank=True, null=True, help_text="AI-generated message for employer")
    is_sent = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Proposal for {self.user.email} → {self.job_match.job.title}"
