# 🔧 Render Build Error - Quick Fix

## The Problem ❌

Render is trying to run the **frontend** (Expo) instead of the **backend** (Node.js).

**What's happening:**
1. Render runs `npm start` from root
2. Root `npm start` tries to start Expo app
3. Expo tries to import modules and fails
4. Backend never starts ❌

**What should happen:**
1. Render should run from `server/` directory
2. Run backend `npm start`
3. Backend Node.js server starts ✅

---

## The Fix ✅

### Go to Render Dashboard

1. Visit: https://render.com/dashboard
2. Click your service: `dating-app-tvg7`
3. Click **"Settings"** in the left menu

---

### Update Build Configuration

Find and update these fields:

**Build Command:**
```
cd server && npm install
```

**Start Command:**
```
cd server && node src/index.js
```

**Then click "Save Changes"**

---

### Redeploy

1. Click "Manual Deployments" button
2. Click **"Redeploy"**
3. Wait 2-5 minutes
4. Should show ✅ green checkmark

---

## Why This Works

- `cd server` - Changes to server directory
- `npm install` - Installs backend dependencies
- `node src/index.js` - Starts Node.js server (not Expo)

---

## Check If It Works

Once deployment succeeds:

```powershell
curl https://dating-app-tvg7.onrender.com/api/health
```

Should return:
```json
{"success": true, "message": "Server is running"}
```

---

## Project Structure Reminder

```
d:\datingapk/
├── package.json          ← Frontend (Expo) - DON'T RUN THIS IN RENDER
├── App.tsx               ← Frontend code
├── screens/              ← Frontend screens
├── components/           ← Frontend components
│
└── server/               ← BACKEND - THIS SHOULD RUN IN RENDER
    ├── package.json      ← Backend dependencies
    ├── src/
    │   ├── index.js      ← Start here: node src/index.js
    │   ├── controllers/   ← API logic
    │   ├── models/       ← Database models
    │   └── routes/       ← API routes
```

---

**The build should succeed now!** ✅

If you get another error, it's likely MongoDB connection issue. Check the logs and verify:
1. MONGODB_URI is set in Render
2. Connection string has correct password
3. IP whitelist includes 0.0.0.0/0 in MongoDB Atlas
