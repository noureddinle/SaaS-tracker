from django.db import models
from django.conf import settings

class invoice(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    client_name = models.CharField(max_length=255)
    client_email = models.EmailField(max_length=255)
    client_address = models.TextField(blank=True, null=True)
    client_phone = models.CharField(max_length=20, blank=True, null=True)
    client_city = models.CharField(max_length=100, blank=True, null=True)
    client_country = models.CharField(max_length=100, blank=True, null=True)
    invoice_number = models.CharField(max_length=20, blank=True, unique=True)
    invoice_date = models.DateField(auto_now_add=True)
    invoice_due_date = models.DateField(null=True, blank=True)
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    currency = models.CharField(max_length=10, default='MAD')
    status = models.CharField(max_length=20, choices=[
        ('PAID', 'Paid'),
        ('PENDING', 'Pending'),
        ('OVERDUE', 'Overdue')
    ], default='Pending')
    created_at = models.DateTimeField(auto_now_add=True)
    due_date = models.DateField(null=True, blank=True) 

    class Meta:
        verbose_name = "Invoice"
        verbose_name_plural = "Invoices"
        ordering = ["-created_at"]

    def __str__(self):
        return f"Invoice {self.id} - {self.client_name}"
    
    def save(self, *args, **kwargs):
        if not self.invoice_number:
            year = self.invoice_date.year
            month = self.invoice_date.month
            day = self.invoice_date.day
            last_invoice = self.objects.filter(invoice_date__year=year, invoice_date__month=month, invoice_date__day=day).order_by('-id').first()
            if last_invoice:
                self.invoice_number = f"INV-{year}-{month}-{day}-{last_invoice.id + 1:06d}"
            else:
                self.invoice_number = f"INV-{year}-{month}-{day}-000001"
        super().save(*args, **kwargs)

    def mark_as_paid(self):
        self.status = 'PAID'
        self.invoice_status = 'PAID'
        self.save()

    def mark_as_pending(self):
        self.status = 'PENDING'
        self.invoice_status = 'PENDING'
        self.save()

    def mark_as_overdue(self):
        self.status = 'OVERDUE'
        self.invoice_status = 'OVERDUE'
        self.save()
    