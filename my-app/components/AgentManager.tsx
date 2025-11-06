"use client";

import { useState, useEffect } from "react";
import { 
  Play, 
  Pause, 
  RefreshCw, 
  Mail, 
  MessageCircle,
  FileText,
  Bot,
  CheckCircle2,
  XCircle,
  Clock,
  AlertCircle,
  ChevronDown,
  ChevronRight,
  MoreHorizontal,
} from "lucide-react";
// import { agentAPI } from "@/lib/api"; // API disabled for UI testing
import { Agent, AgentActionLog } from "@/lib/types";
import { getAgentGradient, getButtonClasses, getCardClasses } from "@/theme/theme";
import { useTheme } from "@/theme/ThemeContext";

// Mock data for testing UI
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
  {
    id: 4,
    user: 1,
    name: "Job Scraper",
    email: "automation@saasai.io",
    type: "SCRAPER",
    active: true,
    n8n_webhook: null,
    created_at: new Date().toISOString(),
  },
];

const MOCK_LOGS: AgentActionLog[] = [
  {
    id: 1,
    agent: 1,
    action: "Daily invoice summary sent",
    status: "SUCCESS",
    result: { users_processed: 15, emails_sent: 15 },
    created_at: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
  },
  {
    id: 2,
    agent: 1,
    action: "Manual trigger",
    status: "SUCCESS",
    result: { users_processed: 15 },
    created_at: new Date(Date.now() - 1000 * 60 * 120).toISOString(),
  },
  {
    id: 3,
    agent: 2,
    action: "Proposal generated for job #456",
    status: "SUCCESS",
    result: { proposal_id: 123 },
    created_at: new Date(Date.now() - 1000 * 60 * 45).toISOString(),
  },
  {
    id: 4,
    agent: 2,
    action: "Proposal generation failed",
    status: "FAILED",
    result: { error: "Resume not found" },
    created_at: new Date(Date.now() - 1000 * 60 * 90).toISOString(),
  },
  {
    id: 5,
    agent: 1,
    action: "Scheduled invoice summary",
    status: "PENDING",
    result: null,
    created_at: new Date(Date.now() - 1000 * 60 * 5).toISOString(),
  },
  {
    id: 6,
    agent: 3,
    action: "Payment reminder sent",
    status: "SUCCESS",
    result: { reminders_sent: 8 },
    created_at: new Date(Date.now() - 1000 * 60 * 60).toISOString(),
  },
];

