from django.db.models.signals import post_save
from django.dispatch import receiver
from apps.invoices.models import Invoice 
from apps.taxes.tasks import update_tax_calculations


@receiver(post_save, sender=Invoice)
def update_taxes_on_payment(sender, instance, created, **kwargs):
    if instance.status == 'PAID' and instance.paid_date:
        update_tax_calculations.delay(
            user_id=instance.user.id,
            year=instance.paid_date.year
        )