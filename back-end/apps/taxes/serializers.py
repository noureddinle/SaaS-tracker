from rest_framework import serializers
from .models import TaxProfile, TaxYear, TaxPayment, Expense


class TaxProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = TaxProfile
        fields = '__all__'


class TaxYearSerializer(serializers.ModelSerializer):
    class Meta:
        model = TaxYear
        fields = '__all__'


class TaxPaymentSerializer(serializers.ModelSerializer):
    class Meta:
        model = TaxPayment
        fields = '__all__'


class ExpenseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Expense
        fields = '__all__'