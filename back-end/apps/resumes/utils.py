import os
import PyPDF2
import numpy as np
import requests
from sentence_transformers import SentenceTransformer

# ✅ Local embedding model (fast, lightweight)
_model = SentenceTransformer("all-MiniLM-L6-v2")

# ✅ LM Studio configuration (use host.docker.internal for Docker)
BASE_URL = os.getenv("LMSTUDIO_URL", "http://host.docker.internal:1234/v1")
MODEL_NAME = os.getenv("LMSTUDIO_MODEL", "mistralai/Mistral-7B-Instruct-v0.3")


def extract_text_from_pdf(file_path: str) -> str:
    """Extract all text from a PDF file safely."""
    try:
        with open(file_path, "rb") as f:
            reader = PyPDF2.PdfReader(f)
            text = "\n".join([page.extract_text() or "" for page in reader.pages])
        return text.strip()
    except Exception as e:
        print(f"[PDF Extraction Error] {e}")
        return ""


def generate_embedding(text: str):
    """Generate a normalized 384-dim embedding (for pgvector)."""
    try:
        if not text:
            return []
        emb = _model.encode(text, normalize_embeddings=True)
        return emb.tolist()
    except Exception as e:
        print(f"[Embedding Error] {e}")
        return []


def generate_ai_summary(text: str):
    """
    Generate an AI summary using LM Studio (OpenAI-style endpoint).
    """
    try:
        url = f"{BASE_URL}/chat/completions"
        payload = {
            "model": MODEL_NAME,
            "messages": [
                {"role": "system", "content": "You are an AI assistant that summarizes resumes for recruiters."},
                {"role": "user", "content": f"Summarize this resume in 5 concise bullet points:\n\n{text[:4000]}"},
            ],
            "max_tokens": 200,
            "temperature": 0.5,
        }

        resp = requests.post(url, json=payload, timeout=20)
        resp.raise_for_status()
        data = resp.json()

        # Extract message cleanly
        summary = data.get("choices", [{}])[0].get("message", {}).get("content", "")
        return summary.strip() if summary else "[No summary returned]"

    except requests.exceptions.ConnectionError:
        print("[LM Studio Error] Could not connect to LM Studio server.")
        return "[Error] LM Studio (localhost:1234) not reachable."
    except Exception as e:
        print(f"[AI Summary Error] {e}")
        return f"[Error] {str(e)}"
