# 🔧 Troubleshooting Guide

## Error: "Failed to download remote update"

This error occurs when Expo tries to fetch updates from the network. Here's how to fix it:

### Solution 1: Disable Expo Updates (DONE ✅)

I've already disabled automatic updates in `app.json`. Now restart your app:

```bash
# Stop the Expo server (Ctrl+C)

# Clear cache and restart
npm start -- --clear

# Or use expo-cli
expo start -c
```

### Solution 2: Start in Development Mode

```bash
# Start without tunnel
expo start --dev-client

# Or use localhost connection
expo start --localhost
```

### Solution 3: Uninstall and Reinstall Expo Go App

1. Uninstall Expo Go from your phone
2. Reinstall from Play Store/App Store
3. Clear app data
4. Scan QR code again

### Solution 4: Connect via Tunnel (If on different networks)

```bash
expo start --tunnel
```

---

## Error: "Network request failed" or "Cannot connect to backend"

### Check 1: Is Backend Running?

```bash
cd server
npm run dev

# Should show:
# 🚀 Server running on port 5000
# 📍 API URL: http://localhost:5000/api
```

### Check 2: Update Frontend API URL

For **Android Emulator**, update `api/config.ts`:

```typescript
const API_BASE_URL = __DEV__
  ? 'http://10.0.2.2:5000/api'  // Android emulator
  : 'https://your-production-url.com/api';
```

For **iOS Simulator**:
```typescript
const API_BASE_URL = __DEV__
  ? 'http://localhost:5000/api'  // iOS simulator
  : 'https://your-production-url.com/api';
```

For **Physical Device** (find your computer's IP):
```bash
# Windows
ipconfig

# Look for IPv4 Address like: 192.168.x.x
```

```typescript
const API_BASE_URL = __DEV__
  ? 'http://192.168.x.x:5000/api'  // Replace with your IP
  : 'https://your-production-url.com/api';
```

---

## Error: "MongoDB connection failed"

### Solution: Setup MongoDB Atlas (FREE)

1. Go to https://mongodb.com/cloud/atlas/register
2. Create a free cluster (M0 Sandbox)
3. Create database user
4. Whitelist IP: `0.0.0.0/0` (allow all)
5. Get connection string
6. Update `server/.env`:

```env
MONGODB_URI=mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/tinder-app?retryWrites=true&w=majority
```

7. Restart backend server

---

## Error: "Image upload failed"

### Solution: Setup Cloudinary (FREE)

1. Go to https://cloudinary.com/users/register/free
2. Get credentials from dashboard
3. Update `server/.env`:

```env
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

4. Restart backend server

---

## App Shows White Screen

### Solution 1: Check for JavaScript Errors

Open React Native Debugger:
- Shake device
- Select "Debug" or "Show Dev Menu"
- Check console for errors

### Solution 2: Clear Metro Bundler Cache

```bash
npm start -- --clear
# or
expo start -c
```

### Solution 3: Check Navigation Setup

The app uses protected routes. If not logged in, it should show Login screen.

---

## Quick Restart Guide

### Complete Fresh Start:

```bash
# Terminal 1 - Frontend

cd c:\Users\JASHWANTH\Downloads\datingapp\tinder-expo
npm start -- --clear

# Terminal 2 - Backend
cd c:\Users\JASHWANTH\Downloads\datingapp\tinder-expo\server
npm run dev
```

---

## Testing Checklist

### Backend Health Check:
```bash
# Test if backend is running
curl http://localhost:5000/api/health

# Expected response:
# {"success":true,"message":"Server is running"}
```

### Test Registration:
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d "{\"name\":\"Test User\",\"email\":\"test@test.com\",\"password\":\"test123\",\"age\":25,\"gender\":\"male\",\"interestedIn\":\"female\",\"location\":\"Test City\"}"
```

### Frontend Connection:
1. Open app on phone
2. Should see Login screen
3. Try to register
4. Check if you get error or success

---

## Common Issues

### Issue: "Expo Go won't scan QR code"
**Solution:** 
- Make sure phone and computer are on same WiFi
- Try using tunnel mode: `expo start --tunnel`
- Check firewall isn't blocking port 19000

### Issue: "App crashes on startup"
**Solution:**
- Clear Expo Go app cache on phone
- Restart Expo Go app
- Check console for errors


### Issue: "Cannot find module '../store'"
**Solution:**
The store directory exists at `store/` not `stores/`. Already configured correctly.

### Issue: "TabBarIcon not found"
**Solution:**
Check that all imports in `App.tsx` are correct. File exists at `components/TabBarIcon.tsx`.

---

## Next Steps After Fixing

Once the app runs successfully:

1. ✅ You should see the **Login Screen**
2. ✅ Try registering a new user
3. ✅ Should auto-redirect to main app
4. ✅ You'll see Home, Matches, Messages, Profile tabs
5. ⚠️ Screens will show demo data (needs integration)

---

## Current Status

- **Backend:** ✅ Complete (needs MongoDB + Cloudinary)
- **Frontend:** ✅ Auth works, main screens show demo data
- **Next:** Integrate screens with API (2-4 hours work)

---

## Need More Help?

Check these files:
- `QUICK_START.md` - Quick start guide
- `PRODUCTION_READY.md` - What's built and what's needed
- `FINAL_PRODUCTION_REPORT.md` - Complete analysis
- `server/README.md` - Backend API documentation
