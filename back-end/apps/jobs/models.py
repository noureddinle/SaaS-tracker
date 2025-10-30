from django.conf import settings
from django.db import models
from pgvector.django import VectorField

class JobPosting(models.Model):
    title = models.CharField(max_length=255)
    company = models.CharField(max_length=255, blank=True, default="")
    description = models.TextField()
    requirements = models.TextField(blank=True, default="")
    budget = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)
    budget_type = models.CharField(
        max_length=20,
        choices=[("HOURLY", "Hourly"), ("FIXED", "Fixed")],
        blank=True,
        default=""
    )
    posted_date = models.DateTimeField(null=True, blank=True)
    source = models.CharField(max_length=50)  # upwork, linkedin, remoteok, etc.
    source_url = models.URLField(max_length=1000, unique=True)
    location = models.CharField(max_length=255, blank=True, default="")
    remote = models.BooleanField(default=False)

    # Matching fields
    skills_required = models.JSONField(default=list, blank=True)
    embedding = VectorField(dimensions=768, null=True, blank=True)

    scraped_at = models.DateTimeField(auto_now_add=True)
    is_active = models.BooleanField(default=True)

    def __str__(self):
        return f"{self.title} @ {self.company or 'Unknown'}"


class JobMatch(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    job = models.ForeignKey(JobPosting, on_delete=models.CASCADE, related_name="matches")
    match_score = models.FloatField(default=0.0)   # 0..100

    # Explainability
    matching_skills = models.JSONField(default=list, blank=True)
    experience_match = models.FloatField(default=0.0)  # 0..1

    # Pipeline
    status = models.CharField(
        max_length=20,
        choices=[
            ("NEW", "New"),
            ("VIEWED", "Viewed"),
            ("SAVED", "Saved"),
            ("APPLIED", "Applied"),
            ("REJECTED", "Rejected"),
            ("INTERVIEWING", "Interviewing"),
            ("WON", "Won"),
            ("LOST", "Lost"),
        ],
        default="NEW",
    )
    applied_at = models.DateTimeField(null=True, blank=True)
    notes = models.TextField(blank=True, default="")

    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ("user", "job")


class ProposalTemplate(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    job_match = models.ForeignKey(JobMatch, on_delete=models.CASCADE, related_name="proposals_templates")

    ai_proposal = models.TextField(blank=True, default="")
    final_proposal = models.TextField(blank=True, default="")

    generated_at = models.DateTimeField(auto_now_add=True)
    sent_at = models.DateTimeField(null=True, blank=True)
    response_received = models.BooleanField(default=False)

    def __str__(self):
        return f"Proposal for {self.job_match.job.title} by {self.user.email}"
