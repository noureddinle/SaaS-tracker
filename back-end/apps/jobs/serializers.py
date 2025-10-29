from rest_framework import serializers
from .models import JobPosting, JobMatch, ProposalTemplate

class JobPostingSerializer(serializers.ModelSerializer):
    class Meta:
        model = JobPosting
        fields = "__all__"
        read_only_fields = ("scraped_at",)

class JobImportSerializer(serializers.ModelSerializer):
    """For n8n → API webhook. Safe minimal fields."""
    class Meta:
        model = JobPosting
        fields = (
            "title", "company", "description", "requirements",
            "budget", "budget_type", "posted_date", "source",
            "source_url", "location", "remote", "skills_required",
        )

class JobMatchSerializer(serializers.ModelSerializer):
    job = JobPostingSerializer()
    class Meta:
        model = JobMatch
        fields = "__all__"

class ProposalTemplateSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProposalTemplate
        fields = "__all__"
