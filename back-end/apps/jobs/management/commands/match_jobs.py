from django.core.management.base import BaseCommand
from apps.jobs.services.matching import refresh_all_users

class Command(BaseCommand):
    help = "Recompute job matches for all users."

    def handle(self, *args, **options):
        total = refresh_all_users()
        self.stdout.write(self.style.SUCCESS(f"Updated/created {total} matches"))
