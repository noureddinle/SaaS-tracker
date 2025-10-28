from rest_framework import generics, status, permissions
from rest_framework.views import APIView
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
from .models import Agent, AgentActionLog
from .serializers import AgentSerializer, AgentCreateSerializer, AgentActionLogSerializer
import requests


class AgentListCreateView(generics.ListCreateAPIView):
    """
    GET  → list all agents (admin/staff)
    POST → create new agent (admin only)
    """
    queryset = Agent.objects.all()
    serializer_class = AgentSerializer

    def get_permissions(self):
        if self.request.method == "POST":
            return [permissions.IsAdminUser()]
        return [permissions.IsAuthenticated()]


class AgentDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Agent.objects.all()
    serializer_class = AgentSerializer
    permission_classes = [permissions.IsAdminUser]


class AgentTriggerView(APIView):
    """
    Trigger a specific agent’s automation workflow through its stored n8n webhook.
    Logs the request and result in AgentActionLog.
    """
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request, pk):
        agent = get_object_or_404(Agent, pk=pk)

        # Step 1: Create log entry
        action = request.data.get("action", "manual_trigger")
        log = AgentActionLog.objects.create(
            agent=agent,
            action=action,
            status="PENDING",
        )

        # Step 2: Ensure webhook exists
        if not agent.n8n_webhook:
            log.status = "FAILED"
            log.result = {"error": "No webhook configured for this agent."}
            log.save()
            return Response(
                {"error": "This agent has no webhook URL set."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        # Step 3: Send request to n8n
        try:
            payload = request.data
            response = requests.post(agent.n8n_webhook, json=payload, timeout=20)

            # Step 4: Save result to logs
            log.status = "SUCCESS" if response.status_code == 200 else "FAILED"
            log.result = {
                "status_code": response.status_code,
                "response": response.text,
            }
            log.save()

            return Response(
                {
                    "message": f"Agent '{agent.name}' triggered.",
                    "status": log.status,
                    "n8n_status": response.status_code,
                },
                status=status.HTTP_200_OK,
            )

        except requests.RequestException as e:
            log.status = "FAILED"
            log.result = {"error": str(e)}
            log.save()
            return Response(
                {"error": f"Failed to contact n8n: {e}"},
                status=status.HTTP_502_BAD_GATEWAY,
            )


class AgentLogListView(generics.ListAPIView):
    queryset = AgentActionLog.objects.all().order_by("-created_at")
    serializer_class = AgentActionLogSerializer
    permission_classes = [permissions.IsAdminUser]


class AgentLogDetailView(generics.RetrieveAPIView):
    queryset = AgentActionLog.objects.all()
    serializer_class = AgentActionLogSerializer
    permission_classes = [permissions.IsAdminUser]
