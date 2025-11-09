from rest_framework import serializers
from .models import InvoiceTemplate, UserInvoiceTheme


class InvoiceTemplateSerializer(serializers.ModelSerializer):
    class Meta:
        model = InvoiceTemplate
        fields = [
            "id", "name", "figma_file_key", "html_content",
            "thumbnail_url", "preview_url", "is_active", "created_at"
        ]


class UserInvoiceThemeSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserInvoiceTheme
        fields = ["template", "logo", "primary_color", "font_family"]
