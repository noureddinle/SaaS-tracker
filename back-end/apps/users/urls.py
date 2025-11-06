from django.urls import path
from .views import RegisterView, LoginView, ProfileView, UserListView, VerifyEmailView

urlpatterns = [
    path('register/', RegisterView.as_view(), name='register'),
    path('login/', LoginView.as_view(), name='login'),
    path("users/", UserListView.as_view(), name="users"),
    path('profile/', ProfileView.as_view(), name='profile'),
    path('verify-email/<uidb64>/<token>/', VerifyEmailView.as_view(), name='verify-email'),
]
