"use client";

import { useState, useRef, useEffect } from "react";
import { 
  Bell, Moon, Sun, Plus, Edit2, Trash2, Save, X, 
  Mail, Bot, FileText, MessageCircle, Globe, Clock, Calendar,
  ChevronDown, CheckCircle2, XCircle
} from "lucide-react";
import DashboardSidebar from "@/components/DashboardSidebar";
import { useTheme } from "@/theme/ThemeContext";
import { Agent, AgentType, CreateAgentData } from "@/lib/types";

// Mock data - replace with API calls
const MOCK_AGENTS: Agent[] = [
  {
    id: 1,
    user: 1,
    name: "Invoice Summary Agent",
    email: "automation@saasai.io",
    type: "EMAIL",
    active: true,
    n8n_webhook: "http://n8n:5678/webhook/invoice_summary",
    created_at: new Date().toISOString(),
  },
  {
    id: 2,
    user: 1,
    name: "Proposal Generator",
    email: "automation@saasai.io",
    type: "PROPOSAL_GENERATOR",
    active: true,
    n8n_webhook: "http://n8n:5678/webhook/proposal_trigger",
    created_at: new Date().toISOString(),
  },
  {
    id: 3,
    user: 1,
    name: "Payment Reminder Bot",
    email: "automation@saasai.io",
    type: "NOTIFIER",
    active: false,
    n8n_webhook: "http://n8n:5678/webhook/payment_reminder",
    created_at: new Date().toISOString(),
  },
];

