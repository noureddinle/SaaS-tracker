from django.urls import path
from .views import import_figma_templates, UserInvoiceThemeView, InvoiceTemplateListView

urlpatterns = [
     path("figma/import/", import_figma_templates, name="import-figma-templates"),
    path("user/theme/", UserInvoiceThemeView.as_view(), name="user-invoice-theme"),
    path("templates/", InvoiceTemplateListView.as_view(), name="invoice-template-list"),
]
