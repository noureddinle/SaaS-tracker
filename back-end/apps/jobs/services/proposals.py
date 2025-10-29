import requests
from django.conf import settings

LM_URL = getattr(settings, "LMSTUDIO_URL", "http://host.docker.internal:1234/v1")
LM_MODEL = getattr(settings, "LMSTUDIO_MODEL", "mistralai/Mistral-7B-Instruct-v0.3")

def generate_proposal_text(resume_summary: dict, job: dict) -> str:
    """Call LM Studio (Mistral) to produce a tailored proposal."""
    profile = f"""Name: {resume_summary.get('name','')}
Experience: {resume_summary.get('years_of_experience','?')} years
Skills: {', '.join(resume_summary.get('skills', []))}
Recent Work:
"""
    for w in (resume_summary.get("work_experience") or [])[:3]:
        profile += f"- {w.get('role','')} at {w.get('company','')}: {w.get('description','')}\n"

    prompt = f"""
You are a professional freelance proposal writer. Write a concise, personalized proposal.

FREELANCER PROFILE
{profile}

JOB POSTING
Title: {job.get('title')}
Company: {job.get('company','')}
Budget: {job.get('budget')} ({job.get('budget_type','')})
Description: {job.get('description')[:1200]}
Requirements: {job.get('requirements')[:800]}

Guidelines:
- First-person
- Reference 2–3 exact requirements
- Show clear value and next steps
- Under 280 words
- No clichés
- Professional, friendly, confident
"""

    payload = {
        "model": LM_MODEL,
        "messages": [
            {"role": "system", "content": "You create high-converting freelance proposals."},
            {"role": "user", "content": prompt},
        ],
        "temperature": 0.7,
        "max_tokens": 500,
    }

    r = requests.post(f"{LM_URL}/chat/completions", json=payload, timeout=30)
    r.raise_for_status()
    data = r.json()
    return data.get("choices", [{}])[0].get("message", {}).get("content", "").strip()
