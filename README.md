# SaaS Tracker - Intelligent Automation Platform

A comprehensive SaaS tracking and automation platform with AI-powered agents, invoice management, job matching, and proposal generation.

## 🚀 Features

### Core Features
- **Invoice Management**: Track and manage invoices with status (Paid, Pending, Overdue)
- **User Management**: Multi-user support with authentication
- **Job Matching**: AI-powered job matching with resume analysis
- **Proposal Generation**: Automated AI proposal generation for job applications
- **Document Management**: Resume and document storage with embeddings

### Automation Features (n8n Integration)
- **Invoice Summary Agent**: Daily automated invoice summaries via email & WhatsApp
- **Proposal Generator Agent**: AI-powered proposal generation with notifications
- **Agent Dashboard**: Visual interface to manage and trigger automation workflows
- **Activity Logging**: Complete audit trail of all automation actions

### UI Pages
- **Dashboard**: Main control center with issues and agents
- **Inbox**: Notification center
- **Projects**: Project management with empty state
- **Import/Export**: Data migration tools with integrations (Asana, Jira, GitHub, Shortcut)
- **Agents**: Automation workflow management

## 🏗️ Architecture

### Backend (Django REST Framework)
- Python 3.11+
- Django 4.x
- PostgreSQL database
- Celery for async tasks
- JWT authentication
- OpenAI integration for AI features

### Frontend (Next.js)
- Next.js 14+ with App Router
- TypeScript
- TailwindCSS for styling
- Lucide React icons
- React Icons for brand icons

### Automation (n8n)
- Workflow automation platform
- Webhook-based triggers
- Email and WhatsApp integrations
- CSV generation and reporting

## 📦 Project Structure

```
SaaS-tracker/
├── back-end/
│   ├── apps/
│   │   ├── agents/          # Automation agents
│   │   ├── invoices/        # Invoice management
│   │   ├── jobs/            # Job scraping & matching
│   │   ├── proposals/       # AI proposal generation
│   │   ├── resumes/         # Resume management
│   │   └── users/           # User management
│   ├── core/
│   │   ├── settings.py      # Django configuration
│   │   ├── celery.py        # Celery configuration
│   │   └── ai.py            # OpenAI integration
│   └── requirements.txt
├── my-app/
│   ├── app/
│   │   ├── dashboard/       # Main dashboard
│   │   ├── inbox/           # Inbox page
│   │   ├── projects/        # Projects page
│   │   ├── import-export/   # Data import/export
│   │   └── auth/            # Authentication
│   ├── components/
│   │   ├── AgentManager.tsx # Agent management UI
│   │   ├── Auth-Modal.tsx   # Authentication modal
│   │   └── ...              # Other components
│   └── lib/
│       ├── api.ts           # API client
│       └── types.ts         # TypeScript types
├── n8n.json                 # n8n workflow definition
├── agents.example.json      # Agent configuration examples
├── N8N_INTEGRATION.md       # Detailed n8n documentation
├── docker-compose.yml       # Docker orchestration
└── README.md
```

## 🚦 Getting Started

### Prerequisites
- Python 3.11+
- Node.js 18+
- PostgreSQL 14+
- Docker & Docker Compose (optional)
- n8n instance (for automation)

### Backend Setup

1. **Clone the repository**
```bash
git clone <repository-url>
cd SaaS-tracker
```

2. **Set up Python environment**
```bash
cd back-end
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
```

3. **Configure environment variables**
```bash
cp .env.example .env
# Edit .env with your settings
```

4. **Run migrations**
```bash
python manage.py migrate
```

5. **Create superuser**
```bash
python manage.py createsuperuser
```

6. **Create automation user**
```bash
python manage.py shell
>>> from django.contrib.auth import get_user_model
>>> User = get_user_model()
>>> User.objects.create_user(
...     email='automation@saasai.io',
...     password='Qwerty123456789@',
...     is_staff=True
... )
```

7. **Run development server**
```bash
python manage.py runserver
```

Backend will be available at `http://localhost:8000`

### Frontend Setup

1. **Navigate to frontend directory**
```bash
cd my-app
```

2. **Install dependencies**
```bash
pnpm install
# or: npm install
# or: yarn install
```

3. **Configure environment**
```bash
echo "NEXT_PUBLIC_API_URL=http://localhost:8000/api" > .env.local
```

4. **Run development server**
```bash
pnpm dev
```

Frontend will be available at `http://localhost:3000`

### n8n Setup (Optional but Recommended)

1. **Using Docker Compose**
```bash
docker-compose up -d
```

2. **Import workflows**
- Access n8n at `http://localhost:5678`
- Import `n8n.json` workflow
- Configure credentials (WhatsApp, Email, Backend API)

