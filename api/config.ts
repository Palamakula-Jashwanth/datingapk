// ========================================
// API Configuration
// ========================================
// DEVELOPMENT: Connects to local Node.js backend
// PRODUCTION: Update this with your Render deployment URL
// After deploying to Render, update the production URL below

const API_BASE_URL = __DEV__
  ? 'http://localhost:5000/api'  // Local development
  : 'https://dating-app-tvg7.onrender.com/api';  // Production: Your Render backend

export const SOCKET_URL = __DEV__
  ? 'http://localhost:5000'
  : 'https://dating-app-tvg7.onrender.com';

export default API_BASE_URL;
