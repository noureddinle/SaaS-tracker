from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import InvoiceListCreateView, InvoiceDetailView, InvoiceViewSet, dashboard_summary

router = DefaultRouter()
router.register(r"invoices",InvoiceViewSet, basename="invoices")

urlpatterns = [
    path("", include(router.urls)),
    path("dashboard/", dashboard_summary, name="dashboard-summary"),
    path("<int:pk>/", InvoiceDetailView.as_view(), name="invoice-detail"),
]