3. **Configure agents in dashboard**
- Go to Dashboard → Agents tab
- Add webhook URLs from n8n workflows
- Test agent triggers

For detailed n8n setup instructions, see [N8N_INTEGRATION.md](./N8N_INTEGRATION.md)

## 🎯 Usage

### Creating an Agent

#### Via Dashboard:
1. Navigate to Dashboard
2. Click "Agents" tab
3. Create new agent with webhook URL

#### Via API:
```bash
curl -X POST http://localhost:8000/api/agents/ \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Invoice Automation",
    "email": "your_email",
    "type": "EMAIL",
    "active": true,
    "n8n_webhook": "http://n8n:5678/webhook/invoice_summary"
  }'
```

### Triggering Agents

#### Via Dashboard:
1. Go to Dashboard → Agents
2. Find your agent
3. Click "Trigger Now" button

#### Via API:
```bash
curl -X POST http://localhost:8000/api/agents/1/trigger/ \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "action": "manual_trigger"
  }'
```

### Monitoring Agents

1. Go to Dashboard → Agents
2. Expand "Recent Activity" on any agent card
3. View status (SUCCESS, FAILED, PENDING)
4. Check detailed logs for troubleshooting

## 🔧 API Endpoints

### Authentication
```
POST /api/token/              # Get JWT tokens
POST /api/token/refresh/      # Refresh token
```

### Users
```
GET  /api/users/              # List users
GET  /api/users/me/           # Current user
```

### Agents
```
GET    /api/agents/           # List agents
POST   /api/agents/           # Create agent (admin)
GET    /api/agents/{id}/      # Get agent details
PATCH  /api/agents/{id}/      # Update agent
DELETE /api/agents/{id}/      # Delete agent
POST   /api/agents/{id}/trigger/  # Trigger agent
```

### Agent Logs
```
GET /api/agents/logs/         # All logs (admin)
GET /api/agents/logs/{id}/    # Specific log
```

### Invoices
```
GET  /api/invoices/           # List invoices
POST /api/invoices/           # Create invoice
GET  /api/invoices/{id}/      # Get invoice
```

### Proposals
```
POST /api/proposals/generate/ # Generate AI proposal
```

## 🎨 UI Features

### Dashboard
- **Issues View**: Kanban-style issue tracking
- **Agents View**: Visual agent management with cards
- **Tabs**: All Issues, Active, Backlog, Agents

### Agent Manager
- Color-coded agent types
- Real-time status indicators
- One-click agent triggering
- Expandable activity logs
- Active/Inactive toggle

### Pages
- **Inbox**: Clean empty state for notifications
- **Projects**: Empty state with create button
- **Import/Export**: Integration cards for Asana, Jira, GitHub, Shortcut

## 🔐 Security

- JWT-based authentication
- Admin-only agent creation
- Webhook URL validation
- Action logging for audit trails
- CORS configuration
- Environment variable protection

## 📊 Agent Types

| Type | Description | Features |
|------|-------------|----------|
| **EMAIL** | Email automation | SMTP integration, HTML templates |
| **NOTIFIER** | Multi-channel notifications | Email, WhatsApp, SMS |
| **PROPOSAL_GENERATOR** | AI proposal generation | OpenAI integration, job matching |
| **SCRAPER** | Data collection | Job board scraping, API integration |
| **INVOICE_AUTOMATION** | Invoice management | Daily summaries, CSV reports |

## 🧪 Testing

### Backend Tests
```bash
cd back-end
python manage.py test
```

### Frontend Tests
```bash
cd my-app
pnpm test
```

## 🚀 Deployment

### Using Docker Compose
```bash
docker-compose up -d
```

### Manual Deployment

1. **Backend**
```bash
cd back-end
gunicorn core.wsgi:application --bind 0.0.0.0:8000
```

2. **Frontend**
```bash
cd my-app
pnpm build
pnpm start
```

3. **Celery Workers**
```bash
celery -A core worker -l info
```

## 🌐 Environment Variables

### Backend (.env)
```env
SECRET_KEY=your_secret_key
DEBUG=False
DATABASE_URL=postgresql://user:pass@localhost:5432/saasdb
OPENAI_API_KEY=your_openai_key
WHATSAPP_PHONE_ID=your_whatsapp_phone_id
WHATSAPP_TOKEN=your_whatsapp_token
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_HOST_USER=your_email
EMAIL_HOST_PASSWORD=your_password
```

### Frontend (.env.local)
```env
NEXT_PUBLIC_API_URL=http://localhost:8000/api
```

## 📚 Documentation

- [N8N Integration Guide](./N8N_INTEGRATION.md) - Detailed n8n setup and usage
- [Agent Examples](./agents.example.json) - Sample agent configurations
- [API Documentation](http://localhost:8000/api/docs/) - Swagger/ReDoc docs

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License.
