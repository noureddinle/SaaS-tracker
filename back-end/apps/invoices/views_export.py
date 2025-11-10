from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from django.http import FileResponse
from templates_engine.pdf_renderer import render_invoice_to_pdf


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def export_invoice_pdf(request, invoice_id):
    """
    Generates a high-quality WeasyPrint PDF and returns it as a file.
    """
    try:
        pdf_file = render_invoice_to_pdf(request.user, invoice_id)
    except Exception as e:
        return Response({"error": str(e)}, status=400)

    return FileResponse(pdf_file, as_attachment=True, filename=pdf_file.name)
