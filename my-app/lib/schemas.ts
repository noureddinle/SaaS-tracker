import { z } from "zod";

export const UserSchema = z.object({
  id: z.number(),
  email: z.string().email(),
  full_name: z.string().optional(),
  phone: z.string().optional(),
  is_staff: z.boolean().optional(),
  is_active: z.boolean().optional(),
  is_email_verified: z.boolean().optional(),
  date_joined: z.string().datetime().optional(),
  last_login: z.string().datetime().nullable().optional(),
});

export type User = z.infer<typeof UserSchema>;
export type RegisterData = z.infer<typeof RegisterSchema>;
export type LoginData = z.infer<typeof LoginSchema>;
export type AuthResponse = z.infer<typeof AuthResponseSchema>;

// --- Derived Types (inferred from schemas) ---
export type AgentType = z.infer<typeof AgentTypeSchema>;
export type Agent = z.infer<typeof AgentSchema>;
export type CreateAgentData = z.infer<typeof CreateAgentSchema>;
export type AgentStatus = z.infer<typeof AgentStatusSchema>;

export const RegisterSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8, "Password must be at least 8 characters"),
  full_name: z.string().optional(),
});

export const LoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

export const AgentTypeSchema = z.enum([
  "EMAIL",
  "SCRAPER",
  "NOTIFIER",
  "INVOICE_AUTOMATION",
  "PROPOSAL_GENERATOR",
]);

export const AgentStatusSchema = z.enum(["ACTIVE", "INACTIVE", "ERROR"]);



export const AgentSchema = z.object({
  id: z.number(),
  user: z.number(),
  name: z.string(),
  email: z.string().email(),
  type: AgentTypeSchema,
  status: AgentStatusSchema,
  n8n_webhook: z.string().nullable(),
  created_at: z.string().datetime(),
  updated_at: z.string().datetime().optional(),
});

export const CreateAgentSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  type: AgentTypeSchema,
  status: AgentStatusSchema.optional(),
  n8n_webhook: z.string().optional(),
});

export const AgentActionLogSchema = z.object({
  id: z.number(),
  agent: z.number(),
  action: z.string(),
  status: AgentStatusSchema,
  result: z.any(),
  created_at: z.string().datetime(),
});

export const InvoiceStatusSchema = z.enum(["PAID", "PENDING", "OVERDUE"]);

export const InvoiceSchema = z.object({
  id: z.number(),
  client_name: z.string(),
  amount: z.number(),
  currency: z.string(),
  status: InvoiceStatusSchema,
  created_at: z.string().datetime(),
  due_date: z.string().datetime(),
  description: z.string().optional(),
  reference_code: z.string().optional(),
});

export const InvoiceSummarySchema = z.object({
  id: z.number(),
  email: z.string().email(),
  full_name: z.string(),
  phone: z.string(),
  total_count: z.number(),
  paid_count: z.number(),
  pending_count: z.number(),
  overdue_count: z.number(),
  top3: z.array(InvoiceSchema),
  top3_html: z.string(),
  top3_lines: z.string(),
  generated_at: z.string().datetime().optional(),
});

export const BudgetTypeSchema = z.enum(["HOURLY", "FIXED", ""]);

export const JobPostingSchema = z.object({
  id: z.number(),
  title: z.string(),
  company: z.string(),
  description: z.string(),
  requirements: z.string(),
  budget: z.number().nullable(),
  budget_type: BudgetTypeSchema,
  posted_date: z.string().nullable(),
  source: z.string(),
  source_url: z.string().url(),
  location: z.string(),
  remote: z.boolean(),
  skills_required: z.array(z.string()),
  scraped_at: z.string().datetime(),
  is_active: z.boolean(),
});

export const JobMatchSchema = z.object({
  id: z.number(),
  user: z.number(),
  job: JobPostingSchema,
  match_score: z.number(),
  matching_skills: z.array(z.string()),
  experience_match: z.number(),
  created_at: z.string().datetime(),
  updated_at: z.string().datetime(),
});

export const ResumeSchema = z.object({
  id: z.number(),
  user: z.number(),
  full_name: z.string(),
  email: z.string().email(),
  phone: z.string(),
  skills: z.array(z.string()),
  experience_years: z.number(),
  education_level: z.string(),
  created_at: z.string().datetime(),
  updated_at: z.string().datetime(),
});

export const ProposalGenerationSchema = z.object({
  resume_id: z.number(),
  job_id: z.number(),
  email: z.string().email().optional(),
  phone: z.string().optional(),
  language: z.string().optional(),
  tone: z.string().optional(),
});

export const GeneratedProposalSchema = z.object({
  user_proposal: z.string(),
  employer_message: z.string(),
  email: z.string().email().optional(),
  phone: z.string().optional(),
  created_at: z.string().datetime().optional(),
});

export const N8NNodeSchema = z.object({
  id: z.string(),
  name: z.string(),
  type: z.string(),
  typeVersion: z.number(),
  position: z.tuple([z.number(), z.number()]),
  parameters: z.record(z.string(), z.any()),
});

export const N8NWorkflowSchema = z.object({
  id: z.number().optional(),
  name: z.string(),
  active: z.boolean().optional(),
  nodes: z.array(N8NNodeSchema),
  connections: z.record(z.string(), z.any()),
});

export const TriggerAgentSchema = z.object({
  agent: z.number(),
  action: z.string(),
});

export type TriggerAgentData = z.infer<typeof TriggerAgentSchema>;

export const CreateAgentActionLogSchema = z.object({
  id: z.number(),
  agent: z.number(),
  action: z.string(),
  status: AgentStatusSchema,
  result: z.any(),
  created_at: z.string().datetime(),
});

export type CreateAgentActionLog = z.infer<typeof CreateAgentActionLogSchema>;

export const APIResponseSchema = <T extends z.ZodTypeAny>(schema: T) =>
  z.object({
    results: z.array(schema).optional(),
    count: z.number().optional(),
    next: z.string().url().nullable().optional(),
    previous: z.string().url().nullable().optional(),
  });

export const APIErrorSchema = z.object({
  detail: z.string(),
  status_code: z.number().optional(),
  errors: z.record(z.string(), z.array(z.string())).optional(),
});

export const AuthResponseSchema = z.object({
  access: z.string(),
  refresh: z.string().optional(),
  user: UserSchema,
});
