import PyPDF2

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
