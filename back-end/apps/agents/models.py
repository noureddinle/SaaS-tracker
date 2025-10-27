from django.db import models
from django.conf import settings

class Agent(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="agents")
    name = models.CharField(max_length=100)
    email = models.EmailField()
    type = models.CharField(max_length=50, choices=[
        ("EMAIL", "Email Automation"),
        ("SCRAPER", "Job Scraper"),
        ("NOTIFIER", "Notification Bot"),
    ])
    active = models.BooleanField(default=True)
    n8n_webhook = models.URLField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.name} ({self.type})"


class AgentActionLog(models.Model):
    agent = models.ForeignKey(Agent, on_delete=models.CASCADE, related_name="logs")
    action = models.CharField(max_length=200)
    status = models.CharField(max_length=20, choices=[
        ("PENDING", "Pending"),
        ("SUCCESS", "Success"),
        ("FAILED", "Failed"),
    ], default="PENDING")
    result = models.JSONField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
