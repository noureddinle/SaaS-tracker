from django.db import models
from django.conf import settings


class InvoiceTemplate(models.Model):
    """Templates imported from Figma or created via GrapesJS"""
    name = models.CharField(max_length=100)
    figma_file_key = models.CharField(max_length=100, blank=True, null=True)
    html_content = models.JSONField(blank=True, null=True)  # GrapesJS or Figma JSON
    thumbnail_url = models.URLField(blank=True)
    preview_url = models.URLField(blank=True)
    created_by = models.ForeignKey(
        settings.AUTH_USER_MODEL, on_delete=models.SET_NULL, null=True, blank=True
    )
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name


class UserInvoiceTheme(models.Model):
    """User personalization for invoices"""
    user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    template = models.ForeignKey(InvoiceTemplate, on_delete=models.SET_NULL, null=True)
    logo = models.ImageField(upload_to="logos/", null=True, blank=True)
    primary_color = models.CharField(max_length=7, default="#4F46E5")  # HEX color
    font_family = models.CharField(max_length=50, default="Inter, sans-serif")

    def __str__(self):
        return f"{self.user.email} Theme"
