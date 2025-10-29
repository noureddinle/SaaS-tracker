from django.contrib import admin
from .models import JobPosting, JobMatch, ProposalTemplate

@admin.register(JobPosting)
class JobPostingAdmin(admin.ModelAdmin):
    list_display = ("title", "company", "source", "remote", "is_active", "scraped_at")
    search_fields = ("title", "company", "description", "source_url")
    list_filter = ("source", "remote", "is_active")

@admin.register(JobMatch)
class JobMatchAdmin(admin.ModelAdmin):
    list_display = ("user", "job", "match_score", "status", "created_at")
    list_filter = ("status",)
    search_fields = ("user__email", "job__title", "job__company")

@admin.register(ProposalTemplate)
class ProposalTemplateAdmin(admin.ModelAdmin):
    list_display = ("user", "job_match", "generated_at", "sent_at", "response_received")
