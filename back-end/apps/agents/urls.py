from django.urls import path
from . import views

urlpatterns = [
    # Agents
    path("", views.AgentListCreateView.as_view(), name="agent-list-create"),
    path("<int:pk>/", views.AgentDetailView.as_view(), name="agent-detail"),
    path("<int:pk>/trigger/", views.AgentTriggerView.as_view(), name="agent-trigger"),

    # Logs
    path("logs/", views.AgentLogListView.as_view(), name="agent-logs"),
    path("logs/<int:pk>/", views.AgentLogDetailView.as_view(), name="agent-log-detail"),
]
