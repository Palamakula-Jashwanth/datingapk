# Backend Setup Guide

## Prerequisites

1. **Node.js** (v14 or higher)
2. **MongoDB** (Local or Atlas)
3. **Cloudinary Account** (for image uploads)

## MongoDB Setup Options

### Option 1: MongoDB Atlas (Recommended - Cloud)

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free account
3. Create a new cluster
4. Get your connection string
5. Replace `MONGODB_URI` in `.env` file

### Option 2: Local MongoDB

1. Install MongoDB locally
2. Start MongoDB service: `mongod`
3. Use connection string: `mongodb://localhost:27017/tinder-app`

## Cloudinary Setup

1. Go to [Cloudinary](https://cloudinary.com/)
2. Create a free account
3. Get your credentials from dashboard:
   - Cloud Name
   - API Key
   - API Secret
4. Update `.env` file

## Installation

```bash
cd server
npm install
```

## Environment Configuration

Edit `.env` file with your actual credentials:

```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_secure_random_secret
JWT_EXPIRE=30d

CLOUDINARY_CLOUD_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_cloudinary_key
CLOUDINARY_API_SECRET=your_cloudinary_secret

NODE_ENV=development
```

## Running the Server

### Development Mode (with auto-reload)
```bash
npm run dev
```

### Production Mode
```bash
npm start
```

## Testing the API

Server will run on `http://localhost:5000`

### Health Check
```bash
curl http://localhost:5000/api/health
```

### Register User
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "password123",
    "age": 25,
    "gender": "male",
    "interestedIn": "female",
    "location": "New York"
  }'
```

### Login
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "password123"
  }'
```

## Production Deployment

1. Set `NODE_ENV=production` in `.env`
2. Use a strong JWT secret
3. Enable HTTPS
4. Set proper CORS origins
5. Use environment variables for sensitive data
6. Enable MongoDB authentication
7. Set up proper logging
8. Configure reverse proxy (Nginx)
9. Use PM2 for process management

## API Documentation

See `README.md` for complete API endpoints documentation.

## Troubleshooting

### MongoDB Connection Error
- Check if MongoDB is running
- Verify connection string
- Check network/firewall settings
- For Atlas, whitelist your IP address

### Cloudinary Upload Error
- Verify credentials
- Check file size limits
- Ensure correct file formats

### JWT Authentication Error
- Check if JWT_SECRET is set
- Verify token format
- Check token expiration
