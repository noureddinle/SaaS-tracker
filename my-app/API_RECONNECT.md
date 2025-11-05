# How to Reconnect API

The AgentManager component is currently using mock data for UI testing. To reconnect the API:

## Quick Steps

### 1. Open `components/AgentManager.tsx`

### 2. Uncomment the API import (line 19):
```typescript
// Before:
// import { agentAPI } from "@/lib/api"; // API disabled for UI testing

// After:
import { agentAPI } from "@/lib/api";
```

### 3. Replace mock data calls with API calls:

**In `fetchAgents()` function:**
```typescript
// Replace:
await new Promise(resolve => setTimeout(resolve, 500));
setAgents(MOCK_AGENTS);

// With:
const data = await agentAPI.getAll();
setAgents(data);
```

**In `fetchLogs()` function:**
```typescript
// Replace:
await new Promise(resolve => setTimeout(resolve, 300));
setLogs(MOCK_LOGS);

// With:
const data = await agentAPI.getLogs();
setLogs(data.slice(0, 20));
```

**In `handleTriggerAgent()` function:**
```typescript
// Replace all the mock code with:
setTriggering(agentId);
await agentAPI.trigger(agentId, { action: "manual_trigger" });

setTimeout(() => {
  fetchLogs();
  setTriggering(null);
}, 1000);
```

**In `handleToggleAgent()` function:**
```typescript
// Replace:
await new Promise(resolve => setTimeout(resolve, 500));
setAgents(agents.map(a => 
  a.id === agent.id ? { ...a, active: !a.active } : a
));

// With:
await agentAPI.update(agent.id, { active: !agent.active });
fetchAgents();
```

### 4. Optional: Remove or comment out mock data
You can delete or comment out the `MOCK_AGENTS` and `MOCK_LOGS` constants at the top of the file once the API is connected.

## Current Mock Data

The component currently displays:
- **4 agents**: Invoice Summary, Proposal Generator, Payment Reminder (inactive), Job Scraper (no webhook)
- **6 log entries**: Mix of SUCCESS, FAILED, and PENDING statuses
- All interactions work with simulated delays to mimic real API calls

## Features Working in Mock Mode

✅ View agents with color-coded types
✅ Trigger agents (adds new log entry)
✅ Toggle active/inactive status
✅ Expand/collapse activity logs
✅ Refresh functionality
✅ Loading states
✅ Error handling (UI structure ready)

## When API is Ready

Make sure your backend is running at `http://localhost:8000` and you have:
1. Created the automation user
2. Set up agents in the database
3. Configured n8n webhooks
4. Valid authentication token in localStorage

Then follow the steps above to reconnect!

