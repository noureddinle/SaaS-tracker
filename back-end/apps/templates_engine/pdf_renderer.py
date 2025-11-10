import os
import io
import qrcode
from django.template import Template, Context
from django.core.files.base import ContentFile
from django.conf import settings
from weasyprint import HTML, CSS
from django.utils.html import escape
from invoices.models import invoice
from .models import InvoiceTemplate, UserInvoiceTheme


def render_invoice_to_pdf(user, invoice_id):
    """
    Generates a high-fidelity invoice PDF using WeasyPrint.
    Combines user theme, invoice data, and the chosen HTML template.
    """
    inv = invoice.objects.get(pk=invoice_id, user=user)
    theme = getattr(user, "userinvoicetheme", None)
    template = theme.template if theme and theme.template else InvoiceTemplate.objects.first()

    # Build invoice data context
    context = {
        "user_name": user.get_full_name() or user.email,
        "logo_url": theme.logo.url if theme and theme.logo else "",
        "primary_color": theme.primary_color if theme else "#4F46E5",
        "font_family": theme.font_family if theme else "Inter, sans-serif",
        "client_name": inv.client_name,
        "amount": inv.amount,
        "currency": inv.currency,
        "status": inv.status,
        "date": inv.created_at.strftime("%Y-%m-%d"),
        "due_date": inv.due_date.strftime("%Y-%m-%d") if inv.due_date else "",
        "invoice_id": inv.id,
    }

    # Optional QR code (e.g., payment link)
    qr_buffer = io.BytesIO()
    qr_data = f"Invoice #{inv.id} - {inv.client_name} - {inv.amount} {inv.currency}"
    qrcode.make(qr_data).save(qr_buffer, format="PNG")
    qr_data_url = "data:image/png;base64," + qr_buffer.getvalue().hex()

    context["qr_code"] = qr_data_url

    # Default fallback HTML (if no template)
    html_template = template.html_content or """
    <html>
    <head>
      <style>
        body {
          font-family: {{font_family}};
          color: {{primary_color}};
          padding: 2em;
        }
        h2 { color: {{primary_color}}; }
        .box {
          border: 1px solid #ddd;
          padding: 1em;
          border-radius: 6px;
          margin-top: 1em;
        }
      </style>
    </head>
    <body>
      <h2>Invoice #{{invoice_id}}</h2>
      {% if logo_url %}
        <img src="{{logo_url}}" alt="Logo" width="100"/>
      {% endif %}
      <div class="box">
        <p><strong>Client:</strong> {{client_name}}</p>
        <p><strong>Amount:</strong> {{amount}} {{currency}}</p>
        <p><strong>Status:</strong> {{status}}</p>
        <p><strong>Date:</strong> {{date}}</p>
        <p><strong>Due Date:</strong> {{due_date}}</p>
      </div>
      <img src="{{qr_code}}" width="80"/>
    </body>
    </html>
    """

    rendered_html = Template(html_template).render(Context(context))

    # Render HTML to PDF
    pdf_bytes = HTML(string=rendered_html, base_url=settings.MEDIA_ROOT).write_pdf(
        stylesheets=[CSS(string="body { font-size: 14px; }")]
    )

    filename = f"invoice_{inv.id}.pdf"
    return ContentFile(pdf_bytes, name=filename)
