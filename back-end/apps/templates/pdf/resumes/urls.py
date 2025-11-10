from django.urls import path
from .views import upload_resume, match_jobs

urlpatterns = [
    path("upload/", upload_resume, name="upload_resume"),
    path("match/", match_jobs, name="match_jobs")
]
