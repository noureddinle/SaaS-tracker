from rest_framework import serializers
from .models import invoice


class InvoiceSerializer(serializers.ModelSerializer):
    """Serializer for creating and viewing invoices."""

    user_email = serializers.EmailField(source="user.email", read_only=True)
    due_date = serializers.DateField(
        source="invoice_due_date", allow_null=True, required=False
    )

    class Meta:
        model = invoice
        fields = [
            "id",
            "user_email",
            "client_name",
            "client_email",
            "invoice_number",
            "amount",
            "currency",
            "due_date",
            "status",
            "created_at",
        ]
        read_only_fields = ["id", "user_email", "created_at", "invoice_number"]
