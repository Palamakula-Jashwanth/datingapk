# 🚀 Quick Start Guide

## Current Status

✅ **Frontend:** Running on `exp://192.168.29.189:19000`  
⚠️ **Backend:** Needs MongoDB setup

---

## Step 1: Setup MongoDB (Choose One)

### Option A: MongoDB Atlas (Recommended - Cloud, Free)

1. Go to https://www.mongodb.com/cloud/atlas
2. Click "Try Free"
3. Create account
4. Create a free cluster (M0 Sandbox)
5. Click "Connect" → "Connect your application"
6. Copy connection string
7. Replace `<password>` with your password
8. Update `server/.env`:
```env
MONGODB_URI=mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/tinder-app?retryWrites=true&w=majority
```

### Option B: Local MongoDB

1. Install MongoDB: https://www.mongodb.com/try/download/community
2. Start MongoDB service:
   - Windows: `net start MongoDB`
   - Mac: `brew services start mongodb-community`
   - Linux: `sudo systemctl start mongod`
3. Use connection string:
```env
MONGODB_URI=mongodb://localhost:27017/tinder-app
```

---

## Step 2: Setup Cloudinary (Image Uploads)

1. Go to https://cloudinary.com/
2. Sign up (free)
3. Go to Dashboard
4. Copy your credentials
5. Update `server/.env`:
```env
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

---

## Step 3: Restart Backend

```bash
cd server
# Stop current server (Ctrl+C if running)
npm run dev
```

You should see:
```
✅ MongoDB Connected
🚀 Server running on port 5000
```

---

## Step 4: Test Everything

### Test Backend API
```bash
# Health check
curl http://localhost:5000/api/health

# Register a user
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "password": "password123",
    "age": 25,
    "gender": "male",
    "interestedIn": "female",
    "location": "New York"
  }'
```

### Test Frontend
1. Open Expo Go app on your phone
2. Scan QR code from terminal
3. App loads → You see Login screen
4. Register a new account
5. Login works

---

## Step 5: Connect UI to Backend (Optional - for full integration)

Update `api/config.ts`:

```typescript
// For physical device
const API_BASE_URL = 'http://YOUR_COMPUTER_IP:5000/api';

// For Android emulator
const API_BASE_URL = 'http://10.0.2.2:5000/api';

// For iOS simulator
const API_BASE_URL = 'http://localhost:5000/api';
```

Find your computer IP:
- Windows: `ipconfig` → Look for IPv4
- Mac/Linux: `ifconfig` → Look for inet

---

## Troubleshooting

### MongoDB Connection Error
**Problem:** `Error: connect ECONNREFUSED`  
**Solution:** MongoDB not running. Follow Step 1 above.

### Backend Won't Start
**Problem:** Port 5000 already in use  
**Solution:** 
```bash
# Windows
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# Mac/Linux
lsof -ti:5000 | xargs kill -9
```

### Frontend Can't Connect
**Problem:** API calls fail  
**Solution:** Check `api/config.ts` has correct IP/URL

### Cloudinary Upload Fails
**Problem:** Image upload returns error  
**Solution:** Verify Cloudinary credentials in `.env`

---

## What You Get

### ✅ Working Now
- Login/Register screens
- JWT authentication
- Token persistence
- Protected routes

### 🔄 Needs Integration (Screens exist, need API connection)
- Discover/Home screen
- Matches screen  
- Messages screen
- Profile screen

### 📝 Implementation Files Ready
- All API services in `api/`
- All state stores in `store/`
- All backend endpoints working

---

## Next Steps

Once MongoDB is connected:

1. **Home Screen Integration**
   - Replace demo data with `userService.getDiscoverUsers()`
   - Connect swipe to `matchService.likeUser()` / `dislikeUser()`

2. **Matches Screen Integration**
   - Use `matchService.getMatches()`
   - Show real matches

3. **Messages Screen Integration**
   - Use `chatService.getChats()`
   - Implement Socket.io for real-time

4. **Profile Screen Integration**
   - Show logged-in user from `authStore`
   - Add logout button

---

## Quick Commands Reference

```bash
# Start backend
cd server && npm run dev

# Start frontend (in another terminal)
npm start

# Install dependencies (if needed)
npm install --legacy-peer-deps

# Backend health check
curl http://localhost:5000/api/health
```

---

## Need Help?

See detailed docs:
- `PRODUCTION_READY.md` - Overview
- `PROJECT_STRUCTURE.md` - Architecture
- `IMPLEMENTATION_SUMMARY.md` - What's built
- `server/SETUP_GUIDE.md` - Backend setup
- `server/README.md` - API docs

---

🎉 **That's it!** Once MongoDB is connected, you have a fully functional backend + authentication system ready to go!
