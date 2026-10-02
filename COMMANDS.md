# Quick Start - Copy & Paste Commands

## 1. Start Backend (if not running)

```bash
cd backend
npm start
```

You should see: `Server running on http://localhost:5000`

## 2. Start Frontend

In a new terminal:

```bash
cd frontend
npm run dev
```

You should see: `Local:   http://localhost:5175`

## 3. Test Automated Flow

In another terminal:

```bash
cd backend
node test-email-verification-full.js
```

Expected output:
```
✅ All 6 steps should pass
🎉 EMAIL VERIFICATION FLOW IS WORKING CORRECTLY
```

## 4. Manual Test Flow

1. **Open Browser**
   ```
   http://localhost:5175/register
   ```

2. **Fill Registration Form**
   - Full Name: Test User
   - Email: test@example.com (or any email)
   - Password: Password123!
   - Confirm Password: Password123!
   - Role: Freelancer
   - Phone: 1234567890
   - Location: Test City

3. **Submit & Verify Redirect**
   - Should show: "Registration successful"
   - Should redirect to: `http://localhost:5175/verify-email`
   - Email should be pre-filled

4. **Check Email**
   - Go to: https://mail.google.com
   - Login: skillswapp10@gmail.com
   - Password: (use app password: jlqrhptshrydtbwm if needed)
   - Find email from SkillSphere
   - Copy the 32-character verification token

5. **Verify Email**
   - Paste token into the verification form
   - Click "Verify Email"
   - Should show: "Email verified successfully!"
   - Should redirect to: `http://localhost:5175/login`

6. **Login**
   - Email: Same as registration
   - Password: Same as registration
   - Click Login
   - Should show: "Login Successful"
   - Should redirect to dashboard

## 5. Test Resend Code

On verify-email page:
- Click "Resend verification code"
- Check email again for new code
- Paste new code and verify
- Should work with new code

## 6. Test Error Cases

### Invalid Code
- Enter wrong code in verification form
- Should show: "Invalid verification code"

### Expired Code (requires manual database change)
- This requires waiting 24 hours or manually updating database
- Backend handles it gracefully

### Login Before Verification
- Create new account but don't verify
- Try to login immediately
- Should show: "Please verify your email first"
- Should redirect to verify-email page

## API Testing with cURL

### Verify Email
```bash
curl -X POST http://localhost:5000/api/account/verify-email \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "verificationToken": "32chartoken..."
  }'
```

### Resend Code
```bash
curl -X POST http://localhost:5000/api/auth/resend-verification \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com"
  }'
```

### Login
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "password": "Password123!"
  }'
```

## Expected Responses

### Successful Verification (200)
```json
{
  "success": true,
  "message": "Email verified successfully. You can now login.",
  "isEmailVerified": true
}
```

### Successful Login After Verification (200)
```json
{
  "success": true,
  "message": "Login Successful",
  "isEmailVerified": true,
  "user": {
    "_id": "...",
    "email": "user@example.com",
    "fullName": "User Name",
    "role": "freelancer",
    "isVerified": true
  }
}
```

### Login Before Verification (403)
```json
{
  "success": false,
  "message": "Please verify your email first. Check your inbox for the verification code.",
  "isEmailVerified": false
}
```

### Invalid Token (401)
```json
{
  "success": false,
  "message": "Invalid verification code"
}
```

## Troubleshooting

### Email not received?
1. Check spam/promotions folder
2. Wait a few seconds for email to arrive
3. Use resend button
4. Check backend logs for errors

### Backend not starting?
```bash
# Kill existing process on port 5000
npx kill-port 5000
# Try again
npm start
```

### Frontend not starting?
```bash
# Kill existing process on port 5175
npx kill-port 5175
# Try again
npm run dev
```

### MongoDB connection error?
- Ensure MongoDB is running
- Check MONGODB_URI in .env
- Verify connection string is correct

### Verification code not working?
- Copy entire token from email
- Ensure no extra spaces
- Check database directly:
```bash
# MongoDB query
db.users.findOne({ email: "user@example.com" }, 
  { emailVerificationToken: 1, emailVerificationExpires: 1 }
)
```

## Success Indicators

✅ Backend starts without errors
✅ Frontend loads at localhost:5175
✅ Can register new account
✅ Redirects to verify-email after registration
✅ Email received from skillswapp10@gmail.com
✅ Can verify with token from email
✅ Can login after verification
✅ Cannot login before verification
✅ Resend code works
✅ Automated tests pass all 6 steps

## Documentation Files

- `README_EMAIL_VERIFICATION.md` - Complete guide
- `QUICKSTART_EMAIL_VERIFICATION.md` - Quick start
- `EMAIL_VERIFICATION_FLOW.md` - Detailed flow
- `EMAIL_VERIFICATION_IMPLEMENTATION.md` - Implementation details
- `EMAIL_VERIFICATION_SUMMARY.md` - Change summary
- `FINAL_CHECKLIST.md` - Verification checklist

## Important Notes

- All emails sent from: **skillswapp10@gmail.com**
- Tokens expire after: **24 hours**
- Verification token length: **32 bytes (64 hex characters)**
- Backend port: **5000**
- Frontend port: **5175**

## Key Files Modified

Backend:
- `controllers/authController.js` (+180 lines)
- `routes/authRoutes.js` (+2 endpoints)
- `routes/accountRecoveryRoutes.js` (+2 endpoints)

Frontend:
- `pages/Register/Register.jsx`
- `pages/Login/Login.jsx`
- `pages/Account/EmailVerification.jsx` (NEW)
- `routes/AppRoutes.jsx`

## Contact & Support

If you encounter issues:
1. Check browser console for errors
2. Check backend terminal for logs
3. Look for `[Email Verification]` prefix in logs
4. Review documentation files
5. Run automated test: `node test-email-verification-full.js`

---

**Everything is ready! Copy the commands above and test the complete flow.** 🚀

