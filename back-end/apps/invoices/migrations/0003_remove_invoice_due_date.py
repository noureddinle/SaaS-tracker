from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('invoices', '0002_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='invoice',
            name='due_date',
        ),
    ]

