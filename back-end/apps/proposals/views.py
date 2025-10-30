# proposals/views.py
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Proposal, JobMatch
from apps.resumes.models import Resume
from core.ai import generate_ai_summary
import requests
import os

class GenerateProposalView(APIView):
    def post(self, request):
        resume_id = request.data.get("resume_id")
        job_id = request.data.get("job_id")

        if not resume_id or not job_id:
            return Response({"error": "resume_id and job_id are required"}, status=400)

        try:
            resume = Resume.objects.get(id=resume_id)
            job_match = JobMatch.objects.select_related("job", "user").get(job_id=job_id, user=resume.user)
        except Exception as e:
            return Response({"error": str(e)}, status=404)

        # Prepare prompt for LM Studio (Mistral)
        user_text = resume.text_content or ""
        job_text = f"{job_match.job.title}\n{job_match.job.description}\nRequirements: {job_match.job.requirements or ''}"

        # Prompt for the user (proposal generation)
        user_prompt = f"""
        You are an AI assistant that writes professional proposals for freelancers.
        Based on the following resume and job description, write a short, clear, persuasive proposal
        that can be sent to the employer.

        Resume:
        {user_text[:4000]}

        Job:
        {job_text[:4000]}

        Format:
        - Professional greeting
        - 2 concise paragraphs explaining fit and experience
        - Optional short closing line
        """

        # Prompt for the employer message template
        employer_prompt = f"""
        You are generating an employer notification message.
        Based on this freelancer's resume and the job description, summarize why this freelancer would be a good fit.
        Return a short email (3-5 lines) written to the employer, introducing the freelancer and attaching their proposal.

        Resume:
        {user_text[:2000]}

        Job:
        {job_text[:2000]}
        """

        LM_URL = os.getenv("LMSTUDIO_URL", "http://localhost:1234/v1")

        try:
            response_user = requests.post(
                f"{LM_URL}/chat/completions",
                json={
                    "model": "mistral-7b",
                    "messages": [
                        {"role": "system", "content": "You are an expert proposal writer for freelancers."},
                        {"role": "user", "content": user_prompt},
                    ],
                    "max_tokens": 400,
                    "temperature": 0.7
                },
                timeout=25
            )

            response_employer = requests.post(
                f"{LM_URL}/chat/completions",
                json={
                    "model": "mistral-7b",
                    "messages": [
                        {"role": "system", "content": "You are an AI recruiter communication assistant."},
                        {"role": "user", "content": employer_prompt},
                    ],
                    "max_tokens": 200,
                    "temperature": 0.6
                },
                timeout=25
            )

            ai_proposal = response_user.json().get("choices", [{}])[0].get("message", {}).get("content", "").strip()
            ai_employer_msg = response_employer.json().get("choices", [{}])[0].get("message", {}).get("content", "").strip()

            # Store proposal
            proposal = Proposal.objects.create(
                user=resume.user,
                job_match=job_match,
                ai_proposal=ai_proposal,
                ai_employer_msg=ai_employer_msg
            )

            return Response({
                "success": True,
                "proposal_id": proposal.id,
                "user_proposal": ai_proposal,
                "employer_message": ai_employer_msg
            }, status=status.HTTP_201_CREATED)

        except requests.exceptions.ConnectionError:
            return Response({"error": "LM Studio is not running"}, status=500)
        except Exception as e:
            return Response({"error": str(e)}, status=500)
