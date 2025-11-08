import os
from celery import Celery
from celery.schedules import crontab

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "core.settings")

app = Celery("core")

# Load Celery config from Django settings (with CELERY_ prefix)
app.config_from_object("django.conf:settings", namespace="CELERY")

# Auto-discover tasks across installed apps
app.autodiscover_tasks()

# 🕘 Celery Beat Scheduler
app.conf.beat_schedule = {
    # Run every morning at 09:00
    "send-tax-reminders-daily": {
        "task": "apps.taxes.tasks.send_quarterly_tax_reminders",
        "schedule": crontab(hour=9, minute=0),
        "options": {"queue": "emails"},
    },
    # Weekly summary or recalculation (optional)
    "recalculate-taxes-weekly": {
        "task": "apps.taxes.tasks.update_tax_calculations",
        "schedule": crontab(day_of_week="monday", hour=6, minute=0),
        "args": [1, 2025],  # you can remove this if using dynamic users
        "options": {"queue": "default"},
    },
}
