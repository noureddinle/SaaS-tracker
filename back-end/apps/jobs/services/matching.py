from typing import List, Tuple
from django.db.models import F
from pgvector.django import CosineDistance
from apps.jobs.models import JobPosting, JobMatch
from apps.resumes.models import Resume

def skills_overlap(user_skills: List[str], required: List[str]) -> float:
    if not required:
        return 0.0
    a = set(map(str.lower, user_skills or []))
    b = set(map(str.lower, required or []))
    return len(a & b) / max(1, len(b))

def rate_alignment(user_rate: float | None, job_budget: float | None) -> float:
    if user_rate is None or job_budget is None:
        return 0.0
    # crude heuristic: if budget >= 0.8 * rate → good
    ratio = float(job_budget) / max(1e-6, float(user_rate))
    if ratio >= 1.0: return 1.0
    if ratio >= 0.8: return 0.7
    if ratio >= 0.6: return 0.4
    return 0.1

def compute_match_score(
    vector_sim: float, skills_sim: float, exp_match: float, rate_match: float
) -> float:
    # weights: 40% vec, 30% skills, 20% exp, 10% rate
    score = (0.4 * vector_sim) + (0.3 * skills_sim) + (0.2 * exp_match) + (0.1 * rate_match)
    return round(max(0.0, min(1.0, score)) * 100, 1)

def refresh_matches_for_user(user) -> int:
    """
    Build/refresh JobMatch rows for a single user using their latest Resume.
    Returns number of matches updated/created.
    """
    resume: Resume | None = Resume.objects.filter(user=user).order_by("-created_at").first()
    if not resume or not resume.embedding:
        return 0

    # 1) Pull nearest jobs by vector distance
    jobs_qs = (
        JobPosting.objects
        .filter(is_active=True, embedding__isnull=False)
        .annotate(distance=CosineDistance("embedding", resume.embedding))
        .order_by("distance")[:200]  # cap
    )

    updated = 0
    user_skills = (resume.ai_summary or {}).get("skills", [])
    years = (resume.ai_summary or {}).get("years_of_experience", 0) or 0
    user_rate = (resume.ai_summary or {}).get("hourly_rate")

    for job in jobs_qs:
        vector_sim = 1.0 - float(job.distance) if job.distance is not None else 0.0
        skills_sim = skills_overlap(user_skills, job.skills_required)
        exp_match = min(1.0, float(years) / 5.0)  # simple heuristic
        rate_match = rate_alignment(user_rate, job.budget)

        score = compute_match_score(vector_sim, skills_sim, exp_match, rate_match)

        jm, _ = JobMatch.objects.update_or_create(
            user=user,
            job=job,
            defaults={
                "match_score": score,
                "matching_skills": list(set(map(str.lower, user_skills)) & set(map(str.lower, job.skills_required or []))),
                "experience_match": exp_match,
            },
        )
        updated += 1
    return updated

def refresh_all_users():
    from django.contrib.auth import get_user_model
    User = get_user_model()
    total = 0
    for u in User.objects.all():
        total += refresh_matches_for_user(u)
    return total
