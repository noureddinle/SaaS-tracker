from rest_framework import serializers
from .models import invoice

class InvoiceSerializer(serializers.ModelSerializer):
    """Serializer for creating and viewing invoices."""

    user_email = serializers.EmailField(source="user.email", read_only=True)

    class Meta:
        model = invoice
        fields = [
            "id",
            "user_email",
            "title",
            "amount",
            "due_date",
            "status",
            "created_at",
        ]
        read_only_fields = ["id", "user_email", "created_at"]
