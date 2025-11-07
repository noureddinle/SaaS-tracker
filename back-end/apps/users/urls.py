from django.urls import path
from .views import (
    RegisterView,
    LoginView,
    MeView,
    UserListView,
    VerifyEmailView,
    LogoutView,
)

urlpatterns = [
    path("register/", RegisterView.as_view(), name="register"),
    path("login/", LoginView.as_view(), name="login"),
    path("logout/", LogoutView.as_view(), name="logout"),
    path("verify-email/<uidb64>/<token>/", VerifyEmailView.as_view(), name="verify-email"),
    path("me/", MeView.as_view(), name="me"),
    path("users/", UserListView.as_view(), name="users"),  # admin only
]
