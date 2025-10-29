from django.contrib import admin
from django.utils.html import format_html
from .models import User
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin

@admin.register(User)
class UserAdmin(BaseUserAdmin):
    def avatar_preview(self, obj):
        if obj.avatar:
            return format_html('<img src="{}" width="40" height="40" style="border-radius:50%;" />', obj.avatar.url)
        return "No Image"

    avatar_preview.short_description = "Avatar"

    list_display = ("avatar_preview", "email", "full_name", "phone", "country", "profession", "company_name", "is_staff", "is_active")
    list_filter = ("is_staff", "is_active", "country", "business_type")
    search_fields = ("email", "full_name", "company_name", "profession")
    ordering = ("-date_joined",)
    fieldsets = (
        (None, {"fields": ("email", "password")}),
        ("Personal Info", {"fields": ("full_name", "phone", "country", "city", "avatar", "bio")}),
        ("Business Info", {
            "fields": (
                "profession",
                "company_name",
                "business_type",
                "website",
                "linkedin_profile",
            )
        }),
        ("Permissions", {"fields": ("is_active", "is_staff", "is_superuser", "groups", "user_permissions")}),
        ("Important Dates", {"fields": ("last_login", "date_joined")}),
    )
