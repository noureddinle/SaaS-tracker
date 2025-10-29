from sentence_transformers import SentenceTransformer
import numpy as np

# 768-d model to match Resume.embedding
_MODEL = SentenceTransformer("sentence-transformers/all-mpnet-base-v2")

def embed_text(text: str):
    if not text:
        return None
    vec = _MODEL.encode(text, normalize_embeddings=True)  # cosine-ready
    return vec.tolist()  # JSON serializable
