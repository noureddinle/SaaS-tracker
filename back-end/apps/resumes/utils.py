import os
import PyPDF2
import numpy as np
import requests
from sentence_transformers import SentenceTransformer

_model = SentenceTransformer("all-MiniLM-L6-v2")

def extract_text_from_pdf(file_path: str) -> str:
    """Extract all text from a PDF file safely."""
    try:
        with open(file_path, "rb") as f:
            reader = PyPDF2.PdfReader(f)
            text = "\n".join([page.extract_text() or "" for page in reader.pages])
        return text.strip()
    except Exception as e:
        return f"Error extracting text: {e}"


def generate_embedding(text: str):
    """Generate a normalized 384-dim embedding for pgvector."""
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
    Calls a local LM Studio-compatible endpoint (like Mistral 7B)
    and returns a clean summary string.
    """
    try:
        resp = requests.post(
            "http://localhost:1234/v1/chat/completions",
            json={
                "model": "mistral-7b",
                "messages": [
                    {"role": "system", "content": "You are an AI assistant that summarizes resumes for recruiters."},
                    {"role": "user", "content": f"Summarize this resume in 5 concise bullet points:\n\n{text[:4000]}"},
                ],
                "max_tokens": 200,
                "temperature": 0.5
            },
            timeout=15
        )
        data = resp.json()
        summary = data.get("choices", [{}])[0].get("message", {}).get("content", "")
        return summary.strip() if summary else data
    except requests.exceptions.ConnectionError:
        return {"error": "LM Studio (localhost:1234) is not running"}
    except Exception as e:
        return {"error": str(e)}
