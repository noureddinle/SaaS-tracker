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
} from "lucide-react";
// import { agentAPI } from "@/lib/api"; // API disabled for UI testing
import { Agent, AgentActionLog } from "@/lib/types";
import { theme, getAgentGradient, getButtonClasses, getCardClasses } from "@/lib/theme";

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
    switch (type) {
      case "EMAIL":
      case "INVOICE_AUTOMATION":
        return <Mail className="w-5 h-5" />;
      case "NOTIFIER":
        return <MessageCircle className="w-5 h-5" />;
      case "PROPOSAL_GENERATOR":
        return <FileText className="w-5 h-5" />;
      default:
        return <Bot className="w-5 h-5" />;
    }
  };

  // Removed - now using theme.getAgentGradient()

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
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className={`${theme.typography.h2} ${theme.colors.text.primary}`}>Automation Agents</h2>
          <p className={`${theme.typography.body} ${theme.colors.text.tertiary} mt-1`}>
            Manage and monitor your n8n automation workflows
          </p>
        </div>
        <button
          onClick={fetchAgents}
          className={`flex items-center gap-2 ${getButtonClasses('secondary')}`}
        >
          <RefreshCw className="w-4 h-4" />
          Refresh
        </button>
      </div>

      {/* Agent Cards */}
      {agents.length === 0 ? (
        <div className="bg-black border border-gray-100 rounded-lg p-12 text-center">
          <Bot className="w-16 h-16 text-gray-600 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-400 mb-2">No agents configured</h3>
          <p className="text-sm text-gray-500">
            Create your first automation agent to get started
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {agents.map((agent) => {
            const agentLogs = getAgentLogs(agent.id);
            const isExpanded = expandedAgent === agent.id;
            
            return (
              <div
                key={agent.id}
                className={getCardClasses()}
              >
                {/* Card Header */}
                <div className={theme.spacing.md}>
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className={`w-12 h-12 ${theme.rounded.lg} bg-gradient-to-br ${getAgentGradient(agent.type)} flex items-center justify-center text-white`}>
                        {getAgentIcon(agent.type)}
                      </div>
                      <div>
                        <h3 className={`${theme.typography.h4} ${theme.colors.text.primary}`}>{agent.name}</h3>
                        <p className={`${theme.typography.small} ${theme.colors.text.tertiary}`}>{getAgentDescription(agent.type)}</p>
                      </div>
                    </div>
                    
                    {/* Status Badge */}
                    <div className={`px-2.5 py-1 ${theme.rounded.full} ${theme.typography.small} font-medium ${
                      agent.active 
                        ? `${theme.colors.status.success.bg} ${theme.colors.status.success.text}` 
                        : `${theme.colors.status.inactive.bg} ${theme.colors.status.inactive.text}`
                    }`}>
                      {agent.active ? "Active" : "Inactive"}
                    </div>
                  </div>

                  {/* Agent Details */}
                  <div className={`space-y-2 ${theme.typography.body} mb-4`}>
                    <div className={`flex items-center gap-2 ${theme.colors.text.tertiary}`}>
                      <Mail className="w-4 h-4" />
                      <span>{agent.email}</span>
                    </div>
                    <div className={`flex items-center gap-2 ${theme.colors.text.tertiary}`}>
                      <Bot className="w-4 h-4" />
                      <span className={`${theme.typography.small} font-mono ${theme.colors.background.tertiary} px-2 py-0.5 ${theme.rounded.sm}`}>
                        {agent.type}
                      </span>
                    </div>
                    {agent.n8n_webhook && (
                      <div className={`flex items-center gap-2 ${theme.colors.text.tertiary}`}>
                        <CheckCircle2 className={`w-4 h-4 ${theme.colors.status.success.text}`} />
                        <span className={theme.typography.small}>Webhook configured</span>
                      </div>
                    )}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleTriggerAgent(agent.id)}
                      disabled={!agent.active || !agent.n8n_webhook || triggering === agent.id}
                      className={`flex-1 flex items-center justify-center gap-2 ${getButtonClasses('primary')} disabled:bg-gray-800 disabled:text-gray-500 disabled:cursor-not-allowed`}
                    >
                      {triggering === agent.id ? (
                        <>
                          <RefreshCw className="w-4 h-4 animate-spin" />
                          Triggering...
                        </>
                      ) : (
                        <>
                          <Play className="w-4 h-4" />
                          Trigger Now
                        </>
                      )}
                    </button>
                    
                    <button
                      onClick={() => handleToggleAgent(agent)}
                      className={`px-4 py-2.5 ${theme.rounded.lg} ${theme.typography.body} font-medium ${theme.transition.normal} ${
                        agent.active
                          ? `${theme.colors.status.warning.bg} hover:bg-yellow-600/30 ${theme.colors.status.warning.text}`
                          : `${theme.colors.status.success.bg} hover:bg-green-600/30 ${theme.colors.status.success.text}`
                      }`}
                    >
                      {agent.active ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                {/* Recent Logs */}
                {agentLogs.length > 0 && (
                  <div className={`border-t ${theme.colors.border.primary}`}>
                    <button
                      onClick={() => setExpandedAgent(isExpanded ? null : agent.id)}
                      className={`w-full px-6 py-3 flex items-center justify-between ${theme.colors.background.hover} ${theme.transition.normal}`}
                    >
                      <span className={`${theme.typography.body} font-medium ${theme.colors.text.tertiary}`}>
                        Recent Activity ({agentLogs.length})
                      </span>
                      {isExpanded ? (
                        <ChevronDown className={`w-4 h-4 ${theme.colors.text.tertiary}`} />
                      ) : (
                        <ChevronRight className={`w-4 h-4 ${theme.colors.text.tertiary}`} />
                      )}
                    </button>
                    
                    {isExpanded && (
                      <div className="px-6 pb-4 space-y-2">
                        {agentLogs.map((log) => (
                          <div
                            key={log.id}
                            className={`flex items-start gap-3 p-3 ${theme.colors.background.secondary} ${theme.rounded.lg}`}
                          >
                            {getStatusIcon(log.status)}
                            <div className="flex-1 min-w-0">
                              <p className={`${theme.typography.body} font-medium ${theme.colors.text.secondary}`}>{log.action}</p>
                              <p className={`${theme.typography.small} ${theme.colors.text.muted} mt-0.5`}>
                                {new Date(log.created_at).toLocaleString()}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
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

