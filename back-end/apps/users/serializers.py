from rest_framework import serializers
from django.contrib.auth import get_user_model
from rest_framework_simplejwt.tokens import RefreshToken

User = get_user_model()

class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = [
            "id",
            "email",
            "full_name",
            "phone",
            "country",
            "city",
            "profession",
            "company_name",
            "business_type",
            "website",
            "linkedin_profile",
            "bio",
            "avatar_url",
            "date_joined",
        ]
        read_only_fields = ["date_joined"]

    def get_avatar_url(self, obj):
        request = self.context.get("request")
        if obj.avatar and request:
            return request.build_absolute_uri(obj.avatar.url)
        elif obj.avatar:
            return obj.avatar.url
        return None

    def create(self, validated_data):
        user = User.objects.create_user(
            email=validated_data['email'],
            password=validated_data['password'],
            full_name=validated_data.get('full_name', '')
        )
        return user


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'email', 'full_name', 'date_joined']


class LoginResponseSerializer(serializers.Serializer):
    refresh = serializers.CharField()
    access = serializers.CharField()
    user = UserSerializer()
