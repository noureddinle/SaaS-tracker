import { useQuery, useMutation } from "@tanstack/react-query";
import { api } from "@/lib/apiClient";

export function useInvoiceTemplates() {
  return useQuery({
    queryKey: ["invoice-templates"],
    queryFn: async () => {
      const { data } = await api.get("/invoice-templates/templates/");
      return data as Array<{
        id: number;
        name: string;
        thumbnail_url: string;
        preview_url?: string;
        figma_file_key: string;
      }>;
    },
  });
}

export function useGenerateInvoicePdf() {
  return useMutation({
    mutationFn: async (payload: {
      invoice_id: number | string;
      template_id: number | string;
      primary_color?: string;
      logo?: File | null;
    }) => {
      const form = new FormData();
      form.append("invoice_id", String(payload.invoice_id));
      form.append("template_id", String(payload.template_id));
      if (payload.primary_color) form.append("primary_color", payload.primary_color);
      if (payload.logo) form.append("logo", payload.logo);
      const { data } = await api.post("/invoice-templates/generate-pdf/", form, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return data as { success: boolean; pdf_url: string };
    },
  });
}
