from rest_framework import serializers
from .models import Proposal, JobMatch
from jobs.models import Job
from resumes.models import Resume


class JobSerializer(serializers.ModelSerializer):
    class Meta:
        model = Job
        fields = ["id", "title", "company", "description", "requirements", "location"]


class ResumeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Resume
        fields = ["id", "file", "text_content", "ai_summary", "created_at"]


class JobMatchSerializer(serializers.ModelSerializer):
    job = JobSerializer(read_only=True)
    resume = ResumeSerializer(read_only=True)

    class Meta:
        model = JobMatch
        fields = ["id", "user", "job", "resume", "match_score", "is_recommended", "created_at"]


class ProposalSerializer(serializers.ModelSerializer):
    job_match = JobMatchSerializer(read_only=True)

    class Meta:
        model = Proposal
        fields = ["id", "user", "job_match", "ai_proposal", "ai_employer_msg", "is_sent", "created_at"]
