# 🚀 Backend Deployment to Render - Complete Guide

## Step 1: Prerequisites ✅

Before you begin, ensure you have:
- [ ] GitHub account (to push your code)
- [ ] Render account (free at https://render.com)
- [ ] MongoDB Atlas account (free at https://mongodb.com/cloud/atlas)
- [ ] Cloudinary account (free at https://cloudinary.com)
- [ ] Your code pushed to GitHub

---

## Step 2: Setup MongoDB Atlas (Free Database)

### 2.1 Create MongoDB Cluster

1. Go to https://mongodb.com/cloud/atlas
2. Sign in or create account
3. Create a free cluster (M0 tier)
4. Choose a region close to you
5. Click "Create Cluster"

### 2.2 Get Connection String

1. Go to "Databases" → click your cluster
2. Click "Connect" button
3. Choose "Connect your application"
4. Select "Node.js" driver
5. Copy the connection string (looks like):
   ```
   mongodb+srv://username:password@cluster.mongodb.net/database?retryWrites=true&w=majority
   ```
6. **Replace `<password>` with your MongoDB password**
7. **Replace `myFirstDatabase` with `dating_app`**

### 2.3 Create Database User

1. Go to "Security" → "Database Access"
2. Click "Add New Database User"
3. Create username and password
4. Save these credentials (needed for connection string)

### 2.4 Whitelist IP Address

1. Go to "Security" → "Network Access"
2. Click "Add IP Address"
3. Choose "Allow access from anywhere" (0.0.0.0/0)
4. Click "Confirm"

**Your MongoDB URI is ready!** Example:
```
mongodb+srv://myuser:mypassword@cluster0.abcd123.mongodb.net/dating_app?retryWrites=true&w=majority
```

---

## Step 3: Push Code to GitHub

### 3.1 Initialize Git Repository (if not done)

```bash
cd d:\datingapk
git init
git add .
git commit -m "Initial commit - dating app backend"
```

### 3.2 Create GitHub Repository

1. Go to https://github.com/new
2. Create repo named `dating-app-backend`
3. Copy the git command to push existing repo
4. Run in your project:

```bash
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/dating-app-backend.git
git push -u origin main
```

---

## Step 4: Deploy to Render

### 4.1 Create New Web Service

1. Go to https://render.com (sign in/create account)
2. Click "New" → "Web Service"
3. Choose "Deploy an existing Git repository"
4. Paste your GitHub repo URL:
   ```
   https://github.com/YOUR_USERNAME/dating-app-backend.git
   ```
5. Click "Connect"

### 4.2 Configure Deployment Settings

Fill in these fields:

| Field | Value |
|-------|-------|
| **Name** | `dating-app-backend` |
| **Environment** | `Node` |
| **Region** | Choose closest to you |
| **Branch** | `main` |
| **Build Command** | `npm install` |
| **Start Command** | `npm start` |
| **Plan** | `Free` |

### 4.3 Add Environment Variables

Before deploying, click "Advanced" and add these variables:

```
NODE_ENV = production
PORT = 5000
MONGODB_URI = mongodb+srv://myuser:mypassword@cluster0.abcd123.mongodb.net/dating_app?retryWrites=true&w=majority
JWT_SECRET = your-secret-key-here-use-strong-random-string
CLOUDINARY_CLOUD_NAME = your_cloudinary_name
CLOUDINARY_API_KEY = your_cloudinary_key
CLOUDINARY_API_SECRET = your_cloudinary_secret
```

**To generate a strong JWT_SECRET, run:**
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

### 4.4 Deploy

Click the "Deploy" button and wait (2-5 minutes).

**You'll get a URL like:** `https://dating-app-backend.onrender.com`

---

## Step 5: Verify Deployment

### 5.1 Check Health Endpoint

Open in browser:
```
https://dating-app-backend.onrender.com/api/health
```

Should return:
```json
{
  "success": true,
  "message": "Server is running"
}
```

### 5.2 View Logs

In Render dashboard:
1. Click your service
2. Go to "Logs" tab
3. You should see: `🚀 Server running on port 5000`

---

## Step 6: Update Frontend API Configuration

### 6.1 Update `api/config.ts`

Replace with your Render URL:

```typescript
const API_BASE_URL = __DEV__
  ? 'http://localhost:5000/api'
  : 'https://dating-app-backend.onrender.com/api';

export default API_BASE_URL;
```

### 6.2 Update Socket.io Connection

If you have Socket.io in your frontend, update it similarly:

```typescript
const SOCKET_URL = __DEV__
  ? 'http://localhost:5000'
  : 'https://dating-app-backend.onrender.com';
```

---

## Step 7: Test API Endpoints

### 7.1 Test Registration

```bash
curl -X POST https://dating-app-backend.onrender.com/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "password": "password123",
    "age": 25,
    "gender": "male"
  }'
```

### 7.2 Test Login

```bash
curl -X POST https://dating-app-backend.onrender.com/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "password123"
  }'
```

---

## Troubleshooting

### Issue: "Build failed" or "Cannot find module"

**Solution:**
```bash
# Make sure server/package.json exists
# Make sure all dependencies are listed
npm install  # in server directory
git add .
git commit -m "Update dependencies"
git push
```

### Issue: "Application failed to start"

Check logs in Render dashboard:
1. Go to service → Logs
2. Look for error messages
3. Ensure PORT is set to `5000`
4. Ensure NODE_ENV is set to `production`

### Issue: "Cannot connect to MongoDB"

Check your MONGODB_URI:
1. Verify connection string is correct
2. Check username/password in connection string
3. Verify IP whitelist includes 0.0.0.0/0 in MongoDB Atlas
4. Test connection string locally first:
   ```bash
   npm install -g mongodb-shell
   mongosh "your_connection_string"
   ```

### Issue: Free tier is slow or inactive

Render's free tier **spins down after 15 minutes of inactivity**. 
- Upgrade to paid plan ($7/month) for always-on
- Or keep hitting `/api/health` every 10 minutes to stay active

---

## Production Checklist

- [ ] MongoDB Atlas cluster created (M0 free tier)
- [ ] Database user created
- [ ] IP whitelist configured (0.0.0.0/0)
- [ ] GitHub repo created and code pushed
- [ ] Render account created
- [ ] Environment variables added to Render
- [ ] Deployment successful (green indicator in Render)
- [ ] Health endpoint responds
- [ ] Frontend API URL updated
- [ ] Test API endpoints with sample requests
- [ ] Monitor logs for errors

---

## Cost Summary

| Service | Cost | Notes |
|---------|------|-------|
| **MongoDB Atlas** | FREE | 512MB storage, 3 nodes |
| **Render** | FREE | Free tier spins down after 15 min inactivity |
| **Cloudinary** | FREE | 25GB bandwidth/month |
| **TOTAL** | **FREE** | Upgrade Render to $7/mo for always-on |

---

## Next Steps

After deployment is working:

1. **Test all API endpoints** with your frontend
2. **Monitor Render logs** for any errors
3. **Set up error tracking** (Sentry, etc.)
4. **Configure CORS properly** for production domain
5. **Add rate limiting** to prevent abuse
6. **Set up HTTPS** (Render provides free SSL)
7. **Plan database backups** (MongoDB Atlas handles this)

---

## Useful Links

- 📚 Render Docs: https://render.com/docs
- 📚 MongoDB Atlas: https://docs.atlas.mongodb.com
- 📚 Express.js: https://expressjs.com
- 🆘 Support: https://render.com/support

---

**🎉 Your backend is now live on the internet!**

Share your API URL with your team:
```
https://dating-app-backend.onrender.com/api
```
