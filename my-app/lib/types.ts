// Agent Types
export type AgentType = "EMAIL" | "SCRAPER" | "NOTIFIER" | "INVOICE_AUTOMATION" | "PROPOSAL_GENERATOR";

export interface Agent {
  id: number;
  user: number;
  name: string;
  email: string;
  type: AgentType;
  active: boolean;
  n8n_webhook: string | null;
  created_at: string;
}

export interface AgentActionLog {
  id: number;
  agent: number;
  action: string;
  status: "PENDING" | "SUCCESS" | "FAILED";
  result: any;
  created_at: string;
}

export interface CreateAgentData {
  name: string;
  email: string;
  type: AgentType;
  active?: boolean;
  n8n_webhook?: string;
}

export interface TriggerAgentData {
  action?: string;
  [key: string]: any;
}

// N8N Workflow Types
export interface N8NNode {
  id: string;
  name: string;
  type: string;
  typeVersion: number;
  position: [number, number];
  parameters: Record<string, any>;
}

export interface N8NWorkflow {
  name: string;
  nodes: N8NNode[];
  connections: Record<string, any>;
}

// Invoice Summary Workflow Types
export interface InvoiceSummary {
  id: number;
  email: string;
  full_name: string;
  phone: string;
  total_count: number;
  paid_count: number;
  pending_count: number;
  overdue_count: number;
  top3: Invoice[];
  top3_html: string;
  top3_lines: string;
}

export interface Invoice {
  id: number;
  client_name: string;
  amount: number;
  currency: string;
  status: "PAID" | "PENDING" | "OVERDUE";
  created_at: string;
  due_date: string;
}

// Proposal Generation Workflow Types
export interface ProposalGenerationData {
  resume_id: number;
  job_id: number;
  email?: string;
  phone?: string;
}

export interface GeneratedProposal {
  user_proposal: string;
  employer_message: string;
  email?: string;
  phone?: string;
}

// User Types
export interface User {
  id: number;
  email: string;
  full_name?: string;
  phone?: string;
  is_staff?: boolean;
  is_active?: boolean;
}

// Job Types
export interface JobPosting {
  id: number;
  title: string;
  company: string;
  description: string;
  requirements: string;
  budget: number | null;
  budget_type: "HOURLY" | "FIXED" | "";
  posted_date: string | null;
  source: string;
  source_url: string;
  location: string;
  remote: boolean;
  skills_required: string[];
  scraped_at: string;
  is_active: boolean;
}

export interface JobMatch {
  id: number;
  user: number;
  job: JobPosting;
  match_score: number;
  matching_skills: string[];
  experience_match: number;
  created_at: string;
  updated_at: string;
}

// API Response Types
export interface APIResponse<T> {
  results?: T[];
  count?: number;
  next?: string | null;
  previous?: string | null;
}

