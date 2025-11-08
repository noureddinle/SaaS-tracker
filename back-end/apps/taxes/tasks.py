from celery import shared_task
from datetime import date, timedelta
from django.core.mail import EmailMultiAlternatives
from django.template.loader import render_to_string
from apps.taxes.calculators import MoroccoTaxCalculator
from apps.taxes.models import TaxYear
from django.contrib.auth import get_user_model
User = get_user_model()




@shared_task
def update_tax_calculations(user_id, year):
    user = User.objects.get(id=user_id)
    calculator = MoroccoTaxCalculator(user)
    calculator.calculate_annual_tax(year)

@shared_task
def send_quarterly_tax_reminders():
    users = User.objects.filter(
    tax_profile__isnull=False,
    tax_profile__next_filing_deadline__isnull=False
    )

    for user in users:
        deadline = user.tax_profile.next_filing_deadline
        days_until = (deadline - date.today()).days
        if days_until in [30, 14, 7, 3, 1]:
            send_tax_deadline_reminder.delay(user.id, str(deadline), days_until)


@shared_task
def send_tax_deadline_reminder(user_id, deadline, days_until):
    user = User.objects.get(id=user_id)
    calculator = MoroccoTaxCalculator(user)
    current_quarter = (date.fromisoformat(deadline).month - 1) // 3 + 1
    quarter_info = calculator.calculate_quarterly_payment(
        year=date.fromisoformat(deadline).year, quarter=current_quarter)

    subject = f"⏰ Tax Payment Due in {days_until} Days"

    html_content = render_to_string('emails/tax_reminder.html', {
        'user': user,
        'deadline': deadline,
        'quarter': current_quarter,
        'estimated_tax': quarter_info['estimated_tax'],
        'revenue': quarter_info['revenue'],
        'days_until': days_until
    })

    msg = EmailMultiAlternatives(
        subject,
        f"Hi {user.first_name}, your tax payment is due in {days_until} days.",
        'tax@yourapp.com',
        [user.email]
    )
    msg.attach_alternative(html_content, 'text/html')
    msg.send(fail_silently=True)