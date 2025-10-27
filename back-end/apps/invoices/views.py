from rest_framework import generics, permissions, viewsets
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from django.db.models import Sum, Count
from .models import invoice
from .serializers import InvoiceSerializer

class InvoiceListCreateView(generics.ListCreateAPIView):
    """List all invoices for the logged-in user or create a new one."""
    serializer_class = InvoiceSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        # Only return invoices that belong to the logged-in user
        return invoice.objects.filter(user=self.request.user).order_by("-created_at")

    def perform_create(self, serializer):
        # Automatically link the invoice to the current user
        serializer.save(user=self.request.user)


class InvoiceDetailView(generics.RetrieveUpdateDestroyAPIView):
    """Retrieve, update, or delete a single invoice."""
    serializer_class = InvoiceSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        # Restrict actions to invoices belonging to the current user
        return invoice.objects.filter(user=self.request.user)

class InvoiceViewSet(viewsets.ModelViewSet):
    """CRUD for invoices"""
    serializer_class = InvoiceSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return invoice.objects.filter(owner=self.request.user).order_by("-created_at")

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)

@api_view(["GET"])
@permission_classes([permissions.IsAuthenticated])
def dashboard_summary(request):
    """Aggregate data for dashboard cards"""
    user_invoices = invoice.objects.filter(owner=request.user)
    total_invoices = user_invoices.count()
    total_revenue = user_invoices.filter(status="paid").aggregate(Sum("amount"))["amount__sum"] or 0
    pending_count = user_invoices.filter(status="pending").count()
    paid_count = user_invoices.filter(status="paid").count()

    return Response({
        "total_invoices": total_invoices,
        "total_revenue": total_revenue,
        "pending_invoices": pending_count,
        "paid_invoices": paid_count,
    })