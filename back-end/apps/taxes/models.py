from django.db import models
from django.conf import settings


class TaxProfile(models.Model):
    user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    country = models.CharField(max_length=2, default='MA')


    tax_regime = models.CharField(
    max_length=20,
    choices=[
    ('AUTO_ENTREPRENEUR', 'Auto-Entrepreneur'),
    ('REGULAR', 'Regular Regime'),
    ('COMPANY', 'Company (SARL/SA)')
    ],
    default='AUTO_ENTREPRENEUR'
    )


    ice_number = models.CharField(max_length=15, blank=True)
    if_number = models.CharField(max_length=8, blank=True)
    cnss_number = models.CharField(max_length=10, blank=True)


    tax_year_start = models.DateField()
    filing_frequency = models.CharField(
    max_length=20,
    choices=[('QUARTERLY', 'Quarterly'), ('MONTHLY', 'Monthly'), ('ANNUALLY', 'Annually')],
    default='QUARTERLY'
    )


    last_filing_date = models.DateField(null=True)
    next_filing_deadline = models.DateField(null=True)


    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)


    def __str__(self):
        return f"{self.user.email} - {self.country}"




class TaxYear(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    year = models.IntegerField()


    total_revenue = models.DecimalField(max_digits=12, decimal_places=2, default=0)
    taxable_income = models.DecimalField(max_digits=12, decimal_places=2, default=0)
    total_expenses = models.DecimalField(max_digits=12, decimal_places=2, default=0)
    deductible_expenses = models.DecimalField(max_digits=12, decimal_places=2, default=0)


    estimated_tax = models.DecimalField(max_digits=12, decimal_places=2, default=0)
    tax_paid = models.DecimalField(max_digits=12, decimal_places=2, default=0)
    tax_owed = models.DecimalField(max_digits=12, decimal_places=2, default=0)


class Meta:
    unique_together = ['user', 'year']

    def __str__(self):
        return f"{self.user.email} - {self.year}"




class TaxPayment(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    tax_year = models.ForeignKey(TaxYear, on_delete=models.CASCADE)
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    payment_date = models.DateField()
    payment_type = models.CharField(
    max_length=20,
    choices=[
    ('QUARTERLY', 'Quarterly Payment'),
    ('ANNUAL', 'Annual Payment'),
    ('ESTIMATED', 'Estimated Payment'),
    ('PENALTY', 'Penalty Payment')
    ]
    )
    quarter = models.IntegerField(null=True)
    receipt_number = models.CharField(max_length=50, blank=True)
    receipt_file = models.FileField(upload_to='tax_receipts/', null=True)
    notes = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)


    def __str__(self):
        return f"{self.user.email} - {self.amount} MAD - {self.payment_date}"


class Expense(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    date = models.DateField()
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    currency = models.CharField(max_length=3, default='MAD')
    category = models.CharField(
    max_length=50,
    choices=[
    ('OFFICE', 'Office & Equipment'),
    ('SOFTWARE', 'Software & Subscriptions'),
    ('INTERNET', 'Internet & Phone'),
    ('MARKETING', 'Marketing & Advertising'),
    ('EDUCATION', 'Education & Training'),
    ('TRAVEL', 'Travel'),
    ('MEALS', 'Business Meals'),
    ('PROFESSIONAL', 'Professional Services'),
    ('RENT', 'Office Rent'),
    ('OTHER', 'Other')
    ]
    )
    description = models.TextField()
    vendor = models.CharField(max_length=100, blank=True)
    is_deductible = models.BooleanField(default=True)
    deduction_percentage = models.IntegerField(default=100)
    receipt_file = models.FileField(upload_to='expense_receipts/', null=True)
    created_at = models.DateTimeField(auto_now_add=True)


    def __str__(self):
        return f"{self.user.email} - {self.category} - {self.amount} MAD"