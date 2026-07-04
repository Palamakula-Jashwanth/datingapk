# Tinder Clone - Backend Server

Production-ready Node.js/Express backend with MongoDB and Socket.io for real-time messaging.

## Setup

1. Install dependencies:
```bash
npm install
```

2. Create `.env` file (copy from `.env.example`):
```bash
cp .env.example .env
```

3. Configure environment variables in `.env`:
- MongoDB connection string
- JWT secret key
- Cloudinary credentials

4. Start MongoDB (local or use MongoDB Atlas)

5. Run the server:
```bash
npm run dev    # Development with nodemon
npm start      # Production
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/logout` - Logout user
- `GET /api/auth/me` - Get current user

### Users
- `PUT /api/users/profile` - Update profile
- `POST /api/users/images` - Upload images
- `DELETE /api/users/images/:publicId` - Delete image
- `GET /api/users/discover` - Get discover feed
- `GET /api/users/:id` - Get user by ID

### Matches
- `POST /api/matches/like/:userId` - Like user
- `POST /api/matches/dislike/:userId` - Dislike user
- `GET /api/matches` - Get all matches
- `DELETE /api/matches/:userId` - Unmatch user

### Chats
- `GET /api/chats` - Get all chats
- `GET /api/chats/:chatId/messages` - Get messages
- `POST /api/chats/:chatId/messages` - Send message

## Socket.io Events

- `join_chat` - Join chat room
- `send_message` - Send message
- `new_message` - Receive message
- `typing` - User typing
- `stop_typing` - User stopped typing

## Database Schema

- **Users** - User profiles, preferences, matches
- **Chats** - Chat conversations
- **Messages** - Chat messages
- **Reports** - User reports

## Features

- JWT authentication
- Password encryption with bcrypt
- Image uploads to Cloudinary
- Match algorithm based on interests/location/age
- Real-time messaging with Socket.io
- Input validation
- Error handling
- Online/offline status tracking
