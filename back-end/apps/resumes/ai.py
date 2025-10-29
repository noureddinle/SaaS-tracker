import requests
import json
import os

LLM_API_URL = os.getenv("LLM_API_URL", "http://localhost:1234/v1")
LLM_MODEL = os.getenv("LLM_MODEL", "mistral-7b-instruct")

def analyze_resume_with_mistral(text: str):
    prompt = f"""
    You are an AI resume analyzer.
    Parse this resume and extract structured information in JSON with:
    full_name, headline, years_experience, skills (list),
    education (list of strings), work_experience (list of objects with company, role, duration, description),
    and summary (a short paragraph about the profile).

    Resume text:
    {text[:8000]}
    """

    try:
        resp = requests.post(
            f"{LLM_API_URL}/chat/completions",
            json={
                "model": LLM_MODEL,
                "messages": [{"role": "user", "content": prompt}],
                "temperature": 0.3,
                "max_tokens": 1024,
            },
        )
        content = resp.json()["choices"][0]["message"]["content"]
        try:
            data = json.loads(content)
        except json.JSONDecodeError:
            data = {"raw_output": content}
        return data
    except Exception as e:
        return {"error": str(e)}
