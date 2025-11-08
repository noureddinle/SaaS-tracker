from .models import TaxYear, Expense, TaxPayment
from apps.invoices.models import invoice

from django.db.models import Sum


class MoroccoTaxCalculator:
    def __init__(self, user):
        self.user = user
        self.profile = user.tax_profile


    def calculate_annual_tax(self, year):
        tax_year, _ = TaxYear.objects.get_or_create(user=self.user, year=year)


        invoices = invoice.objects.filter(user=self.user, due_date__year=year) 
        total_revenue = invoices.aggregate(Sum('amount'))['amount__sum'] or 0
        if total_revenue == 0:
            return tax_year

        expenses = Expense.objects.filter(user=self.user, date__year=year, is_deductible=True)
        total_expenses = expenses.aggregate(Sum('amount'))['amount__sum'] or 0
        if total_expenses == 0:
            return tax_year

        if self.profile.tax_regime == 'AUTO_ENTREPRENEUR':
            tax_owed = total_revenue * 0.01
            taxable_income = total_revenue
        else:
            taxable_income = total_revenue - total_expenses
            tax_owed = self._calculate_progressive_tax(taxable_income)


            payments = TaxPayment.objects.filter(user=self.user, tax_year=tax_year)
            tax_paid = sum(p.amount for p in payments)


            tax_year.total_revenue = total_revenue
            tax_year.total_expenses = total_expenses
            tax_year.taxable_income = taxable_income
            tax_year.estimated_tax = tax_owed
            tax_year.tax_paid = tax_paid
            tax_year.tax_owed = max(0, tax_owed - tax_paid)
            tax_year.save()
            return tax_year


    def _calculate_progressive_tax(self, taxable_income):
        brackets = [
        (0, 30000, 0.00),
        (30001, 50000, 0.10),
        (50001, 60000, 0.20),
        (60001, 80000, 0.30),
        (80001, 180000, 0.34),
        (180001, float('inf'), 0.38)
        ]
        tax = 0
        remaining = taxable_income
        for lower, upper, rate in brackets:
            if remaining <= 0:
             break
            taxable_in_bracket = min(remaining, upper - lower)
            tax += taxable_in_bracket * rate
            remaining -= taxable_in_bracket
        return tax


    def calculate_quarterly_payment(self, year, quarter):
        quarterly_revenue = invoice.objects.filter(user=self.user, due_date__year=year, due_date__quarter=quarter).aggregate(Sum('amount'))['amount__sum'] or 0
        if self.profile.tax_regime == 'AUTO_ENTREPRENEUR':
            quarterly_tax = quarterly_revenue * 0.01
        else:
            annual_estimate = quarterly_revenue * 4
            projected_taxable = annual_estimate
            annual_tax = self._calculate_progressive_tax(projected_taxable)
            quarterly_tax = annual_tax / 4


        return {
        'quarter': quarter,
        'revenue': quarterly_revenue,
        'estimated_tax': quarterly_tax,
        'due_date': self._get_quarter_due_date(year, quarter)
        }


    def _get_quarter_due_date(self, year, quarter):
        deadlines = {
        1: f'{year}-04-30',
        2: f'{year}-07-31',
        3: f'{year}-10-31',
        4: f'{year + 1}-01-31'
        }
        return deadlines[quarter]


    def get_tax_summary(self, year):
        tax_year = self.calculate_annual_tax(year)
        return {
        'year': year,
        'regime': self.profile.get_tax_regime_display(),
        'total_revenue': float(tax_year.total_revenue),
        'total_expenses': float(tax_year.total_expenses),
        'taxable_income': float(tax_year.taxable_income),
        'estimated_tax': float(tax_year.estimated_tax),
        'tax_paid': float(tax_year.tax_paid),
        'tax_owed': float(tax_year.tax_owed),
        'effective_rate': (float(tax_year.estimated_tax) / float(tax_year.total_revenue) * 100) if tax_year.total_revenue > 0 else 0,
        'next_deadline': self.profile.next_filing_deadline
        }