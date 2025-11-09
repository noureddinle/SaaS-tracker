from rest_framework import serializers
from .models import InvoiceTemplate

class InvoiceTemplateSerializer(serializers.ModelSerializer):
    class Meta:
        model = InvoiceTemplate
        fields = ("id", "name", "thumbnail_url", "preview_url", "figma_file_key")
