from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import InvoiceListCreateView, InvoiceDetailView, InvoiceViewSet, dashboard_summary
from views_export import export_invoice_pdf

router = DefaultRouter()
router.register(r"invoices",InvoiceViewSet, basename="invoices")

urlpatterns = [
    path("", include(router.urls)),
    path("dashboard/", dashboard_summary, name="dashboard-summary"),
    path("<int:pk>/", InvoiceDetailView.as_view(), name="invoice-detail"),
    path("<int:invoice_id>/export/pdf/", export_invoice_pdf, name="export-invoice-pdf"),
]
