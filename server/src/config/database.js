const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    // Check if MongoDB URI is properly configured
    if (!process.env.MONGODB_URI || process.env.MONGODB_URI.includes('your_username')) {
      console.warn('\n⚠️  MongoDB URI not configured. Using in-memory mode for development.');
      console.warn('📌 To enable database:');
      console.warn('1. Get free MongoDB at: https://www.mongodb.com/cloud/atlas');
      console.warn('2. Update MONGODB_URI in server/.env\n');
      return;
    }

    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`❌ MongoDB Connection Error: ${error.message}`);
    console.warn('⚠️  Continuing without database (dev mode)\n');
  }
};

module.exports = connectDB;
