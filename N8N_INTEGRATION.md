# N8N Automation Integration Guide

## Overview

This SaaS tracker application is integrated with n8n automation workflows to provide intelligent automation for invoice management and proposal generation. The integration allows you to trigger automated workflows directly from the dashboard.

## Workflows

### 1. Invoice Summary Automation

**Purpose**: Automatically sends daily invoice summaries to users via email and WhatsApp.

**Workflow Steps**:
1. **Schedule Trigger**: Runs daily at 9:00 AM
2. **Admin Login**: Authenticates with the backend API
3. **Get All Users**: Fetches all users from the system
4. **Split Users**: Processes users one by one
5. **Get User Invoices**: Retrieves invoices for each user
6. **Compute Summary**: Calculates invoice statistics (paid, pending, overdue)
7. **Prep CSV Rows**: Prepares invoice data for CSV export
8. **Spreadsheet File (CSV)**: Generates CSV file with invoice details
9. **Send Email (with CSV)**: Sends summary email with CSV attachment
10. **Send WhatsApp**: Sends WhatsApp notification with top 3 overdue invoices
11. **Next User**: Loops to process the next user

**Features**:
- Counts invoices by status (Paid, Pending, Overdue)
- Identifies top 3 overdue invoices by due date
- Generates CSV file with all invoice details
- Sends HTML-formatted email with summary table
- Sends WhatsApp message with brief summary

**Sample Email Content**:
```html
Daily Invoice Summary — [date]

Dear [User Name],

Please find below the summary of your invoices. A CSV file is attached with full details.

Status    | Count
----------|------
Paid      | X
Pending   | Y
Overdue   | Z
Total     | N

Top 3 Overdue Clients
- Client A — $500 MAD — Due 2025-01-15
- Client B — $300 MAD — Due 2025-01-20
- Client C — $200 MAD — Due 2025-01-25
```

### 2. Proposal Generation Automation

**Purpose**: Generates AI-powered proposals for job matches and notifies users.

**Workflow Steps**:
1. **Webhook Trigger**: Receives POST request at `/proposal_trigger`
2. **Generate Proposal**: Calls backend API to generate AI proposal
3. **Send Email**: Sends proposal to user via email
4. **Send WhatsApp**: Sends proposal to user via WhatsApp

**Features**:
- AI-generated personalized proposals
- Automatic email notification
- WhatsApp notification with proposal text
- Integrates with resume and job matching system

**Webhook Payload**:
```json
{
  "resume_id": 123,
  "job_id": 456,
  "email": "user@example.com",
  "phone": "+1234567890"
}
```

## Backend Integration

### Agent Model

The backend uses an `Agent` model to manage automation agents:

```python
class Agent(models.Model):
    user = ForeignKey(User)
    name = CharField(max_length=100)
    email = EmailField()
    type = CharField(choices=["EMAIL", "SCRAPER", "NOTIFIER"])
    active = BooleanField(default=True)
    n8n_webhook = URLField(blank=True, null=True)
    created_at = DateTimeField(auto_now_add=True)
```

### Agent Action Log

All agent actions are logged for monitoring:

```python
class AgentActionLog(models.Model):
    agent = ForeignKey(Agent)
    action = CharField(max_length=200)
    status = CharField(choices=["PENDING", "SUCCESS", "FAILED"])
    result = JSONField(blank=True, null=True)
    created_at = DateTimeField(auto_now_add=True)
```

### API Endpoints

#### List/Create Agents
```
GET  /api/agents/          # List all agents
POST /api/agents/          # Create new agent (admin only)
```

#### Agent Details
```
GET    /api/agents/{id}/   # Get agent details
PATCH  /api/agents/{id}/   # Update agent
DELETE /api/agents/{id}/   # Delete agent
```

#### Trigger Agent
```
POST /api/agents/{id}/trigger/
```

Payload:
```json
{
  "action": "manual_trigger",
  "resume_id": 123,
  "job_id": 456
}
```

Response:
```json
{
  "message": "Agent 'Invoice Automation' triggered.",
  "status": "SUCCESS",
  "n8n_status": 200
}
```

#### Agent Logs
```
GET /api/agents/logs/         # All logs (admin only)
GET /api/agents/logs/{id}/    # Specific log
```

## Frontend Integration

### TypeScript Types

```typescript
interface Agent {
  id: number;
  user: number;
  name: string;
  email: string;
  type: AgentType;
  active: boolean;
  n8n_webhook: string | null;
  created_at: string;
}

interface AgentActionLog {
  id: number;
  agent: number;
  action: string;
  status: "PENDING" | "SUCCESS" | "FAILED";
  result: any;
  created_at: string;
}
```

### Agent Manager Component

The `AgentManager` component provides a UI for:
- Viewing all configured agents
- Triggering agents manually
- Enabling/disabling agents
- Viewing recent activity logs
- Monitoring agent status

**Features**:
- Real-time status updates
- Color-coded agent types
- Expandable activity logs
- One-click agent triggering
- Active/Inactive toggle

### Dashboard Integration

The agents are accessible from the main dashboard through the "Agents" tab:
1. Navigate to Dashboard
2. Click on "Agents" tab
3. View all configured automation agents
4. Click "Trigger Now" to manually run an agent
5. Toggle active/inactive status
6. View recent activity logs