const AGENT_TYPES: { value: AgentType; label: string; icon: any; description: string }[] = [
  { value: "EMAIL", label: "Email Automation", icon: Mail, description: "Sends automated email notifications" },
  { value: "INVOICE_AUTOMATION", label: "Invoice Automation", icon: FileText, description: "Daily invoice summaries with CSV reports" },
  { value: "PROPOSAL_GENERATOR", label: "Proposal Generator", icon: FileText, description: "AI-powered proposal generation" },
  { value: "NOTIFIER", label: "Notification Bot", icon: MessageCircle, description: "Real-time notifications via multiple channels" },
  { value: "SCRAPER", label: "Job Scraper", icon: Globe, description: "Automated data collection from external sources" },
];

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
  const [isTypeOpen, setIsTypeOpen] = useState(false);
  const [isFrequencyOpen, setIsFrequencyOpen] = useState(false);
  const [formData, setFormData] = useState<CreateAgentData>({
    name: "",
    email: "",
    type: "EMAIL",
    active: true,
    n8n_webhook: "",
  });
  const [description, setDescription] = useState("");
  const [schedule, setSchedule] = useState<ScheduleData>({
    enabled: false,
    date: new Date().toISOString().split('T')[0],
    time: "09:00",
    frequency: "daily",
  });
  const typeSelectRef = useRef<HTMLDivElement>(null);
  const frequencySelectRef = useRef<HTMLDivElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  const frequencyOptions = [
    { value: "once", label: "Once" },
    { value: "daily", label: "Daily" },
    { value: "weekly", label: "Weekly" },
    { value: "monthly", label: "Monthly" },
  ];

  // Close dropdowns and modal when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (typeSelectRef.current && !typeSelectRef.current.contains(event.target as Node)) {
        setIsTypeOpen(false);
      }
      if (frequencySelectRef.current && !frequencySelectRef.current.contains(event.target as Node)) {
        setIsFrequencyOpen(false);
      }
      if (modalRef.current && !modalRef.current.contains(event.target as Node) && (event.target as HTMLElement).classList.contains('modal-backdrop')) {
        handleCancel();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isModalOpen]);

  const handleCreate = () => {
    setEditingAgent(null);
    setFormData({
      name: "",
      email: "",
      type: "EMAIL",
      active: true,
      n8n_webhook: "",
    });
    setDescription("");
    setSchedule({
      enabled: false,
      date: new Date().toISOString().split('T')[0],
      time: "09:00",
      frequency: "daily",
    });
    setIsModalOpen(true);
  };

  const handleEdit = (agent: Agent) => {
    setEditingAgent(agent);
    setFormData({
      name: agent.name,
      email: agent.email,
      type: agent.type,
      active: agent.active,
      n8n_webhook: agent.n8n_webhook || "",
    });
    setDescription("");
    // In a real app, you'd fetch schedule from agent data
    setSchedule({
      enabled: false,
      date: new Date().toISOString().split('T')[0],
      time: "09:00",
      frequency: "daily",
    });
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setEditingAgent(null);
    setFormData({
      name: "",
      email: "",
      type: "EMAIL",
      active: true,
      n8n_webhook: "",
    });
    setDescription("");
    setSchedule({
      enabled: false,
      date: new Date().toISOString().split('T')[0],
      time: "09:00",
      frequency: "daily",
    });
  };

  const handleSave = () => {
    if (!formData.name || !formData.email) {
      alert("Please fill in all required fields");
      return;
    }

    if (editingAgent) {
      // Update existing agent
      setAgents(agents.map(agent => 
        agent.id === editingAgent.id 
          ? { ...agent, ...formData, n8n_webhook: formData.n8n_webhook || null }
          : agent
      ));
    } else {
      // Create new agent
      const newAgent: Agent = {
        id: Date.now(),
        user: 1,
        name: formData.name,
        email: formData.email,
        type: formData.type,
        active: formData.active ?? true,
        n8n_webhook: formData.n8n_webhook || null,
        created_at: new Date().toISOString(),
      };
      setAgents([...agents, newAgent]);
    }

    // In a real app, you'd save the schedule data here
    console.log("Schedule:", schedule);

    handleCancel();
  };

  const handleDelete = (agentId: number) => {
    if (confirm("Are you sure you want to delete this agent?")) {
      setAgents(agents.filter(agent => agent.id !== agentId));
      if (editingAgent?.id === agentId) {
        handleCancel();
      }
    }
  };

  const getAgentIcon = (type: AgentType) => {
    const agentType = AGENT_TYPES.find(t => t.value === type);
    const Icon = agentType?.icon || Bot;
    return <Icon className={`w-4 h-4 ${theme === "light" ? "text-gray-600" : "text-gray-400"}`} />;
  };

  const selectedType = AGENT_TYPES.find(t => t.value === formData.type);
  const selectedFrequency = frequencyOptions.find(f => f.value === schedule.frequency);

  return (
    <div className={`min-h-screen flex ${theme === "light" ? "bg-white text-black" : "bg-black text-white"}`}>
      <DashboardSidebar />

      {/* Main content */}
      <main className="flex-1 flex flex-col overflow-auto">
        {/* Top bar */}
        <header className={`border-b ${theme === "light" ? "border-gray-100" : "border-gray-900"} px-6 py-3 flex items-center justify-between`}>
          <h1 className="text-lg font-semibold">Agent Configuration</h1>
          <div className="flex items-center gap-2">
            <button className={`p-1.5 ${theme === "light" ? "hover:bg-gray-100" : "hover:bg-neutral-900"} rounded-md`}>
              <Bell className={`w-4 h-4 ${theme === "light" ? "text-gray-600" : "text-gray-400"}`} />
            </button>
            <button onClick={toggleTheme} className={`flex-1 ${theme === "light" ? "hover:bg-gray-100" : "hover:bg-gray-900"} p-1.5 rounded-md`}>
              {theme === "light" ? <Moon className={`w-4 h-4 ${theme === "light" ? "text-gray-600" : "text-gray-400"}`} /> : <Sun className={`w-4 h-4 ${theme === "dark" ? "text-gray-600" : "text-gray-400"}`} />}
            </button>
          </div>
        </header>

        <div className="flex-1 px-6 py-6">
          {/* Header Section */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-semibold mb-1">Configure Agents</h2>
              <p className={`text-sm ${theme === "light" ? "text-gray-600" : "text-gray-400"}`}>
                Create and manage automation agents for your workflows
              </p>
            </div>
            <button
              onClick={handleCreate}
              className="flex items-center gap-2 px-4 py-2 text-sm rounded-md bg-black hover:bg-gray-800 text-white transition-colors"
            >
              <Plus className="w-4 h-4" />
              Create Agent
            </button>
          </div>

          {/* Agents List */}
          <div className="space-y-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Your Agents</h3>
              <span className={`text-sm ${theme === "light" ? "text-gray-500" : "text-gray-400"}`}>
                {agents.length} {agents.length === 1 ? "agent" : "agents"}
              </span>
            </div>

            {agents.length === 0 ? (
              <div className={`rounded-lg border ${theme === "light" ? "border-gray-100 bg-white" : "border-gray-800 bg-gray-950"} p-12 text-center`}>
                <Bot className={`w-12 h-12 mx-auto mb-3 ${theme === "light" ? "text-gray-400" : "text-gray-700"}`} />
                <h3 className={`text-sm font-medium ${theme === "light" ? "text-gray-700" : "text-gray-400"} mb-1`}>
                  No agents configured
                </h3>
                <p className={`text-xs ${theme === "light" ? "text-gray-500" : "text-gray-600"}`}>
                  Create your first automation agent to get started
                </p>
              </div>
            ) : (
              <div className={`rounded-lg border ${theme === "light" ? "border-gray-100 bg-white" : "border-gray-800 bg-gray-950"} overflow-hidden`}>
                <div className={`divide-y ${theme === "light" ? "divide-gray-100" : "divide-gray-900"}`}>
                  {agents.map((agent) => (
                    <div
                      key={agent.id}
                      className={`group px-6 py-4 ${theme === "light" ? "hover:bg-gray-50" : "hover:bg-gray-900"} transition-colors`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4 flex-1 min-w-0">
                          <div className={`w-10 h-10 rounded-md flex items-center justify-center flex-shrink-0 ${
                            theme === "light" ? "bg-gray-100" : "bg-gray-900"
                          }`}>
                            {getAgentIcon(agent.type)}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1">
                              <h4 className={`text-sm font-semibold ${theme === "light" ? "text-gray-900" : "text-gray-200"}`}>
                                {agent.name}
                              </h4>
                              {agent.active ? (
                                <span className="flex items-center gap-1 text-xs text-green-500">
                                  <CheckCircle2 className="w-3 h-3" />
                                  Active
                                </span>
                              ) : (
                                <span className="flex items-center gap-1 text-xs text-gray-500">
                                  <XCircle className="w-3 h-3" />
                                  Inactive
                                </span>
                              )}
                            </div>
                            <p className={`text-xs ${theme === "light" ? "text-gray-600" : "text-gray-400"} mb-1`}>
                              {agent.email}
                            </p>
                            <p className={`text-xs ${theme === "light" ? "text-gray-500" : "text-gray-500"}`}>
                              {AGENT_TYPES.find(t => t.value === agent.type)?.label || agent.type}
                              {agent.n8n_webhook && " • Webhook configured"}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button
                            onClick={() => handleEdit(agent)}
                            className={`p-2 rounded-md transition-colors ${
                              theme === "light" ? "hover:bg-gray-200 text-gray-700" : "hover:bg-gray-800 text-gray-300"
                            }`}
                            title="Edit agent"
                          >
                            <Edit2 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDelete(agent.id)}
                            className={`p-2 rounded-md transition-colors ${
                              theme === "light" ? "hover:bg-red-100 text-red-600" : "hover:bg-red-900/30 text-red-400"
                            }`}
                            title="Delete agent"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Modal Popup */}
      {isModalOpen && (
        <div 
          className={`modal-backdrop fixed inset-0 z-50 flex items-center justify-center p-4 ${theme === "light" ? "bg-gray-50/50" : "bg-gray-900/50"}`}
          style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              handleCancel();
            }
          }}
        >
          <div
            ref={modalRef}
            className={`rounded-xl border shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto ${
              theme === "light" ? "border-gray-200 bg-white" : "border-gray-800 bg-gray-950"
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Breadcrumb Header */}
            <div className={`flex items-center justify-between px-6 py-4 border-b ${
              theme === "light" ? "border-gray-200" : "border-gray-800"
            }`}>
              <div className="flex items-center gap-2 text-sm">
                <div className={`flex items-center gap-1.5 ${theme === "light" ? "text-gray-600" : "text-gray-400"}`}>
                  <Bot className="w-4 h-4 text-purple-500" />
                  <span className="font-medium">Agents</span>
                </div>
                <span className={theme === "light" ? "text-gray-400" : "text-gray-600"}>›</span>
                <span className={theme === "light" ? "text-gray-900" : "text-gray-200"}>
                  {editingAgent ? "Edit agent" : "New agent"}
                </span>
              </div>
              <button
                onClick={handleCancel}
                className={`p-1.5 rounded-md ${theme === "light" ? "hover:bg-gray-100 text-gray-600" : "hover:bg-gray-900 text-gray-400"}`}
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="px-6 py-6">
              {/* Icon and Agent Name Section */}
              <div className="flex items-start gap-4 mb-6">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${
                  theme === "light" ? "bg-gray-100" : "bg-gray-900"
                }`}>
                  <Bot className={`w-5 h-5 ${theme === "light" ? "text-gray-600" : "text-gray-400"}`} />
                </div>
                <div className="flex-1">
                  <label className={`block text-xs font-medium mb-2 ${theme === "light" ? "text-gray-500" : "text-gray-500"}`}>
                    Agent name
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className={`w-full px-0 py-2 text-2xl font-semibold bg-transparent border-none focus:outline-none ${
                      theme === "light" ? "text-gray-900 placeholder-gray-400" : "text-gray-100 placeholder-gray-600"
                    }`}
                    placeholder="Add a short summary..."
                  />
                </div>
              </div>

              {/* Quick Settings Pills */}
              <div className="flex items-center gap-2 mb-6 flex-wrap">
                {/* Agent Type Pill */}
                <div className="relative" ref={typeSelectRef}>
                  <button
                    onClick={() => setIsTypeOpen(!isTypeOpen)}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                      theme === "light"
                        ? "bg-gray-100 text-gray-700 hover:bg-gray-200"
                        : "bg-gray-900 text-gray-300 hover:bg-gray-800"
                    }`}
                  >
                    {selectedType && (
                      <>
                        <selectedType.icon className="w-3.5 h-3.5" />
                        <span>{selectedType.label}</span>
                        <ChevronDown className="w-3 h-3" />
                      </>
                    )}
                  </button>
                  
                  {/* Type Dropdown */}
                  {isTypeOpen && (
                    <div
                      className={`absolute top-full left-0 mt-1 z-50 rounded-lg border shadow-lg overflow-hidden min-w-[200px] ${
                        theme === "light"
                          ? "bg-white border-gray-200"
                          : "bg-gray-950 border-gray-800"
                      }`}
                    >
                      {AGENT_TYPES.map((type) => {
                        const Icon = type.icon;
                        return (
                          <button
                            key={type.value}
                            onClick={() => {
                              setFormData({ ...formData, type: type.value });
                              setIsTypeOpen(false);
                            }}
                            className={`w-full text-left px-3 py-2.5 text-sm transition-colors ${
                              formData.type === type.value
                                ? theme === "light"
                                  ? "bg-purple-500 text-white"
                                  : "bg-purple-600 text-white"
                                : theme === "light"
                                  ? "text-gray-900 hover:bg-gray-50"
                                  : "text-gray-300 hover:bg-gray-900"
                            }`}
                          >
                            <div className="flex items-center gap-2">
                              <Icon className="w-4 h-4" />
                              <div>
                                <div className="font-medium">{type.label}</div>
                                <div className={`text-xs ${formData.type === type.value ? "text-purple-100" : theme === "light" ? "text-gray-500" : "text-gray-500"}`}>
                                  {type.description}
                                </div>
                              </div>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>

                {/* Active Status Pill */}
                <button
                  onClick={() => setFormData({ ...formData, active: !formData.active })}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                    formData.active
                      ? theme === "light"
                        ? "bg-green-100 text-green-700"
                        : "bg-green-900/30 text-green-400"
                      : theme === "light"
                        ? "bg-gray-100 text-gray-700"
                        : "bg-gray-900 text-gray-300"
                  }`}
                >
                  {formData.active ? (
                    <>
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Active</span>
                    </>
                  ) : (
                    <>
                      <XCircle className="w-3.5 h-3.5" />
                      <span>Inactive</span>
                    </>
                  )}
                </button>

                {/* Schedule Pill */}
                <button
                  onClick={() => setSchedule({ ...schedule, enabled: !schedule.enabled })}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                    schedule.enabled
                      ? theme === "light"
                        ? "bg-blue-100 text-blue-700"
                        : "bg-blue-900/30 text-blue-400"
                      : theme === "light"
                        ? "bg-gray-100 text-gray-700"
                        : "bg-gray-900 text-gray-300"
                  }`}
                >
                  <Clock className="w-3.5 h-3.5" />
                  <span>Schedule</span>
                </button>
              </div>

              {/* Description Area */}
              <div className="mb-6">
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className={`w-full px-4 py-3 rounded-lg border resize-none ${
                    theme === "light"
                      ? "bg-white border-gray-200 text-gray-900 placeholder-gray-400 focus:border-purple-500"
                      : "bg-gray-950 border-gray-800 text-gray-200 placeholder-gray-600 focus:border-purple-500"
                  } focus:outline-none focus:ring-1 focus:ring-purple-500`}
                  rows={4}
                  placeholder="Write a description, a project brief, or collect ideas..."
                />
              </div>

              {/* Additional Fields Section */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                {/* Email */}
                <div>
                  <label className={`block text-xs font-medium mb-2 ${theme === "light" ? "text-gray-500" : "text-gray-500"}`}>
                    Email
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className={`w-full px-3 py-2 text-sm rounded-lg border ${
                      theme === "light"
                        ? "bg-white border-gray-200 text-gray-900 focus:border-purple-500"
                        : "bg-gray-950 border-gray-800 text-gray-200 focus:border-purple-500"
                    } focus:outline-none focus:ring-1 focus:ring-purple-500`}
                    placeholder="automation@saasai.io"
                  />
                </div>

                {/* Webhook URL */}
                <div>
                  <label className={`block text-xs font-medium mb-2 ${theme === "light" ? "text-gray-500" : "text-gray-500"}`}>
                    Webhook URL
                  </label>
                  <input
                    type="url"
                    value={formData.n8n_webhook}
                    onChange={(e) => setFormData({ ...formData, n8n_webhook: e.target.value })}
                    className={`w-full px-3 py-2 text-sm rounded-lg border ${
                      theme === "light"
                        ? "bg-white border-gray-200 text-gray-900 focus:border-purple-500"
                        : "bg-gray-950 border-gray-800 text-gray-200 focus:border-purple-500"
                    } focus:outline-none focus:ring-1 focus:ring-purple-500`}
                    placeholder="http://n8n:5678/webhook/..."
                  />
                </div>
              </div>

              {/* Schedule Section - Styled like Milestones */}
              {schedule.enabled && (
                <div className={`mb-6 rounded-lg ${
                  theme === "light" ? "bg-gray-50" : "bg-gray-900"
                }`}>
                  <div className={`flex items-center justify-between px-4 py-3 border-b ${
                    theme === "light" ? "border-gray-200" : "border-gray-800"
                  }`}>
                    <div className="flex items-center gap-2">
                      <Clock className={`w-4 h-4 ${theme === "light" ? "text-gray-600" : "text-gray-400"}`} />
                      <span className={`text-sm font-medium ${theme === "light" ? "text-gray-700" : "text-gray-300"}`}>
                        Schedule
                      </span>
                    </div>
                  </div>
                  <div className="p-4 grid grid-cols-1 md:grid-cols-3 gap-4">
                    {/* Date Picker */}
                    <div>
                      <label className={`block text-xs font-medium mb-2 ${theme === "light" ? "text-gray-600" : "text-gray-400"}`}>
                        Date
                      </label>
                      <input
                        type="date"
                        value={schedule.date}
                        onChange={(e) => setSchedule({ ...schedule, date: e.target.value })}
                        min={new Date().toISOString().split('T')[0]}
                        className={`w-full px-3 py-2 text-sm rounded-lg border ${
                          theme === "light"
                            ? "bg-white border-gray-200 text-gray-900 focus:border-purple-500"
                            : "bg-gray-950 border-gray-800 text-gray-200 focus:border-purple-500"
                        } focus:outline-none focus:ring-1 focus:ring-purple-500`}
                      />
                    </div>

                    {/* Time Picker */}
                    <div>
                      <label className={`block text-xs font-medium mb-2 ${theme === "light" ? "text-gray-600" : "text-gray-400"}`}>
                        Time
                      </label>
                      <input
                        type="time"
                        value={schedule.time}
                        onChange={(e) => setSchedule({ ...schedule, time: e.target.value })}
                        className={`w-full px-3 py-2 text-sm rounded-lg border ${
                          theme === "light"
                            ? "bg-white border-gray-200 text-gray-900 focus:border-purple-500"
                            : "bg-gray-950 border-gray-800 text-gray-200 focus:border-purple-500"
                        } focus:outline-none focus:ring-1 focus:ring-purple-500`}
                      />
                    </div>

                    {/* Frequency Select */}
                    <div>
                      <label className={`block text-xs font-medium mb-2 ${theme === "light" ? "text-gray-600" : "text-gray-400"}`}>
                        Frequency
                      </label>
                      <div className="relative" ref={frequencySelectRef}>
                        <button
                          onClick={() => setIsFrequencyOpen(!isFrequencyOpen)}
                          className={`w-full flex items-center gap-2 px-3 py-2 text-sm rounded-lg border ${
                            theme === "light"
                              ? "bg-white border-gray-200 text-gray-900 hover:border-gray-300"
                              : "bg-gray-950 border-gray-800 text-gray-200 hover:border-gray-700"
                          } focus:outline-none focus:ring-1 focus:ring-purple-500 transition-all duration-200 justify-between`}
                        >
                          <span>{selectedFrequency?.label}</span>
                          <ChevronDown 
                            className={`w-4 h-4 transition-transform duration-300 ${
                              isFrequencyOpen ? "rotate-180" : ""
                            }`} 
                          />
                        </button>
                        
                        {/* Frequency Dropdown */}
                        {isFrequencyOpen && (
                          <div
                            className={`absolute top-full left-0 mt-1 z-50 rounded-lg border shadow-lg overflow-hidden w-full ${
                              theme === "light"
                                ? "bg-white border-gray-200"
                                : "bg-gray-950 border-gray-800"
                            }`}
                          >
                            {frequencyOptions.map((option) => (
                              <button
                                key={option.value}
                                onClick={() => {
                                  setSchedule({ ...schedule, frequency: option.value as any });
                                  setIsFrequencyOpen(false);
                                }}
                                className={`w-full text-left px-3 py-2 text-sm transition-colors ${
                                  schedule.frequency === option.value
                                    ? theme === "light"
                                      ? "bg-purple-500 text-white"
                                      : "bg-purple-600 text-white"
                                    : theme === "light"
                                      ? "text-gray-900 hover:bg-gray-50"
                                      : "text-gray-300 hover:bg-gray-900"
                                }`}
                              >
                                {option.label}
                              </button>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Form Actions - Footer */}
              <div className={`flex items-center justify-end gap-3 mt-8 pt-6 border-t ${
                theme === "light" ? "border-gray-200" : "border-gray-800"
              }`}>
                <button
                  onClick={handleCancel}
                  className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                    theme === "light"
                      ? "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      : "bg-gray-900 text-gray-300 hover:bg-gray-800"
                  }`}
                >
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  className="px-4 py-2 text-sm font-medium rounded-lg bg-purple-600 hover:bg-purple-700 text-white transition-colors"
                >
                  {editingAgent ? "Update agent" : "Create agent"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
