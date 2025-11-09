from django.db import models
from django.conf import settings

class InvoiceTemplate(models.Model):
    name = models.CharField(max_length=100)
    figma_file_key = models.CharField(max_length=100)
    thumbnail_url = models.URLField()
    preview_url = models.URLField(blank=True)
    is_active = models.BooleanField(default=True)

    def __str__(self):
        return self.name

class UserInvoiceTheme(models.Model):
    user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    template = models.ForeignKey(InvoiceTemplate, on_delete=models.SET_NULL, null=True)
    logo = models.ImageField(upload_to="logos/", null=True, blank=True)
    primary_color = models.CharField(max_length=7, default="#4F46E5")  # indigo-600