## Environment Variables

### Backend (.env)
```bash
# N8N Configuration (if self-hosting)
N8N_URL=http://n8n:5678
N8N_API_KEY=your_api_key

# WhatsApp Business API
WHATSAPP_PHONE_ID=your_phone_id
WHATSAPP_TOKEN=your_access_token

# Email Configuration
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_HOST_USER=automation@saasai.io
EMAIL_HOST_PASSWORD=your_password
```

### Frontend (.env.local)
```bash
NEXT_PUBLIC_API_URL=http://localhost:8000/api
```

## Setup Instructions

### 1. Backend Setup

1. Install dependencies:
```bash
cd back-end
pip install -r requirements.txt
```

2. Run migrations:
```bash
python manage.py migrate
```

3. Create automation user:
```bash
python manage.py createsuperuser
# Email: automation@saasai.io
# Password: Qwerty123456789@
```

### 2. N8N Setup

1. Import the workflow:
```bash
# Copy n8n.json to n8n workflows directory
# Or import through n8n UI
```

2. Configure credentials:
- Set up WhatsApp Business API credentials
- Configure email SMTP settings
- Set backend URL environment variable

3. Activate workflows:
- Enable "Invoice Summary Automation"
- Enable "Proposal Generation"

4. Get webhook URLs:
- Copy webhook URL from "Webhook Trigger" node
- Store in Agent model's `n8n_webhook` field

### 3. Frontend Setup

1. Install dependencies:
```bash
cd my-app
pnpm install
```

2. Configure API URL:
```bash
echo "NEXT_PUBLIC_API_URL=http://localhost:8000/api" > .env.local
```

3. Run development server:
```bash
pnpm dev
```

### 4. Create Agents

#### Via Django Admin:
1. Go to http://localhost:8000/admin
2. Navigate to Agents
3. Click "Add Agent"
4. Fill in details:
   - Name: "Invoice Automation"
   - Email: automation@saasai.io
   - Type: EMAIL
   - Active: Yes
   - N8N Webhook: [webhook URL from n8n]

#### Via API:
```bash
curl -X POST http://localhost:8000/api/agents/ \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Invoice Automation",
    "email": "automation@saasai.io",
    "type": "EMAIL",
    "active": true,
    "n8n_webhook": "http://n8n:5678/webhook/proposal_trigger"
  }'
```

## Usage Examples

### Manually Trigger Invoice Summary

```typescript
import { agentAPI } from '@/lib/api';

// Trigger agent
const response = await agentAPI.trigger(agentId, {
  action: "manual_invoice_summary"
});

console.log(response.message); // "Agent triggered successfully"
```

### Generate Proposal

```typescript
// Trigger proposal generation agent
const response = await agentAPI.trigger(proposalAgentId, {
  action: "generate_proposal",
  resume_id: 123,
  job_id: 456,
  email: "user@example.com",
  phone: "+1234567890"
});
```

### View Agent Logs

```typescript
// Get all logs for an agent
const logs = await agentAPI.getAgentLogs(agentId);

logs.forEach(log => {
  console.log(`${log.action}: ${log.status} at ${log.created_at}`);
});
```

## Monitoring & Troubleshooting

### Check Agent Status

1. Go to Dashboard → Agents tab
2. Check agent status badges (Active/Inactive)
3. Expand "Recent Activity" to see logs
4. Look for SUCCESS/FAILED status

### Common Issues

#### Agent Not Triggering
- Verify webhook URL is correct
- Check agent is active
- Verify n8n workflow is activated
- Check network connectivity

#### Email Not Sending
- Verify SMTP credentials
- Check email host/port settings
- Verify sender email is authorized

#### WhatsApp Not Sending
- Verify WhatsApp Business API credentials
- Check phone number format
- Verify WhatsApp token is valid

#### Failed Status
- Check agent logs in dashboard
- Review error messages in `result` field
- Verify backend API is running
- Check n8n workflow execution logs

### Debug Mode

Enable detailed logging in Django settings:

```python
LOGGING = {
    'version': 1,
    'handlers': {
        'console': {
            'class': 'logging.StreamHandler',
        },
    },
    'loggers': {
        'apps.agents': {
            'handlers': ['console'],
            'level': 'DEBUG',
        },
    },
}
```

## Best Practices

1. **Testing**: Always test workflows in n8n test mode before activating
2. **Error Handling**: Check agent logs regularly for failed actions
3. **Rate Limiting**: Be mindful of API rate limits for WhatsApp/Email
4. **Security**: Never commit webhook URLs or API keys to version control
5. **Monitoring**: Set up alerts for failed agent actions
6. **Backup**: Regularly export n8n workflows for backup

## Future Enhancements

- [ ] Add more agent types (SMS, Slack, Discord)
- [ ] Implement retry logic for failed actions
- [ ] Add scheduling UI in dashboard
- [ ] Create agent templates
- [ ] Add webhook security (HMAC signatures)
- [ ] Implement rate limiting
- [ ] Add notification preferences per user
- [ ] Create agent analytics dashboard

## Support

For issues or questions:
- Check agent logs in dashboard
- Review n8n workflow execution history
- Check Django logs
- Contact: automation@saasai.io

