from django.contrib import admin
from .models import invoice

@admin.register(invoice)
class InvoiceAdmin(admin.ModelAdmin):
    list_display = ("id", "client_name", "amount", "status", "created_at", "user")
    list_filter = ("status", "created_at") 
    search_fields = ("client_name", "user__email")
