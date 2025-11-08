import logging
import os

import requests
from datetime import timedelta
from django.contrib.auth import authenticate, get_user_model
from django.contrib.auth.tokens import default_token_generator
from django.core.mail import EmailMultiAlternatives
from django.shortcuts import redirect
from django.template.loader import render_to_string
from django.utils import timezone
from django.utils.encoding import force_bytes, force_str
from django.utils.http import urlsafe_base64_encode, urlsafe_base64_decode
from rest_framework import generics, status, permissions
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.tokens import RefreshToken

from .serializers import RegisterSerializer, UserSerializer, LoginResponseSerializer
from .utils import generate_verification_link


User = get_user_model()

FRONTEND_URL = os.getenv("FRONTEND_URL")
logger = logging.getLogger(__name__)

class RegisterView(generics.CreateAPIView):
    serializer_class = RegisterSerializer
    permission_classes = [permissions.AllowAny]

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data, context={"request": request})
        serializer.is_valid(raise_exception=True)
        user = serializer.save()

        self._send_verification_email(user, request)

        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)

    def _send_verification_email(self, user, request):
        verification_link = generate_verification_link(user, request)

        subject = "Verify your email address"
        recipient_list = [user.email]

        html_content = render_to_string("emails/verify_email.html", {
            "user": user,
            "verification_link": verification_link,
            "year": timezone.now().year,
        })
        text_content = f"Hi {user.first_name or 'there'}, please verify your email by clicking this link: {verification_link}"

        if self._send_with_sendgrid(user, subject, text_content, html_content):
            return

        self._send_with_smtp(subject, text_content, html_content, recipient_list)

    def _send_with_sendgrid(self, user, subject, text_content, html_content):
        api_key = os.getenv("SENDGRID_API_KEY")
        from_email = os.getenv("SENDGRID_FROM_EMAIL") or os.getenv("DEFAULT_FROM_EMAIL") or "interlud12xe@gmail.com"
        if not api_key or not from_email:
            return False

        display_name = getattr(user, "full_name", None) or getattr(user, "first_name", None) or user.email
        from_name = os.getenv("SENDGRID_FROM_NAME", "SaaS Tracker")
        email_timeout = int(os.getenv("EMAIL_TIMEOUT", "10"))

        payload = {
            "personalizations": [
                {
                    "to": [{"email": user.email, "name": display_name}],
                    "subject": subject,
                }
            ],
            "from": {"email": from_email, "name": from_name},
            "content": [
                {"type": "text/plain", "value": text_content},
                {"type": "text/html", "value": html_content},
            ],
        }

        headers = {
            "Authorization": f"Bearer {api_key}",
            "Content-Type": "application/json",
        }

        try:
            response = requests.post(
                "https://api.sendgrid.com/v3/mail/send",
                headers=headers,
                json=payload,
                timeout=email_timeout,
            )
            response.raise_for_status()
            logger.info("Verification email queued via SendGrid for %s", user.email)
            return True
        except requests.RequestException:
            logger.exception("SendGrid email delivery failed for %s", user.email)
            return False

    def _send_with_smtp(self, subject, text_content, html_content, recipient_list):
        from_email = os.getenv("DEFAULT_FROM_EMAIL") or os.getenv("EMAIL_HOST_USER") or "interlud12xe@gmail.com"
        msg = EmailMultiAlternatives(subject, text_content, from_email, recipient_list)
        msg.attach_alternative(html_content, "text/html")
        try:
            msg.send(fail_silently=False)
            logger.info("Verification email sent via SMTP for %s", recipient_list[0])
        except Exception:
            logger.exception("SMTP email delivery failed for %s", recipient_list[0])


class VerifyEmailView(APIView):
    permission_classes = [permissions.AllowAny]

    def get(self, request, uidb64, token):
        try:
            uid = force_str(urlsafe_base64_decode(uidb64))
            user = User.objects.get(pk=uid)
        except (TypeError, ValueError, OverflowError, User.DoesNotExist):
            return redirect(f"{FRONTEND_URL}/register?verified=false&error=invalid_link")

        if not default_token_generator.check_token(user, token):
            return redirect(f"{FRONTEND_URL}/register?verified=false&error=invalid_token")

        if not user.is_email_verified:
            user.is_email_verified = True
            user.save(update_fields=["is_email_verified"])

        refresh = RefreshToken.for_user(user)
        access_token = str(refresh.access_token)
        refresh_token = str(refresh)

        return redirect(
            f"{FRONTEND_URL}/dashboard"
            f"?verified=true&access={access_token}&refresh={refresh_token}"
        )
    

class ResendVerificationEmailView(APIView):
    permission_classes = [permissions.AllowAny]

    def post(self, request):
        email = request.data.get("email")
        if not email:
            return Response({"detail": "Email is required."}, status=status.HTTP_400_BAD_REQUEST)

        try:
            user = User.objects.get(email=email)
        except User.DoesNotExist:
            return Response({"detail": "User not found."}, status=status.HTTP_404_NOT_FOUND)

        if user.is_email_verified:
            return Response({"detail": "Email is already verified."}, status=status.HTTP_400_BAD_REQUEST)

        if hasattr(user, "last_verification_sent") and user.last_verification_sent:
            elapsed = timezone.now() - user.last_verification_sent
            if elapsed < timedelta(minutes=2):
                return Response(
                    {"detail": "Please wait before requesting another verification email."},
                    status=status.HTTP_429_TOO_MANY_REQUESTS
                )

        verification_link = generate_verification_link(user, request)
        subject = "Verify your email address"
        from_email = "interlud12xe@gmail.com"
        recipient_list = [user.email]

        html_content = render_to_string("emails/verify_email.html", {
            "user": user,
            "verification_link": verification_link,
            "year": timezone.now().year,
        })
        text_content = f"Hi {user.first_name or 'there'}, please verify your email by clicking this link: {verification_link}"

        msg = EmailMultiAlternatives(subject, text_content, from_email, recipient_list)
        msg.attach_alternative(html_content, "text/html")
        try:
            msg.send(fail_silently=False)
        except Exception:
            return Response(
                {"detail": "Verification email could not be sent. Please try again later."},
                status=status.HTTP_503_SERVICE_UNAVAILABLE,
            )

        user.last_verification_sent = timezone.now()
        user.save(update_fields=["last_verification_sent"])

        return Response({"detail": "Verification email resent successfully!"}, status=status.HTTP_200_OK)


class LoginView(APIView):
    authentication_classes = []
    permission_classes = [permissions.AllowAny]

    def post(self, request):
        email = request.data.get("email")
        password = request.data.get("password")
        user = authenticate(request, email=email, password=password)

        if not user:
            return Response({"detail": "Invalid credentials"}, status=status.HTTP_401_UNAUTHORIZED)

        if not user.is_email_verified:
            return Response(
                {"detail": "Email not verified. Please check your email for verification."},
                status=status.HTTP_401_UNAUTHORIZED
            )

        refresh = RefreshToken.for_user(user)
        data = {
            "refresh": str(refresh),
            "access": str(refresh.access_token),
            "user": UserSerializer(user).data
        }
        serializer = LoginResponseSerializer(data=data)
        serializer.is_valid(raise_exception=True)
        return Response(serializer.data)


class UserListView(generics.ListAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAdminUser]


class ProfileView(generics.RetrieveAPIView):
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated]

    def get_object(self):
        return self.request.user

class MeView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        serializer = UserSerializer(request.user)
        return Response(serializer.data)

class LogoutView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        return Response({"detail": "Logged out successfully!"}, status=status.HTTP_200_OK)

