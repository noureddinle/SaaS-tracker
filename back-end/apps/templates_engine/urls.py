from django.urls import path
from .views import list_templates, generate_invoice_pdf, fetch_figma_layout

urlpatterns = [
    path("templates/", list_templates, name="invoice-templates"),
    path("generate-pdf/", generate_invoice_pdf, name="generate-invoice-pdf"),
    path("figma/fetch/", fetch_figma_layout, name="figma-layout"),
]
