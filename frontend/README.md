# Study Buddy Frontend

React-based frontend for Study Buddy App.

## Setup

1. Install dependencies:
```bash
cd frontend
npm install
```

2. Create `.env` file:
```bash
echo "VITE_API_URL=http://localhost:5000/api" > .env
```

3. Run development server:
```bash
npm run dev
```

Frontend will run on http://localhost:5173

## Build for Production

```bash
npm run build
```

## Pages

- `/` - Registration
- `/login` - Login
- `/dashboard` - Student Dashboard (Subjects & Units)
- `/unit/:unitId` - Unit Details & AI Chat
- `/admin` - Admin Dashboard (Pending Approvals)
