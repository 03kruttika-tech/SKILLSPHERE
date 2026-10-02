SkillSphere — Real-time Chat & Collaboration
===========================================

Overview
--------
This project implements a real-time chat and collaboration feature set using Socket.IO and WebRTC. Features included:

- Instant messaging (real-time via Socket.IO)
- File sharing (upload to Cloudinary when configured, fallback to local /uploads)
- Typing indicators
- Message delivered/read receipts
- Reactions
- Basic video call integration using WebRTC signaling over Socket.IO

Backend notes
-------------
- Uploads: `POST /api/messages/upload` accepts `multipart/form-data` with `file`. If Cloudinary env vars are present (`CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, `CLOUDINARY_API_SECRET`), files are uploaded to Cloudinary and the secure URL is returned. Otherwise files are saved to `backend/uploads/` and served at `/uploads/*`.
- Socket events: `send_message`, `receive_message`, `typing`, `stop_typing`, `mark_read`, `messages_read`, `webrtc_offer`, `webrtc_answer`, `webrtc_ice`.

Frontend notes
--------------
- Messages UI updated at `frontend/src/pages/Messages/Messages.jsx` to support attachments, typing, read receipts, and call UI.
- Paperclip button uploads files and sends a socket message with `file` url.
- Incoming calls show an accept/reject modal. Accept starts WebRTC answer flow; Call button initiates an offer.

Environment variables
---------------------
Required for local development:

- `PORT` (backend) — default 5000
- `MONGODB_URI` — MongoDB connection string
- `JWT_SECRET` — auth

Optional (for email / uploads):

- `EMAIL_HOST`, `EMAIL_PORT`, `EMAIL_USER`, `EMAIL_PASS`, `EMAIL_FROM` — SMTP settings
- `CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, `CLOUDINARY_API_SECRET` — if present, file uploads use Cloudinary

Run locally
-----------
Start backend:

```bash
cd backend
npm install
npm run dev
```

Start frontend:

```bash
cd frontend
npm install
npm run dev
```

Manual verification steps
-------------------------
1. Open two browser windows and log in with different users.
2. Open the same conversation in both windows.
3. Send messages; they should appear in real-time.
4. Click the paperclip, upload an image or file — it should upload and appear for both users.
5. When one window opens the conversation, messages should be marked read and the sender should receive a read receipt via Socket.IO.
6. Click `Call` to start a WebRTC call; accept on the other window when the incoming modal appears.

Next improvements
-----------------
- Add ringing sound and caller display name/avatar.
- Add accept/reject signaling back-pressure (notify caller when rejected).
- Add persistent storage for call logs and better call UI (full-screen, participant controls).
- Add automated tests for the upload endpoint and a simple socket smoke test script.

Files changed
-------------
- `backend/controllers/messageController.js` — upload logic (Cloudinary fallback)
- `backend/routes/messageRoutes.js` — upload route added
- `backend/app.js` — serve `/uploads`
- `backend/server.js` — WebRTC signaling forwarding
- `frontend/src/pages/Messages/Messages.jsx` — UI + WebRTC + attachments