export default function AgentManager() {
  const { theme } = useTheme();
  const [agents, setAgents] = useState<Agent[]>([]);
  const [logs, setLogs] = useState<AgentActionLog[]>([]);
  const [loading, setLoading] = useState(true);
  const [triggering, setTriggering] = useState<number | null>(null);
  const [expandedAgent, setExpandedAgent] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchAgents();
    fetchLogs();
  }, []);

  const fetchAgents = async () => {
    try {
      setLoading(true);
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));
      setAgents(MOCK_AGENTS);
      setError(null);
    } catch (err: any) {
      setError(err.message);
      console.error("Failed to fetch agents:", err);
    } finally {
      setLoading(false);
    }
  };

  const fetchLogs = async () => {
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 300));
      setLogs(MOCK_LOGS);
    } catch (err) {
      console.error("Failed to fetch logs:", err);
    }
  };

  const handleTriggerAgent = async (agentId: number) => {
    try {
      setTriggering(agentId);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Add a new log entry
      const newLog: AgentActionLog = {
        id: Date.now(),
        agent: agentId,
        action: "Manual trigger",
        status: "SUCCESS",
        result: { triggered_at: new Date().toISOString() },
        created_at: new Date().toISOString(),
      };
      setLogs([newLog, ...logs]);
      
      setTriggering(null);
    } catch (err: any) {
      alert(`Failed to trigger agent: ${err.message}`);
      setTriggering(null);
    }
  };

  const handleToggleAgent = async (agent: Agent) => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Update agent status
      setAgents(agents.map(a => 
        a.id === agent.id ? { ...a, active: !a.active } : a
      ));
    } catch (err: any) {
      alert(`Failed to toggle agent: ${err.message}`);
    }
  };

  const getAgentIcon = (type: string) => {
    const iconClass = `w-4 h-4 ${theme === "light" ? "text-gray-600" : "text-gray-500"}`;
    switch (type) {
      case "EMAIL":
      case "INVOICE_AUTOMATION":
        return <Mail className={iconClass} />;
      case "NOTIFIER":
        return <MessageCircle className={iconClass} />;
      case "PROPOSAL_GENERATOR":
        return <FileText className={iconClass} />;
      default:
        return <Bot className={iconClass} />;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "SUCCESS":
        return <CheckCircle2 className="w-4 h-4 text-green-500" />;
      case "FAILED":
        return <XCircle className="w-4 h-4 text-red-500" />;
      case "PENDING":
        return <Clock className="w-4 h-4 text-yellow-500" />;
      default:
        return <AlertCircle className="w-4 h-4 text-gray-500" />;
    }
  };

  const getAgentLogs = (agentId: number) => {
    return logs.filter(log => log.agent === agentId).slice(0, 5);
  };

  const getAgentDescription = (type: string) => {
    switch (type) {
      case "EMAIL":
        return "Sends automated email notifications";
      case "INVOICE_AUTOMATION":
        return "Daily invoice summaries with CSV reports via email & WhatsApp";
      case "NOTIFIER":
        return "Real-time notifications via multiple channels";
      case "PROPOSAL_GENERATOR":
        return "AI-powered proposal generation for job matches";
      case "SCRAPER":
        return "Automated data collection from external sources";
      default:
        return "Automation agent";
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <RefreshCw className="w-6 h-6 animate-spin text-gray-400" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-900/20 border border-red-800 rounded-lg p-4 text-red-400">
        <p className="font-semibold">Error loading agents</p>
        <p className="text-sm">{error}</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className={`text-lg font-semibold ${theme === "light" ? "text-black" : "text-white"}`}>Automation Agents</h2>
          <p className={`text-xs ${theme === "light" ? "text-gray-500" : "text-gray-500"} mt-0.5`}>
            {agents.length} {agents.length === 1 ? 'agent' : 'agents'}
          </p>
        </div>
        <button
          onClick={fetchAgents}
          className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${theme === "light" ? "hover:bg-gray-100 text-gray-600" : "hover:bg-gray-900 text-gray-400"}`}
        >
          <RefreshCw className="w-3.5 h-3.5" />
          Refresh
        </button>
      </div>

      {/* Agent Cards */}
      {agents.length === 0 ? (
        <div className={`${theme === "light" ? "bg-gray-50" : "bg-gray-950"} border ${theme === "light" ? "border-gray-200" : "border-gray-900"} rounded-md p-12 text-center`}>
          <Bot className={`w-12 h-12 mx-auto mb-3 ${theme === "light" ? "text-gray-400" : "text-gray-700"}`} />
          <h3 className={`text-sm font-medium ${theme === "light" ? "text-gray-700" : "text-gray-400"} mb-1`}>No agents configured</h3>
          <p className={`text-xs ${theme === "light" ? "text-gray-500" : "text-gray-600"}`}>
            Create your first automation agent to get started
          </p>
        </div>
      ) : (
        <div className="space-y-0">
          {agents.map((agent) => {
            const agentLogs = getAgentLogs(agent.id);
            const isExpanded = expandedAgent === agent.id;
            
            return (
              <div
                key={agent.id}
                className={`group border-b ${theme === "light" ? "border-gray-200 hover:bg-gray-50" : "border-gray-900 hover:bg-gray-950"} transition-colors`}
              >
                {/* Card Header */}
                <div className="px-4 py-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3 flex-1 min-w-0">
                      <div className={`w-8 h-8 rounded-md flex items-center justify-center flex-shrink-0 ${theme === "light" ? "bg-gray-100" : "bg-gray-900"}`}>
                        {getAgentIcon(agent.type)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <h3 className={`text-sm font-medium ${theme === "light" ? "text-gray-900" : "text-gray-200"} truncate`}>{agent.name}</h3>
                          <span className={`flex-shrink-0 w-1.5 h-1.5 rounded-full ${agent.active ? "bg-green-500" : "bg-gray-500"}`} />
                        </div>
                        <p className={`text-xs ${theme === "light" ? "text-gray-500" : "text-gray-500"} truncate`}>{agent.email}</p>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button
                        onClick={() => handleTriggerAgent(agent.id)}
                        disabled={!agent.active || !agent.n8n_webhook || triggering === agent.id}
                        className={`p-1.5 rounded-md text-xs font-medium transition-colors ${
                          !agent.active || !agent.n8n_webhook || triggering === agent.id
                            ? "text-gray-600 cursor-not-allowed"
                            : theme === "light" ? "hover:bg-gray-200 text-gray-700" : "hover:bg-gray-800 text-gray-300"
                        }`}
                        title="Trigger agent"
                      >
                        {triggering === agent.id ? (
                          <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                        ) : (
                          <Play className="w-3.5 h-3.5" />
                        )}
                      </button>
                      
                      <button
                        onClick={() => handleToggleAgent(agent)}
                        className={`p-1.5 rounded-md text-xs font-medium transition-colors ${
                          theme === "light" ? "hover:bg-gray-200 text-gray-700" : "hover:bg-gray-800 text-gray-300"
                        }`}
                        title={agent.active ? "Pause agent" : "Activate agent"}
                      >
                        {agent.active ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                      </button>
                      
                      <button
                        onClick={() => setExpandedAgent(isExpanded ? null : agent.id)}
                        className={`p-1.5 rounded-md text-xs font-medium transition-colors ${
                          theme === "light" ? "hover:bg-gray-200 text-gray-700" : "hover:bg-gray-800 text-gray-300"
                        }`}
                        title="View logs"
                      >
                        <MoreHorizontal className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Recent Logs */}
                {isExpanded && agentLogs.length > 0 && (
                  <div className={`px-4 pb-3 border-t ${theme === "light" ? "border-gray-200" : "border-gray-900"}`}>
                    <div className="pt-3 space-y-1.5">
                      {agentLogs.map((log) => (
                        <div
                          key={log.id}
                          className={`flex items-center gap-2 px-2 py-1.5 rounded text-xs ${
                            theme === "light" ? "hover:bg-gray-100" : "hover:bg-gray-900"
                          }`}
                        >
                          <div className={`w-1 h-1 rounded-full flex-shrink-0 ${
                            log.status === "SUCCESS" ? "bg-green-500" : 
                            log.status === "FAILED" ? "bg-red-500" : 
                            "bg-yellow-500"
                          }`} />
                          <span className={`flex-1 truncate ${theme === "light" ? "text-gray-700" : "text-gray-400"}`}>
                            {log.action}
                          </span>
                          <span className={`text-xs ${theme === "light" ? "text-gray-500" : "text-gray-600"}`}>
                            {new Date(log.created_at).toLocaleTimeString()}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

