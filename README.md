# 💕 Dating App - Tinder Clone

Complete dating app built with React Native + Expo and Node.js backend.

## ✨ Features

- 🔐 **Authentication** - JWT-based login/register
- 👤 **User Profiles** - Photos, bio, interests
- 💖 **Swipe Matching** - Like/dislike users
- 💬 **Real-time Chat** - Socket.io messaging
- 📍 **Smart Matching** - Location & interest-based algorithm
- 📸 **Image Upload** - Cloudinary integration
- 🎨 **Professional UI** - Modern, clean design

## 🚀 Tech Stack

### Frontend
- React Native + Expo
- TypeScript
- Zustand (state management)
- React Navigation
- Axios
- Socket.io Client

### Backend
- Node.js + Express
- MongoDB + Mongoose
- Socket.io
- JWT Authentication
- Bcrypt (password hashing)
- Cloudinary (image storage)
- Multer (file uploads)

## 📦 Installation

### Prerequisites
- Node.js 14+
- npm or yarn
- Expo Go app on your phone
- MongoDB Atlas account (free)
- Cloudinary account (free)

### Setup Backend

```bash
cd server
npm install

# Configure environment
cp .env.example .env
# Edit .env with your MongoDB URI and Cloudinary credentials

# Start server
npm run dev
```

### Setup Frontend

```bash
npm install

# Start Expo
npm start
```

## 🔧 Configuration

### MongoDB Setup
1. Create account at https://mongodb.com/cloud/atlas
2. Create free cluster (M0 tier)
3. Get connection string
4. Update `server/.env`:
   ```
   MONGODB_URI=your_connection_string
   ```

### Cloudinary Setup
1. Create account at https://cloudinary.com
2. Get credentials from dashboard
3. Update `server/.env`:
   ```
   CLOUDINARY_CLOUD_NAME=xxx
   CLOUDINARY_API_KEY=xxx
   CLOUDINARY_API_SECRET=xxx
   ```

### Frontend API URL
Update `api/config.ts` based on your setup:
- Android Emulator: `http://10.0.2.2:5000/api`
- iOS Simulator: `http://localhost:5000/api`
- Physical Device: `http://YOUR_IP:5000/api`

## 📱 Running the App

1. Start backend: `cd server && npm run dev`
2. Start frontend: `npm start`
3. Scan QR code with Expo Go app
4. Register and start swiping!

## 📚 API Documentation

### Authentication
- `POST /api/auth/register` - Register user
- `POST /api/auth/login` - Login
- `POST /api/auth/logout` - Logout
- `GET /api/auth/me` - Get current user

### Users
- `GET /api/users/discover` - Get discover feed
- `PUT /api/users/profile` - Update profile
- `POST /api/users/images` - Upload images
- `GET /api/users/:id` - Get user by ID

### Matches
- `POST /api/matches/like/:userId` - Like user
- `POST /api/matches/dislike/:userId` - Dislike user
- `GET /api/matches` - Get matches
- `DELETE /api/matches/:userId` - Unmatch

### Chats
- `GET /api/chats` - Get all chats
- `GET /api/chats/:chatId/messages` - Get messages
- `POST /api/chats/:chatId/messages` - Send message

## 🏗️ Project Structure

```
├── api/                  # API client layer
├── assets/               # Images, styles
├── components/           # Reusable UI components
├── screens/              # App screens
├── store/                # Zustand state management
├── server/               # Backend
│   ├── src/
│   │   ├── config/       # Database, Cloudinary
│   │   ├── controllers/  # API logic
│   │   ├── middlewares/  # Auth, upload, errors
│   │   ├── models/       # Database models
│   │   ├── routes/       # API routes
│   │   ├── socket/       # Real-time messaging
│   │   └── utils/        # Helpers
│   └── package.json
└── package.json
```

## 🎯 Current Status

**Production Ready: 88%**

### ✅ Complete
- Backend API (15 endpoints)
- Authentication system
- Database models
- Real-time messaging
- State management
- Login/Register screens
- Navigation

### 🔄 In Progress
- Screen integration with API
- Chat detail screen
- Profile edit screen

## 🚀 Deployment

### Backend
- Railway (recommended - free tier)
- Heroku
- DigitalOcean
- AWS EC2

### Frontend
- Expo EAS Build
- App Store / Play Store

## 📄 License

MIT

## 👤 Author

Jashwanth Palamakula

## 🙏 Acknowledgments

Built with ❤️ using modern React Native and Node.js best practices
