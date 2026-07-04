# 🔧 Render Environment Variables Setup Guide

## Where to Add Variables in Render

1. Go to your Render service dashboard
2. Click "Environment" in the left sidebar
3. Click "Add Environment Variable"
4. For each variable below, fill in the name and value

---

## Variables to Add (Copy-Paste Ready)

### 1. Node Environment
**Name:** `NODE_ENV`  
**Value:** `production`

```
production
```

---

### 2. Server Port
**Name:** `PORT`  
**Value:** `5000`

```
5000
```

---

### 3. MongoDB Connection String (IMPORTANT ⚠️)

**Name:** `MONGODB_URI`  
**Value:** Get from MongoDB Atlas

#### How to get MongoDB URI:
1. Go to https://mongodb.com/cloud/atlas
2. Click your cluster
3. Click "Connect" → "Drivers" → "Node.js"
4. Copy the connection string
5. It will look like:
```
mongodb+srv://username:password@cluster0.abcdef.mongodb.net/database?retryWrites=true&w=majority
```

6. **IMPORTANT:** Replace `<password>` with your actual MongoDB password
7. Replace `myFirstDatabase` with `dating_app`

**Final format should be:**
```
mongodb+srv://myuser:mypassword123@cluster0.abc123xyz.mongodb.net/dating_app?retryWrites=true&w=majority
```

---

### 4. JWT Secret (Generate New)

**Name:** `JWT_SECRET`  
**Value:** Generate a secure random string

#### Generate in PowerShell:
```powershell
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

Copy the output (looks like):
```
a7f3b2e9c1d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9
```

**Paste this into the Value field**

---

### 5. Cloudinary Cloud Name

**Name:** `CLOUDINARY_CLOUD_NAME`  
**Value:** Get from Cloudinary dashboard

#### Steps:
1. Go to https://cloudinary.com/console
2. Look for "Cloud Name" (highlighted in dashboard)
3. Copy it

**Example:**
```
mycloud123
```

---

### 6. Cloudinary API Key

**Name:** `CLOUDINARY_API_KEY`  
**Value:** Get from Cloudinary dashboard

#### Steps:
1. In Cloudinary console, scroll down to "Account Details"
2. Copy "API Key"

**Example:**
```
123456789012345
```

---

### 7. Cloudinary API Secret

**Name:** `CLOUDINARY_API_SECRET`  
**Value:** Get from Cloudinary dashboard

#### Steps:
1. In Cloudinary console, under "Account Details"
2. Copy "API Secret"

**Example:**
```
abcDefGhIjKlMnOpQrStUvWxYz123456
```

---

## Summary Table

Copy this table for reference:

| Name | Value | Source |
|------|-------|--------|
| `NODE_ENV` | `production` | Fixed |
| `PORT` | `5000` | Fixed |
| `MONGODB_URI` | `mongodb+srv://...` | MongoDB Atlas |
| `JWT_SECRET` | Random 64 chars | Generate with node |
| `CLOUDINARY_CLOUD_NAME` | Your cloud name | Cloudinary |
| `CLOUDINARY_API_KEY` | Your API key | Cloudinary |
| `CLOUDINARY_API_SECRET` | Your API secret | Cloudinary |

---

## Security Notes ⚠️

**NEVER share these values:**
- ❌ Don't paste `MONGODB_URI` in code
- ❌ Don't commit `.env` files to GitHub
- ❌ Don't share `JWT_SECRET` publicly
- ❌ Don't post `CLOUDINARY_API_SECRET` online

**They're already in `.gitignore`** ✅

---

## Step-by-Step in Render Dashboard

### Screenshot Instructions:

1. **In Render Dashboard:**
   - Select your "dating-app-backend" service
   - Click "Environment" in left menu

2. **Add Each Variable:**
   - Click "Add Environment Variable" button
   - Enter Name (e.g., `NODE_ENV`)
   - Enter Value (e.g., `production`)
   - Click "Save Changes"

3. **Repeat for all 7 variables above**

4. **Service restarts automatically** after you save

---

## Verify Variables are Set

After adding all variables:
1. Click your service
2. Go to "Environment" tab
3. All 7 variables should be listed
4. Check "Logs" tab for server startup messages

---

## If You Mess Up

**To edit a variable:**
- Click the pencil icon next to the variable
- Update the value
- Click save

**To delete a variable:**
- Click the X icon next to the variable

**Service will restart** when you make changes ✅

---

## Common Mistakes

| Mistake | Fix |
|---------|-----|
| Missing `<password>` in MongoDB URI | Replace `<password>` with your actual password |
| Wrong database name | Use `dating_app` not `myFirstDatabase` |
| Expired JWT secret | All JWT secrets are valid, but you can generate a new one |
| Space in variable value | Don't add spaces before/after value |
| Wrong Cloudinary name | Copy exactly as shown in dashboard |

---

## Testing After Setup

Once all variables are added and saved:

1. **Check logs** in Render (should see "Server running on port 5000")
2. **Test health endpoint:**
   ```
   https://dating-app-backend.onrender.com/api/health
   ```
   Should return: `{"success": true, "message": "Server is running"}`

3. **Check MongoDB** in MongoDB Atlas
   - Go to "Databases"
   - Should see `dating_app` database created
   - May take a minute to appear

---

## Need Help?

If a variable won't accept your value:
1. Check for spaces at start/end
2. Don't wrap in quotes unless needed
3. URLs should not have trailing `/`
4. Secrets should be alphanumeric

---

**✅ Ready to add variables? Start with NODE_ENV!**
