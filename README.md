# SkillSphere

SkillSphere is a full-stack freelance marketplace built with React, Vite, Node.js, Express, MongoDB, and Socket.IO.

## Features
- Authentication and role-based access
- Freelancer and client profiles
- Gig marketplace and proposals
- Messaging and notifications
- Payments and escrow-style transactions
- Admin moderation and disputes
- AI-based freelancer matching
- Account recovery and verification

## Run locally

### Backend
```bash
cd backend
npm install
cp .env.example .env
npm run dev
```

### Frontend
```bash
cd frontend
npm install
cp .env.example .env
npm run dev
```

## Production notes
- Set your MongoDB URI and JWT secret in the backend .env file.
- Add Razorpay keys for real payment processing.
- Deploy the backend and frontend separately or use a platform like Render / Railway / Vercel.
