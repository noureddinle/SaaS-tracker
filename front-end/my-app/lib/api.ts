import { Invoice, Agent, DashboardStats } from "@/lib/types";

const API_URL = process.env.API_BASE_URL || "http://localhost:8000/api";

// 🧾 Fetch all invoices
export async function fetchInvoices(): Promise<Invoice[]> {
  const res = await fetch(`${API_URL}/invoices/`);
  if (!res.ok) throw new Error("Failed to fetch invoices");
  return res.json();
}

// 👥 Fetch agents
export async function fetchAgents(): Promise<Agent[]> {
  const res = await fetch(`${API_URL}/agents/`);
  if (!res.ok) throw new Error("Failed to fetch agents");
  return res.json();
}

// 📊 Fetch dashboard summary
export async function fetchDashboardStats(): Promise<DashboardStats> {
  const res = await fetch(`${API_URL}/dashboard/`);
  if (!res.ok) throw new Error("Failed to fetch dashboard stats");
  return res.json();
}
