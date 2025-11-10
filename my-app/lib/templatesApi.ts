const BASE = process.env.NEXT_PUBLIC_API_BASE || "http://localhost:8000/api";

function authHeaders() {
  const token = (typeof window !== "undefined" && localStorage.getItem("access_token")) || "";
  return token ? { Authorization: `Bearer ${token}` } : {};
}

export async function listTemplates(): Promise<any[]> {
  const res = await fetch(`${BASE}/templates/templates/`, {
    headers: { "Content-Type": "application/json", ...(authHeaders() as Record<string, string>) },
    credentials: "include",
  });
  if (!res.ok) return [];
  const data = await res.json();
  return data?.results || data || [];
}

export async function saveTemplateDraft(payload: { id?: number; name?: string; html: string; css: string }) {
  const method = payload.id ? "PATCH" : "POST";
  const url = payload.id ? `${BASE}/templates/templates/${payload.id}/` : `${BASE}/templates/templates/`;
  const res = await fetch(url, {
    method,
    headers: { "Content-Type": "application/json", ...(authHeaders() as Record<string, string>) },
    credentials: "include",
    body: JSON.stringify({
      name: payload.name,
      html_content: payload.html,
      css_content: payload.css,
      is_active: true,
    }),
  });
  if (!res.ok) throw new Error("Failed to save template");
  return res.json();
}

export async function exportTemplatePdf(payload: { html: string; css: string }): Promise<Blob> {
  const res = await fetch(`${BASE}/templates/export-pdf/`, {
    method: "POST",
    headers: { "Content-Type": "application/json", ...(authHeaders() as Record<string, string>) },
    credentials: "include",
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error("Failed to export PDF");
  return await res.blob();
}

export async function getUserTheme(): Promise<{ primary_color: string; logo_url?: string }> {
  const res = await fetch(`${BASE}/templates/user/theme/`, {
    headers: { "Content-Type": "application/json", ...(authHeaders() as Record<string, string>) },
    credentials: "include",
  });
  if (!res.ok) throw new Error("Failed to load theme");
  return await res.json();
}

export async function updateUserTheme(next: { primary_color?: string; logo_file?: File | null }) {
  const isFileChange = typeof next.logo_file !== "undefined";
  if (isFileChange) {
    const fd = new FormData();
    if (typeof next.primary_color !== "undefined") fd.append("primary_color", next.primary_color);
    // null => remove
    if (next.logo_file === null) {
      fd.append("remove_logo", "true");
    } else if (next.logo_file) {
      fd.append("logo", next.logo_file);
    }

    const res = await fetch(`${BASE}/templates/user/theme/`, {
      method: "PATCH",
      headers: { ...(authHeaders() as Record<string, string>) }, // do NOT set content-type for FormData
      credentials: "include",
      body: fd,
    });
    if (!res.ok) throw new Error("Failed to update theme");
    return await res.json();
  } else {
    const res = await fetch(`${BASE}/templates/user/theme/`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json", ...(authHeaders() as Record<string, string>) },
      credentials: "include",
      body: JSON.stringify({ primary_color: next.primary_color }),
    });
    if (!res.ok) throw new Error("Failed to update theme");
    return await res.json();
  }
}