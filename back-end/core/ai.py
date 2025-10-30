import os
import sys
import json
import requests
from functools import lru_cache

# =====================================================
# 🚀 LAZY MODEL LOADING (works in Docker / offline)
# =====================================================
@lru_cache(maxsize=1)
def get_embedding_model():
    """
    Load SentenceTransformer only when needed (not during migrations or tests).
    """
    if any(cmd in sys.argv for cmd in [
        "makemigrations", "migrate", "collectstatic", "test",
        "shell", "createsuperuser", "loaddata"
    ]):
        return None

    try:
        from sentence_transformers import SentenceTransformer
        print("🧠 Loading embedding model...")
        return SentenceTransformer("all-MiniLM-L6-v2")
    except Exception as e:
        print(f"[⚠️ Model Load Skipped] {e}")
        return None


# =====================================================
# 🧠 LM Studio (Mistral / Ollama / Local LLM)
# =====================================================
BASE_URL = os.getenv("LMSTUDIO_URL", "http://host.docker.internal:1234/v1")
MODEL_NAME = os.getenv("LMSTUDIO_MODEL", "mistralai/Mistral-7B-Instruct-v0.3")

LLM_API_URL = os.getenv("LLM_API_URL", "http://localhost:1234/v1")
LLM_MODEL = os.getenv("LLM_MODEL", "mistral-7b-instruct")


# =====================================================
# 🔢 Generate Embedding Vector
# =====================================================
def generate_embedding(text: str):
    """
    Create a normalized embedding vector (for pgvector).
    Safe for empty text or offline mode.
    """
    if not text:
        return []

    model = get_embedding_model()
    if not model:
        print("[⚠️ Embedding Model Missing — returning empty vector]")
        return []

    try:
        emb = model.encode(text, normalize_embeddings=True)
        return emb.tolist()
    except Exception as e:
        print(f"[Embedding Error] {e}")
        return []


# =====================================================
# ✍️ Generate AI Summary (LM Studio)
# =====================================================
def generate_ai_summary(text: str, role="recruiter"):
    """
    Generate a text summary using LM Studio (OpenAI-compatible endpoint).
    """
    if not text.strip():
        return "[Empty text]"

    try:
        payload = {
            "model": MODEL_NAME,
            "messages": [
                {"role": "system", "content": f"You are an AI assistant that summarizes text for {role}s."},
                {"role": "user", "content": f"Summarize the following in 5 concise bullet points:\n\n{text[:4000]}"},
            ],
            "max_tokens": 200,
            "temperature": 0.5,
        }

        resp = requests.post(f"{BASE_URL}/chat/completions", json=payload, timeout=25)
        resp.raise_for_status()
        data = resp.json()
        return data.get("choices", [{}])[0].get("message", {}).get("content", "").strip()

    except requests.exceptions.ConnectionError:
        return "[Error] LM Studio not reachable."
    except Exception as e:
        return f"[Error] {str(e)}"
    
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
