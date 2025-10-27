export interface Invoice {
  id: number;
  client: string;
  amount: number;
  status: "pending" | "paid" | "overdue";
  due_date: string;
}

export interface Agent {
  id: number;
  name: string;
  email: string;
  active_invoices: number;
}

export interface DashboardStats {
  total_revenue: number;
  pending_invoices: number;
  paid_invoices: number;
  active_agents: number;
}
