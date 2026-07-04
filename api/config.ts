// ========================================
// API Configuration
// ========================================
// DEVELOPMENT: Connects to local Node.js backend
// PRODUCTION: Update this with your Render deployment URL
// After deploying to Render, update the production URL below

const API_BASE_URL = __DEV__
  ? 'http://localhost:5000/api'  // Local development
  : 'https://dating-app-backend.onrender.com/api';  // ← UPDATE WITH YOUR RENDER URL

// Example: If your Render URL is https://my-dating-app.onrender.com
// Then use: 'https://my-dating-app.onrender.com/api'

export const SOCKET_URL = __DEV__
  ? 'http://localhost:5000'
  : 'https://dating-app-backend.onrender.com';

export default API_BASE_URL;
