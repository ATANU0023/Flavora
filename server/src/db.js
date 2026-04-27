const mongoose = require('mongoose');

// Use a variable to cache the connection
let isConnected = false;

const connectDB = async () => {
  if (isConnected) {
    return;
  }

  try {
    if (!process.env.MONGODB_URI) {
      throw new Error('MONGODB_URI is not defined in environment variables');
    }

    const db = await mongoose.connect(process.env.MONGODB_URI);
    isConnected = db.connections[0].readyState;
    console.log('✅ New MongoDB connection established');
  } catch (error) {
    console.error(`❌ MongoDB Connection Error: ${error.message}`);
    // In serverless, we throw the error instead of process.exit(1)
    throw error;
  }
};

module.exports = connectDB;
