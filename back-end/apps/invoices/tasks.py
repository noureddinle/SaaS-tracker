from celery import shared_task
from templates_engine.pdf_renderer import render_invoice_to_pdf
from django.core.files.storage import default_storage
from django.core.mail import EmailMessage
from invoices.models import invoice
from email_gen import generate_invoice_email

@shared_task
def async_generate_invoice_pdf(user_id, invoice_id):
    from django.contrib.auth import get_user_model
    User = get_user_model()
    user = User.objects.get(pk=user_id)
    pdf_file = render_invoice_to_pdf(user, invoice_id)
    path = default_storage.save(f"invoices/{pdf_file.name}", pdf_file)
    inv = invoice.objects.get(pk=invoice_id)
    inv.pdf_url = default_storage.url(path)
    inv.save(update_fields=["pdf_url"])
    return inv.pdf_url

@shared_task
def send_invoice_email(user_id, invoice_id, recipient_email, tone="professional", language="en"):
    """
    Generate PDF + AI email body and send to client.
    """
    from django.contrib.auth import get_user_model
    User = get_user_model()

    user = User.objects.get(pk=user_id)
    inv = invoice.objects.get(pk=invoice_id, user=user)

    # 1️⃣ Generate PDF
    pdf_file = render_invoice_to_pdf(user, invoice_id)
    path = default_storage.save(f"invoices/{pdf_file.name}", pdf_file)
    pdf_url = default_storage.url(path)
    inv.pdf_url = pdf_url
    inv.save(update_fields=["pdf_url"])

    # 2️⃣ Generate AI email content
    email_body = generate_invoice_email(inv, user, tone=tone, language=language)

    # 3️⃣ Compose and send email
    subject = f"Invoice #{inv.id} from {user.get_full_name() or 'Your Account'}"
    email = EmailMessage(
        subject=subject,
        body=email_body,
        to=[recipient_email],
    )
    email.content_subtype = "html"
    email.attach(pdf_file.name, pdf_file.read(), "application/pdf")
    email.send()

    return f"Invoice #{invoice_id} sent to {recipient_email}"
