from rest_framework import viewsets, mixins, status
from rest_framework.decorators import action, api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response
from django.utils.dateparse import parse_datetime

from .models import JobPosting, JobMatch, ProposalTemplate
from .serializers import (
    JobPostingSerializer, JobImportSerializer, JobMatchSerializer, ProposalTemplateSerializer
)
from .services.embeddings import embed_text
from .services.matching import refresh_matches_for_user
from .services.proposals import generate_proposal_text
from apps.resumes.models import Resume

class JobPostingViewSet(viewsets.ModelViewSet):
    queryset = JobPosting.objects.all().order_by("-scraped_at")
    serializer_class = JobPostingSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        qs = super().get_queryset().filter(is_active=True)
        skills = self.request.query_params.get("skills")
        remote = self.request.query_params.get("remote")
        min_budget = self.request.query_params.get("min_budget")
        source = self.request.query_params.get("source")
        if skills:
            # filter if any of required skills present
            wanted = set(s.strip().lower() for s in skills.split(","))
            qs = qs.filter(skills_required__overlap=list(wanted))
        if remote in ("true", "false"):
            qs = qs.filter(remote=(remote == "true"))
        if min_budget:
            try:
                qs = qs.filter(budget__gte=float(min_budget))
            except:
                pass
        if source:
            qs = qs.filter(source=source)
        return qs

    @action(detail=False, methods=["post"], permission_classes=[AllowAny])
    def import_from_n8n(self, request):
        """
        n8n webhook → create/update a job; auto-embed text.
        Expected payload (JobImportSerializer).
        """
        serializer = JobImportSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        data = serializer.validated_data

        job, created = JobPosting.objects.update_or_create(
            source_url=data["source_url"],
            defaults=data
        )
        # build text for embedding
        text = f"{job.title}\n{job.company}\n{job.description}\n{job.requirements}"
        job.embedding = embed_text(text)  # 768-d normalized
        job.save()

        return Response({"id": job.id, "created": created}, status=status.HTTP_201_CREATED)


class JobMatchViewSet(mixins.ListModelMixin, viewsets.GenericViewSet):
    serializer_class = JobMatchSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return JobMatch.objects.filter(user=self.request.user).select_related("job").order_by("-match_score")

    @action(detail=False, methods=["post"])
    def refresh(self, request):
        """Recompute matches for the requesting user."""
        n = refresh_matches_for_user(request.user)
        return Response({"updated": n})


class ProposalViewSet(viewsets.ModelViewSet):
    queryset = ProposalTemplate.objects.all()
    serializer_class = ProposalTemplateSerializer
    permission_classes = [IsAuthenticated]

    @action(detail=False, methods=["post"])
    def generate(self, request):
        """
        Body: { "resume_id": ..., "job_id": ... }
        """
        resume_id = request.data.get("resume_id")
        job_id = request.data.get("job_id")

        try:
            resume = Resume.objects.get(id=resume_id, user=request.user)
        except Resume.DoesNotExist:
            return Response({"error": "Resume not found"}, status=404)

        try:
            job = JobPosting.objects.get(id=job_id)
        except JobPosting.DoesNotExist:
            return Response({"error": "Job not found"}, status=404)

        summary = resume.ai_summary or {}
        job_data = JobPostingSerializer(job).data

        try:
            proposal_text = generate_proposal_text(summary, job_data)
        except Exception as e:
            return Response({"error": str(e)}, status=502)

        # Ensure a JobMatch exists
        match, _ = JobMatch.objects.get_or_create(user=request.user, job=job)
        tmpl = ProposalTemplate.objects.create(
            user=request.user,
            job_match=match,
            ai_proposal=proposal_text
        )
        return Response(ProposalTemplateSerializer(tmpl).data, status=201)
