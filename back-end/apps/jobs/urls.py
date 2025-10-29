from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import JobPostingViewSet, JobMatchViewSet, ProposalViewSet

router = DefaultRouter()
router.register(r"jobs", JobPostingViewSet, basename="jobs")
router.register(r"matches", JobMatchViewSet, basename="matches")
router.register(r"proposals", ProposalViewSet, basename="proposals")

urlpatterns = [
    path("", include(router.urls)),
]
