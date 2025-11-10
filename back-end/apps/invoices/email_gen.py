import os
import requests
from datetime import datetime
from django.utils.html import format_html

AI_API = os.getenv("AI_API", "http://localhost:1234/v1/completions")


def generate_invoice_email(invoice, user, tone="professional", language="en"):
    """
    Uses an AI model (local or OpenAI-style API) to generate a personalized email body for invoice sending.
    """
    prompt = f"""
    You are an assistant generating email messages for a freelance platform.
    Generate a short, polite, and clear email in {language} with a {tone} tone.

    Include:
    - The user's name: {user.get_full_name() or user.email}
    - The client name: {invoice.client_name}
    - The invoice amount: {invoice.amount} {invoice.currency}
    - The invoice date: {invoice.created_at.strftime("%Y-%m-%d")}
    - The due date: {invoice.due_date.strftime("%Y-%m-%d") if invoice.due_date else "N/A"}
    - The invoice status: {invoice.status}

    If the invoice is overdue, politely remind the client to process the payment soon.
    If it’s newly created, thank them for their business and provide payment details.
    """

    response = requests.post(
        AI_API,
        json={
            "model": "gpt-4" if "openai" in AI_API else "lmstudio",
            "prompt": prompt,
            "max_tokens": 300,
            "temperature": 0.7,
        },
        timeout=30,
    )

    if response.status_code != 200:
        return f"Dear {invoice.client_name},\n\nPlease find attached your invoice #{invoice.id}.\nThank you!"

    content = response.json()
    text = (
        content.get("choices", [{}])[0].get("text", "")
        or content.get("output", "")
        or content.get("content", "")
    ).strip()

    return format_html("<p>{}</p>", text.replace("\n", "<br>"))
