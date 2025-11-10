from rest_framework import serializers
from .models import Resume

class ResumeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Resume
        fields = [
            "id", "user", "file", "text_content",
            "embedding", "ai_summary", "created_at"
        ]
        read_only_fields = ["embedding", "ai_summary", "text_content", "created_at"]
