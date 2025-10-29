import fitz

def extract_text_from_pdf(path: str) -> str:
    """Extracts raw text from a PDF resume."""
    text = ""
    try:
        with fitz.open(path) as doc:
            for page in doc:
                text += page.get_text()
    except Exception as e:
        text = f"Error extracting text: {e}"
    return text
