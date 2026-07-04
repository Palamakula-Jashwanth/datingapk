# ⚡ Render Deployment - Quick Reference

## 5-Minute Summary

### Step 1: MongoDB Atlas Setup (2 min)
1. Create account: https://mongodb.com/cloud/atlas
2. Create free M0 cluster
3. Create database user (save username/password)
4. Whitelist IP: 0.0.0.0/0
5. Copy connection string
6. Replace `<password>` with your password
7. Replace `myFirstDatabase` with `dating_app`

**Example final URI:**
```
mongodb+srv://myuser:mypassword@cluster0.abc123.mongodb.net/dating_app?retryWrites=true&w=majority
```

---

### Step 2: Push to GitHub (1 min)
```bash
cd d:\datingapk
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/YOUR_USERNAME/dating-app-backend.git
git branch -M main
git push -u origin main
```

---

### Step 3: Deploy to Render (2 min)
1. Go to https://render.com
2. Click "New" → "Web Service"
3. Select your GitHub repo
4. Fill deployment settings:
   - Name: `dating-app-backend`
   - Build: `npm install`
   - Start: `npm start`
5. Click "Advanced" → Add env variables:

```
NODE_ENV=production
PORT=5000
MONGODB_URI=your_mongodb_atlas_uri
JWT_SECRET=<run: node -e "console.log(require('crypto').randomBytes(32).toString('hex'))">
CLOUDINARY_CLOUD_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

6. Click "Deploy" and wait 2-5 minutes

---

### Step 4: Verify & Update Frontend (1 min)

**Check if backend is running:**
```
https://dating-app-backend.onrender.com/api/health
```

**Update frontend config in `api/config.ts`:**
```typescript
const API_BASE_URL = __DEV__
  ? 'http://localhost:5000/api'
  : 'https://dating-app-backend.onrender.com/api';  // ← Your Render URL
```

---

## Environment Variables Needed

| Variable | Source | Example |
|----------|--------|---------|
| `MONGODB_URI` | MongoDB Atlas | `mongodb+srv://user:pass@cluster.mongodb.net/dating_app?...` |
| `JWT_SECRET` | Generate new | `a7f3b2e9c1d4...` (32+ chars) |
| `CLOUDINARY_CLOUD_NAME` | Cloudinary dashboard | `mycloud123` |
| `CLOUDINARY_API_KEY` | Cloudinary dashboard | `123456789` |
| `CLOUDINARY_API_SECRET` | Cloudinary dashboard | `abc123xyz789` |

---

## Generate JWT_SECRET

Run this in PowerShell:
```powershell
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

Copy the output and paste into Render env variables.

---

## Your Backend URLs After Deployment

**API Base:** `https://dating-app-backend.onrender.com/api`

**Example Endpoints:**
- Health: `https://dating-app-backend.onrender.com/api/health`
- Register: `https://dating-app-backend.onrender.com/api/auth/register`
- Login: `https://dating-app-backend.onrender.com/api/auth/login`

---

## Troubleshooting

| Problem | Solution |
|---------|----------|
| Build fails | Run `npm install` locally, then `git push` |
| MongoDB won't connect | Check connection string, test with `mongosh` |
| Slow performance | Free tier spins down after 15 min. Upgrade to $7/mo paid plan |
| CORS errors | Check `FRONTEND_URL` env variable in backend |
| Service keeps crashing | Check logs in Render dashboard → Logs tab |

---

## Free vs Paid

| Feature | Free | Paid ($7/mo) |
|---------|------|--------------|
| Uptime | Spins down after 15 min | Always on |
| CPU | Shared | Dedicated |
| Database | 512MB (MongoDB) | Unlimited |
| Bandwidth | 100GB/mo | Unlimited |

**Recommendation:** Start free, upgrade to paid when live.

---

## For Detailed Instructions

👉 See: `RENDER_DEPLOYMENT_GUIDE.md` (comprehensive guide)

---

## Common Commands

**View backend logs:**
```bash
# In Render dashboard: your-service → Logs
```

**Test backend API:**
```powershell
$headers = @{"Content-Type"="application/json"}
$body = @{
    name = "Test"
    email = "test@example.com"
    password = "test123"
} | ConvertTo-Json

Invoke-WebRequest -Uri "https://dating-app-backend.onrender.com/api/auth/register" `
  -Method POST -Headers $headers -Body $body
```

**Check if server is running:**
```powershell
curl https://dating-app-backend.onrender.com/api/health
```

---

**Ready to deploy? Follow the 5-minute summary above! 🚀**
