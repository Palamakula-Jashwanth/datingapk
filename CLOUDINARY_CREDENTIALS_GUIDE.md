# 🔐 Cloudinary Credentials - Complete Guide

## What is API Secret?

**API Secret** is a **private security key** that you should **NEVER share publicly**. It's used to authenticate your backend with Cloudinary.

- ✅ **API Key**: Can be public (used in frontend)
- ❌ **API Secret**: MUST be private (only in backend/Render)

---

## Where to Find Your Credentials

### Step 1: Go to Cloudinary Console
1. Visit: https://cloudinary.com/console
2. Log in with your Cloudinary account
3. You'll see your dashboard

### Step 2: Find Your Credentials

Once logged in, look at the **top right** or **left sidebar** for:

```
☁️ Cloudinary Management Console
├── Dashboard
├── Settings
└── Account Details
```

Click on **Settings** or scroll down to see your API credentials.

---

## What You'll See

You should see a section like this:

```
📌 ACCOUNT DETAILS

Cloud Name:      your_cloud_name
API Key:         123456789012345
API Secret:      abcdefghijklmnopqrstuvwxyz123456
API Base URL:    https://api.cloudinary.com/v1_1/your_cloud_name
```

---

## The 3 Values You Need

| Name | What It Is | Example | Use |
|------|-----------|---------|-----|
| **Cloud Name** | Your Cloudinary account ID | `mycloud123` | Frontend + Backend |
| **API Key** | Public authentication key | `123456789012345` | Frontend + Backend |
| **API Secret** | Private authentication key | `abcxyz789def123` | **Backend/Render only** ⚠️ |

---

## Step-by-Step to Find API Secret

### In Cloudinary Dashboard:

1. **Log in** → https://cloudinary.com/console/dashboard
2. **Look for** "Account Details" or "API Settings"
3. **Scroll down** to see "API Secret"
4. **Copy the value** (looks like a long random string)

### Visual Location:

```
┌─────────────────────────────────────────┐
│  Cloudinary Management Console          │
├─────────────────────────────────────────┤
│                                         │
│  Account:  your_email@example.com      │
│  Plan:     Free                        │
│                                         │
│  ⬇️ SCROLL DOWN ⬇️                      │
│                                         │
│  Cloud Name:         mycloud123         │
│  API Key:            123456789...      │
│  API Secret:         abcxyz789def...  │  ← COPY THIS
│  API Base URL:       https://api...   │
│                                         │
└─────────────────────────────────────────┘
```

---

## Security Warning ⚠️

**NEVER:**
- ❌ Share your API Secret publicly
- ❌ Post it on GitHub
- ❌ Show it in screenshots
- ❌ Send it unencrypted

**DO:**
- ✅ Keep it in `.env` (which is in `.gitignore`)
- ✅ Store it only in Render environment variables
- ✅ Treat it like a password

---

## Copy-Paste Template for Render

Once you have all 3 values, add them to Render:

**In Render Dashboard:**

1. Go to your service: `dating-app-tvg7`
2. Click "Environment"
3. Add these 3 variables:

```
Name: CLOUDINARY_CLOUD_NAME
Value: your_cloud_name

Name: CLOUDINARY_API_KEY
Value: your_api_key

Name: CLOUDINARY_API_SECRET
Value: your_api_secret
```

---

## If You Can't Find It

### Try These Alternative Methods:

**Method 1: Settings Page**
- Dashboard → Settings (gear icon)
- Look for "Security" or "API"
- Should see credentials there

**Method 2: Account Settings**
- Click your profile (top right)
- Select "Account Settings"
- Find "API" section

**Method 3: Support**
- Email: support@cloudinary.com
- Chat: In-app chat on Cloudinary
- They can help you reset if needed

---

## What if I Lost My API Secret?

**No problem!** You can regenerate it:

1. Go to Cloudinary dashboard
2. Click on "API Secret"
3. Look for "Reset" or "Regenerate" button
4. Confirm action
5. Copy the new secret

**Note:** Old secret becomes invalid immediately

---

## Testing Your Credentials

After adding to Render, you can test with:

```powershell
# This will check if they work (once Render deploys)
curl https://dating-app-tvg7.onrender.com/api/health
```

If it returns success and you can upload images, credentials are correct! ✅

---

## Your Render Environment Variables Summary

Here's what all 7 variables should look like in Render:

| Name | Where From |
|------|-----------|
| `NODE_ENV` | `production` (fixed) |
| `PORT` | `5000` (fixed) |
| `MONGODB_URI` | MongoDB Atlas |
| `JWT_SECRET` | Generated from node command |
| `CLOUDINARY_CLOUD_NAME` | Cloudinary dashboard ← You are here |
| `CLOUDINARY_API_KEY` | Cloudinary dashboard ← You are here |
| `CLOUDINARY_API_SECRET` | Cloudinary dashboard ← You are here |

---

## Next Steps

1. **Go to:** https://cloudinary.com/console
2. **Log in** with your account
3. **Find:** Cloud Name, API Key, API Secret
4. **Copy** all 3 values
5. **Go to:** https://render.com/dashboard
6. **Add** 3 Cloudinary variables to your service
7. **Click:** "Save Changes" & "Redeploy"

---

**Got all 3 values? Great! You're ready to add them to Render! 🎉**
