from rest_framework import serializers
from .models import invoice

class InvoiceSerializer(serializers.ModelSerializer):
    class Meta:
        model = invoice
        fields = '__all__'