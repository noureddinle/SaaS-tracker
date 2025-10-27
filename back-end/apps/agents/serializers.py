from rest_framework import serializers
from .models import Agent, AgentActionLog
from django.contrib.auth import get_user_model

User = get_user_model()


class UserBasicSerializer(serializers.ModelSerializer):
    """Lightweight serializer for linked user information."""
    class Meta:
        model = User
        fields = ["id", "email", "full_name"]


class AgentSerializer(serializers.ModelSerializer):
    """Serializer for creating and listing agents."""
    user = UserBasicSerializer(read_only=True)
    user_id = serializers.PrimaryKeyRelatedField(
        queryset=User.objects.all(), source="user", write_only=True
    )

    class Meta:
        model = Agent
        fields = [
            "id",
            "user",
            "user_id",
            "name",
            "email",
            "type",
            "active",
            "n8n_webhook",
            "created_at",
        ]
        read_only_fields = ["id", "created_at"]


class AgentCreateSerializer(serializers.ModelSerializer):
    """Simplified serializer for creating agents without nested user data."""
    class Meta:
        model = Agent
        fields = ["user", "name", "email", "type", "n8n_webhook", "active"]


class AgentActionLogSerializer(serializers.ModelSerializer):
    """Logs of each agent automation trigger or result."""
    agent = serializers.StringRelatedField(read_only=True)

    class Meta:
        model = AgentActionLog
        fields = [
            "id",
            "agent",
            "action",
            "status",
            "result",
            "created_at",
        ]
        read_only_fields = ["id", "created_at", "agent"]
