const cloudinary = require('cloudinary').v2;

// Check if Cloudinary is configured
if (!process.env.CLOUDINARY_CLOUD_NAME || process.env.CLOUDINARY_CLOUD_NAME === 'your_cloud_name') {
  console.warn('⚠️  Cloudinary not configured - Image uploads disabled');
  console.warn('   Get free account at: https://cloudinary.com\n');
} else {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });
}

module.exports = cloudinary;
