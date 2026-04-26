require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./db');
const authRouter = require('./routes/auth');
const favoritesRouter = require('./routes/favorites');

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors({ 
  origin: (origin, callback) => {
    // Allow requests with no origin (like mobile apps or curl)
    if (!origin) return callback(null, true);
    
    // Allow any localhost or the specific production client URL
    const isLocalhost = origin.startsWith('http://localhost') || origin.startsWith('http://127.0.0.1');
    
    if (isLocalhost || (process.env.CLIENT_URL && origin === process.env.CLIENT_URL)) {
      callback(null, true);
    } else {
      console.log('🚫 CORS Blocked Origin:', origin);
      callback(new Error('Not allowed by CORS'));
    }
  }, 
  credentials: true 
}));
app.use(express.json());

// Routes
app.use('/api/auth', authRouter);
app.use('/api/favorites', favoritesRouter);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Recipe Finder API is running 🍽️' });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ success: false, message: 'Route not found' });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ success: false, message: 'Internal Server Error' });
});

if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
  });
}

module.exports = app;
