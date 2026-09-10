# Deployment Guide

## Overview

Study Buddy App is deployed using:
- **Frontend**: Vercel (React/Vite)
- **Backend**: Railway/Heroku (Node.js/Express)
- **Database**: MongoDB Atlas (Cloud)

## Prerequisites

- GitHub account
- Vercel account (for frontend)
- Railway or Heroku account (for backend)
- MongoDB Atlas account
- OpenAI API key

## Step 1: Setup MongoDB Atlas

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free cluster
3. Create a database user
4. Get connection string: `mongodb+srv://user:password@cluster.mongodb.net/study-buddy`
5. Add your deployment IPs to IP Whitelist

## Step 2: Deploy Backend to Railway

1. Go to [Railway.app](https://railway.app)
2. Click "New Project" → "Deploy from GitHub"
3. Select `turiduuu-glitch/study-buddy-app`
4. Add environment variables in Railway:
   ```
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_key
   OPENAI_API_KEY=your_openai_api_key
   NODE_ENV=production
   ADMIN_EMAIL=tudorsebastian.lucu@edu.bbschool.it
   ```
5. Set root directory to `backend`
6. Deploy!
7. Copy the backend URL (e.g., `https://your-app.railway.app`)

## Step 3: Deploy Frontend to Vercel

1. Go to [Vercel.com](https://vercel.com)
2. Click "New Project" → "Import Git Repository"
3. Select `turiduuu-glitch/study-buddy-app`
4. Set root directory to `frontend`
5. Add environment variable:
   ```
   VITE_API_URL=https://your-backend-url.railway.app/api
   ```
6. Deploy!
7. You'll get a URL like `https://study-buddy-app.vercel.app`

## Step 4: Setup Custom Subdomain

### For your subdomain hosting:

1. **Frontend**: Point subdomain to Vercel
   - In your domain registrar, create CNAME: `your-subdomain.yourdomain.com` → Vercel DNS
   - Add custom domain in Vercel project settings

2. **Backend**: Point API subdomain to Railway
   - Create CNAME: `api.your-subdomain.yourdomain.com` → Railway URL
   - Update frontend `VITE_API_URL` to use new API subdomain

## Environment Variables

### Backend (.env)
```env
MONGODB_URI=mongodb+srv://user:password@cluster.mongodb.net/study-buddy
JWT_SECRET=your_secret_key_min_32_chars
JWT_EXPIRE=7d
OPENAI_API_KEY=sk-...
PORT=5000
NODE_ENV=production
ADMIN_EMAIL=tudorsebastian.lucu@edu.bbschool.it
```

### Frontend (.env)
```env
VITE_API_URL=https://api.your-subdomain.com
```

## Running Locally

### Option 1: Run both servers separately

**Terminal 1 - Backend:**
```bash
cd backend
npm install
npm run dev
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm install
npm run dev
```

### Option 2: Run with concurrently
```bash
npm install
npm run dev
```

Then:
- Frontend: http://localhost:5173
- Backend: http://localhost:5000

## Testing the App

1. **Create Student Account**:
   - Go to `/` (register page)
   - Fill form and click "Create Account"
   - You'll be added to waitlist

2. **Admin Approval**:
   - Go to `/admin` (as admin user)
   - View pending students
   - Click "Approve" to activate account

3. **Student Login**:
   - Go to `/login`
   - Sign in with your credentials
   - Access `/dashboard` to see subjects

4. **Study with AI**:
   - Select a subject and unit
   - View detailed report
   - Click "View Details" → Ask questions to AI tutor

## Troubleshooting

### CORS Errors
- Check backend CORS configuration
- Verify `VITE_API_URL` matches backend URL

### MongoDB Connection Failed
- Verify connection string in `.env`
- Add deployment IP to MongoDB Atlas whitelist
- Check database credentials

### OpenAI API Errors
- Verify API key is valid
- Check account has credits
- Ensure model `gpt-4` is available in your plan

### Token/Auth Issues
- Clear browser localStorage
- Check JWT_SECRET matches between deployments
- Verify token expiration settings

## Next Steps

- Add email notifications for approvals
- Add progress tracking
- Improve UI/UX with better styling
- Add more AI features (generation, summarization)
- Add unit tests
- Add error logging/monitoring
