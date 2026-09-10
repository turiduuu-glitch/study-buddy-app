# Study Buddy Backend

Node.js + Express + MongoDB backend for Study Buddy App.

## Setup

1. Install dependencies:
```bash
cd backend
npm install
```

2. Create `.env` file:
```bash
cp .env.example .env
```

3. Add your configuration:
- MongoDB connection string
- JWT secret
- OpenAI API key

4. Run development server:
```bash
npm run dev
```

Server will run on http://localhost:5000

## API Endpoints

### Auth
- `POST /api/auth/register` - Register new student
- `POST /api/auth/login` - Login user

### Admin
- `GET /api/admin/pending-students` - List students pending approval
- `PUT /api/admin/approve/:userId` - Approve student
- `POST /api/admin/subjects` - Create subject
- `POST /api/admin/units` - Create unit

### Students
- `GET /api/students/subjects` - List all subjects
- `GET /api/students/units/:unitId` - Get unit details

### AI
- `POST /api/ai/ask` - Ask AI tutor
- `GET /api/ai/history/:unitId` - Get chat history
