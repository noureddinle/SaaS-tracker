from django.urls import path
from . import views


urlpatterns = [
path('dashboard/', views.tax_dashboard, name='tax-dashboard'),
path('payments/', views.record_tax_payment, name='record-tax-payment'),
path('expenses/', views.add_expense, name='add-expense'),
]