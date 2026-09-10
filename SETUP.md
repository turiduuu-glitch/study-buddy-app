# Study Buddy App - Full Setup Instructions

## What This App Does

- Students create accounts and wait for admin approval
- Admin approves students and manages subjects/units
- Students access study materials and get AI tutoring
- Built with React (frontend) + Node.js (backend) + MongoDB

## Quick Start

### Local Development

1. **Clone and install dependencies**:
   ```bash
   git clone https://github.com/turiduuu-glitch/study-buddy-app.git
   cd study-buddy-app
   
   # Backend
   cd backend
   npm install
   cp .env.example .env
   
   # Frontend
   cd ../frontend
   npm install
   ```

2. **Configure environment**:
   - Backend: Edit `backend/.env` with MongoDB URI and OpenAI key
   - Frontend: Edit `frontend/.env` with API URL

3. **Run development servers**:
   ```bash
   # Terminal 1 - Backend
   cd backend && npm run dev
   
   # Terminal 2 - Frontend  
   cd frontend && npm run dev
   ```

4. **Access the app**:
   - Frontend: http://localhost:5173
   - Backend: http://localhost:5000

### Production Deployment

See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed instructions on deploying to:
- Vercel (Frontend)
- Railway (Backend)
- Custom subdomains

## Project Structure

```
study-buddy-app/
├── backend/
│   ├── models/          # MongoDB schemas
│   ├── routes/          # API endpoints
│   ├── middleware/      # Auth middleware
│   ├── server.js        # Express server
│   ├── package.json     # Dependencies
│   └── .env.example     # Environment template
├── frontend/
│   ├── src/
│   │   ├── components/  # React components
│   │   ├── App.jsx      # Main app
│   │   ├── main.jsx     # Entry point
│   │   └── index.css    # Styles
│   ├── index.html       # HTML template
│   ├── vite.config.js   # Vite config
│   └── package.json     # Dependencies
├── README.md            # This file
└── DEPLOYMENT.md        # Deployment guide
```

## Key Features

✅ **Student Registration** - Email-based signup with approval workflow
✅ **Admin Dashboard** - Manage students, subjects, and units
✅ **Subject Management** - Organize learning by subjects and units
✅ **Detailed Reports** - Rich study materials per unit
✅ **AI Tutor** - Real-time assistance with OpenAI GPT-4
✅ **Chat History** - Save conversation for review
✅ **Authentication** - Secure JWT-based auth

## API Documentation

### Auth Endpoints
- `POST /api/auth/register` - Register new student
- `POST /api/auth/login` - Login with email/password

### Admin Endpoints
- `GET /api/admin/pending-students` - List students awaiting approval
- `PUT /api/admin/approve/:userId` - Approve a student
- `POST /api/admin/subjects` - Create subject
- `POST /api/admin/units` - Create unit

### Student Endpoints
- `GET /api/students/subjects` - List all subjects
- `GET /api/students/units/:unitId` - Get unit details

### AI Endpoints
- `POST /api/ai/ask` - Ask AI tutor a question
- `GET /api/ai/history/:unitId` - Get chat history for unit

## Admin Account

- Email: `tudorsebastian.lucu@edu.bbschool.it`
- Create this account manually in database or via UI registration
- Set `role: 'admin'` in MongoDB
- Set `isApproved: true`

## Tech Stack

| Component | Technology |
|-----------|------------|
| Frontend | React 18 + Vite |
| Backend | Node.js + Express |
| Database | MongoDB |
| Auth | JWT + bcrypt |
| AI | OpenAI GPT-4 |
| Deployment | Vercel + Railway |

## Configuration

All settings are in `.env` files. Key variables:

```bash
# MongoDB Connection
MONGODB_URI=mongodb+srv://...

# JWT Configuration
JWT_SECRET=your_secret_key
JWT_EXPIRE=7d

# OpenAI API
OPENAI_API_KEY=sk-...

# Server
PORT=5000
NODE_ENV=development
```

## Support & Issues

For issues or questions:
1. Check the [DEPLOYMENT.md](./DEPLOYMENT.md) troubleshooting section
2. Review error logs in browser console (frontend) and terminal (backend)
3. Verify all environment variables are set correctly

## License

MIT
