import { 
  Agent, 
  AgentActionLog, 
  CreateAgentData, 
  TriggerAgentData,
  APIResponse
} from './types';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';

// Helper function to get auth token from localStorage
const getAuthToken = (): string | null => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('access_token');
  }
  return null;
};

// Helper function to create headers
const getHeaders = (): HeadersInit => {
  const token = getAuthToken();
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
  };
  
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  
  return headers;
};

// Agent API Functions
export const agentAPI = {
  // Get all agents
  getAll: async (): Promise<Agent[]> => {
    const response = await fetch(`${API_BASE_URL}/agents/`, {
      method: 'GET',
      headers: getHeaders(),
    });
    
    if (!response.ok) {
      throw new Error('Failed to fetch agents');
    }
    
    const data = await response.json();
    return data.results || data;
  },

  // Get single agent
  getById: async (id: number): Promise<Agent> => {
    const response = await fetch(`${API_BASE_URL}/agents/${id}/`, {
      method: 'GET',
      headers: getHeaders(),
    });
    
    if (!response.ok) {
      throw new Error('Failed to fetch agent');
    }
    
    return response.json();
  },

  // Create new agent
  create: async (data: CreateAgentData): Promise<Agent> => {
    const response = await fetch(`${API_BASE_URL}/agents/`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify(data),
    });
    
    if (!response.ok) {
      throw new Error('Failed to create agent');
    }
    
    return response.json();
  },

  // Update agent
  update: async (id: number, data: Partial<CreateAgentData>): Promise<Agent> => {
    const response = await fetch(`${API_BASE_URL}/agents/${id}/`, {
      method: 'PATCH',
      headers: getHeaders(),
      body: JSON.stringify(data),
    });
    
    if (!response.ok) {
      throw new Error('Failed to update agent');
    }
    
    return response.json();
  },

  // Delete agent
  delete: async (id: number): Promise<void> => {
    const response = await fetch(`${API_BASE_URL}/agents/${id}/`, {
      method: 'DELETE',
      headers: getHeaders(),
    });
    
    if (!response.ok) {
      throw new Error('Failed to delete agent');
    }
  },

  // Trigger agent workflow
  trigger: async (id: number, data: TriggerAgentData = {}): Promise<any> => {
    const response = await fetch(`${API_BASE_URL}/agents/${id}/trigger/`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify(data),
    });
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to trigger agent');
    }
    
    return response.json();
  },

  // Get agent logs
  getLogs: async (): Promise<AgentActionLog[]> => {
    const response = await fetch(`${API_BASE_URL}/agents/logs/`, {
      method: 'GET',
      headers: getHeaders(),
    });
    
    if (!response.ok) {
      throw new Error('Failed to fetch agent logs');
    }
    
    const data = await response.json();
    return data.results || data;
  },

  // Get logs for specific agent
  getAgentLogs: async (agentId: number): Promise<AgentActionLog[]> => {
    const allLogs = await agentAPI.getLogs();
    return allLogs.filter(log => log.agent === agentId);
  },
};

// Invoice API Functions
export const invoiceAPI = {
  getAll: async (userId?: number): Promise<any[]> => {
    const url = userId 
      ? `${API_BASE_URL}/invoices/?user_id=${userId}`
      : `${API_BASE_URL}/invoices/`;
    
    const response = await fetch(url, {
      method: 'GET',
      headers: getHeaders(),
    });
    
    if (!response.ok) {
      throw new Error('Failed to fetch invoices');
    }
    
    const data = await response.json();
    return data.results || data;
  },
};

// User API Functions
export const userAPI = {
  getAll: async (): Promise<any[]> => {
    const response = await fetch(`${API_BASE_URL}/users/`, {
      method: 'GET',
      headers: getHeaders(),
    });
    
    if (!response.ok) {
      throw new Error('Failed to fetch users');
    }
    
    const data = await response.json();
    return data.results || data;
  },

  getCurrent: async (): Promise<any> => {
    const response = await fetch(`${API_BASE_URL}/users/me/`, {
      method: 'GET',
      headers: getHeaders(),
    });
    
    if (!response.ok) {
      throw new Error('Failed to fetch current user');
    }
    
    return response.json();
  },
};

// Auth API Functions
export const authAPI = {
  login: async (email: string, password: string): Promise<{ access: string; refresh: string }> => {
    const response = await fetch(`${API_BASE_URL}/token/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });
    
    if (!response.ok) {
      throw new Error('Login failed');
    }
    
    const data = await response.json();
    
    // Store tokens
    if (typeof window !== 'undefined') {
      localStorage.setItem('access_token', data.access);
      localStorage.setItem('refresh_token', data.refresh);
    }
    
    return data;
  },

  logout: () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('access_token');
      localStorage.removeItem('refresh_token');
    }
  },
};

// Proposal API Functions
export const proposalAPI = {
  generate: async (resumeId: number, jobId: number): Promise<any> => {
    const response = await fetch(`${API_BASE_URL}/proposals/generate/`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify({ resume_id: resumeId, job_id: jobId }),
    });
    
    if (!response.ok) {
      throw new Error('Failed to generate proposal');
    }
    
    return response.json();
  },
};

// Job API Functions
import { JobPosting, JobMatch, APIResponse } from './types';

export const jobAPI = {
  // Get all jobs
  getAll: async (params?: {
    skills?: string;
    remote?: boolean;
    min_budget?: number;
    source?: string;
  }): Promise<JobPosting[]> => {
    const queryParams = new URLSearchParams();
    if (params?.skills) queryParams.append('skills', params.skills);
    if (params?.remote !== undefined) queryParams.append('remote', String(params.remote));
    if (params?.min_budget) queryParams.append('min_budget', String(params.min_budget));
    if (params?.source) queryParams.append('source', params.source);

    const url = `${API_BASE_URL}/jobs/jobs/${queryParams.toString() ? `?${queryParams}` : ''}`;
    const response = await fetch(url, {
      method: 'GET',
      headers: getHeaders(),
    });
    
    if (!response.ok) {
      throw new Error('Failed to fetch jobs');
    }
    
    const data: APIResponse<JobPosting> | JobPosting[] = await response.json();
    return Array.isArray(data) ? data : (data.results || []);
  },

  // Get job matches for current user
  getMatches: async (): Promise<JobMatch[]> => {
    const response = await fetch(`${API_BASE_URL}/jobs/matches/`, {
      method: 'GET',
      headers: getHeaders(),
    });
    
    if (!response.ok) {
      throw new Error('Failed to fetch job matches');
    }
    
    const data: APIResponse<JobMatch> | JobMatch[] = await response.json();
    return Array.isArray(data) ? data : (data.results || []);
  },

  // Refresh matches for current user
  refreshMatches: async (): Promise<{ updated: number }> => {
    const response = await fetch(`${API_BASE_URL}/jobs/matches/refresh/`, {
      method: 'POST',
      headers: getHeaders(),
    });
    
    if (!response.ok) {
      throw new Error('Failed to refresh matches');
    }
    
    return response.json();
  },
};

