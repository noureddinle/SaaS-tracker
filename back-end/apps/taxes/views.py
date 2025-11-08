from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from datetime import date
from .models import TaxPayment, TaxYear, Expense
from .serializers import TaxPaymentSerializer, ExpenseSerializer
from .calculators import MoroccoTaxCalculator




@api_view(['GET'])
@permission_classes([IsAuthenticated])
def tax_dashboard(request):
    calculator = MoroccoTaxCalculator(request.user)
    current_year = date.today().year
    summary = calculator.get_tax_summary(current_year)
    quarters = [calculator.calculate_quarterly_payment(current_year, q) for q in range(1, 5)]

    return Response({ 'summary': summary, 'quarters': quarters })



@api_view(['POST'])
@permission_classes([IsAuthenticated])
def record_tax_payment(request):
    amount = request.data.get('amount')
    payment_date = request.data.get('payment_date', date.today())
    quarter = request.data.get('quarter')
    receipt_number = request.data.get('receipt_number', '')


    tax_year, _ = TaxYear.objects.get_or_create(user=request.user, year=payment_date.year)


    payment = TaxPayment.objects.create(
    user=request.user,
    tax_year=tax_year,
    amount=amount,
    payment_date=payment_date,
    payment_type='QUARTERLY',
    quarter=quarter,
    receipt_number=receipt_number
    )

    calculator = MoroccoTaxCalculator(request.user)
    calculator.calculate_annual_tax(payment_date.year)

    return Response({ 'success': True, 'message': 'Tax payment recorded', 'payment_id': payment.id })


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def add_expense(request):
    serializer = ExpenseSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save(user=request.user)
        return Response({ 'success': True, 'data': serializer.data })
    return Response(serializer.errors, status=400)