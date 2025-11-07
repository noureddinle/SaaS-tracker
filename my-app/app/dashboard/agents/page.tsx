"use client";

import { useState, useRef, useEffect } from "react";
import {
  Bell, Moon, Sun, Plus, Edit2, Trash2, X, Mail, Bot,
  FileText, MessageCircle, Globe, CheckCircle2, XCircle, Clock, ChevronDown,
} from "lucide-react";

import DashboardSidebar from "@/components/DashboardSidebar";
import { useTheme } from "@/theme/ThemeContext";
import {
  AgentSchema,
  AgentTypeSchema,
  CreateAgentSchema,
  type Agent,
  type AgentType,
  type CreateAgentData,
  AgentStatus,
} from "@/lib/schemas";

// --- MOCK AGENTS ---
const MOCK_AGENTS: Agent[] = [
  {
    id: 1,
    user: 1,
    name: "Invoice Summary Agent",
    email: "automation@saasai.io",
    type: "EMAIL",
    status: "ACTIVE",
    n8n_webhook: "http://n8n:5678/webhook/invoice_summary",
    created_at: new Date().toISOString(),
  },
  {
    id: 2,
    user: 1,
    name: "Proposal Generator",
    email: "automation@saasai.io",
    type: "PROPOSAL_GENERATOR",
    status: "ACTIVE",
    n8n_webhook: "http://n8n:5678/webhook/proposal_trigger",
    created_at: new Date().toISOString(),
  },
  {
    id: 3,
    user: 1,
    name: "Payment Reminder Bot",
    email: "automation@saasai.io",
    type: "NOTIFIER",
    status: "INACTIVE",
    n8n_webhook: "http://n8n:5678/webhook/payment_reminder",
    created_at: new Date().toISOString(),
  },
];

// --- AGENT TYPES LIST ---
const AGENT_TYPES: {
  value: AgentType;
  label: string;
  icon: any;
  description: string;
}[] = [
  { value: "EMAIL", label: "Email Automation", icon: Mail, description: "Sends automated email notifications" },
  { value: "INVOICE_AUTOMATION", label: "Invoice Automation", icon: FileText, description: "Daily invoice summaries" },
  { value: "PROPOSAL_GENERATOR", label: "Proposal Generator", icon: FileText, description: "AI-powered proposal generation" },
  { value: "NOTIFIER", label: "Notification Bot", icon: MessageCircle, description: "Real-time notifications" },
  { value: "SCRAPER", label: "Job Scraper", icon: Globe, description: "Automated data collection" },
];

// --- SCHEDULE TYPE ---
interface ScheduleData {
  enabled: boolean;
  date: string;
  time: string;
  frequency: "once" | "daily" | "weekly" | "monthly";
}

export default function AgentsPage() {
  const { theme, toggleTheme } = useTheme();

  const [agents, setAgents] = useState<Agent[]>(MOCK_AGENTS);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingAgent, setEditingAgent] = useState<Agent | null>(null);
  const [formData, setFormData] = useState<CreateAgentData>({
    name: "",
    email: "",
    type: "EMAIL",
    status: "ACTIVE",
    n8n_webhook: "",
  });
  const [description, setDescription] = useState("");
  const [schedule, setSchedule] = useState<ScheduleData>({
    enabled: false,
    date: new Date().toISOString().split("T")[0],
    time: "09:00",
    frequency: "daily",
  });

  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.body.style.overflow = isModalOpen ? "hidden" : "unset";
  }, [isModalOpen]);

  const handleCreate = () => {
    setEditingAgent(null);
    setFormData({
      name: "",
      email: "",
      type: "EMAIL",
      status: "ACTIVE",
      n8n_webhook: "",
    });
    setIsModalOpen(true);
  };

  const handleEdit = (agent: Agent) => {
    setEditingAgent(agent);
    setFormData({
      name: agent.name,
      email: agent.email,
      type: agent.type,
      status: agent.status || "ACTIVE",
      n8n_webhook: agent.n8n_webhook || "",
    });
    setIsModalOpen(true);
  };

  const handleSave = () => {
    // ✅ Validate with Zod before saving
    const result = CreateAgentSchema.safeParse(formData);
    if (!result.success) {
      alert("Invalid data: " + JSON.stringify(result.error.format(), null, 2));
      return;
    }

    const valid = result.data;
    if (editingAgent) {
      setAgents((prev) =>
        prev.map((a) => (a.id === editingAgent.id ? { ...a, ...valid } : a))
      );
    } else {
      const newAgent: Agent = {
        id: Date.now(),
        user: 1,
        created_at: new Date().toISOString(),
        ...valid,
        status: valid.status as AgentStatus,
        n8n_webhook: valid.n8n_webhook || null,
      };
      setAgents((prev) => [...prev, newAgent]);
    }
    setIsModalOpen(false);
  };

  const handleDelete = (id: number) => {
    if (confirm("Are you sure you want to delete this agent?")) {
      setAgents((prev) => prev.filter((a) => a.id !== id));
    }
  };

  const getAgentIcon = (type: AgentType) => {
    const Icon = AGENT_TYPES.find((t) => t.value === type)?.icon || Bot;
    return <Icon className="w-4 h-4 text-gray-500" />;
  };

  return (
    <div className={`min-h-screen flex ${theme === "light" ? "bg-white text-black" : "bg-black text-white"}`}>
      <DashboardSidebar />

      <main className="flex-1 p-6">
        <header className="flex justify-between items-center mb-6">
          <h1 className="text-lg font-semibold">Agents</h1>
          <button
            onClick={handleCreate}
            className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700"
          >
            <Plus className="w-4 h-4" />
            Create Agent
          </button>
        </header>

        <div className="space-y-3">
          {agents.map((agent) => (
            <div key={agent.id} className="border rounded-lg p-4 flex justify-between">
              <div className="flex items-center gap-3">
                {getAgentIcon(agent.type)}
                <div>
                  <h3 className="font-semibold">{agent.name}</h3>
                  <p className="text-xs text-gray-500">{agent.email}</p>
                </div>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => handleEdit(agent)}
                  className="p-2 text-sm text-blue-600 hover:text-blue-800"
                >
                  <Edit2 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleDelete(agent.id)}
                  className="p-2 text-sm text-red-600 hover:text-red-800"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
