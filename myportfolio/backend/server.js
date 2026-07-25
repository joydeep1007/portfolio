const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const mongoose = require('mongoose');
const rateLimit = require('express-rate-limit');
require('dotenv').config();

const app = express();

// Security headers
app.use(helmet());

// Global rate limiter (10 req/min per IP)
const globalLimiter = rateLimit({ windowMs: 60 * 1000, max: 10 });
app.use(globalLimiter);

// Body parsers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// CORS (restrict to FRONTEND_ORIGIN)
const allowedOrigin = process.env.FRONTEND_ORIGIN || 'http://localhost:3000';
app.use(
  cors({
    origin: allowedOrigin,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    credentials: false,
  })
);

// MongoDB connection
const mongoUri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/contactDB';
mongoose
  .connect(mongoUri)
  .then(() => console.log('✅ Connected to MongoDB:', mongoUri))
  .catch((err) => {
    console.error('❌ MongoDB connection error:', err.message);
    process.exit(1);
  });

// Routes
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

app.use('/api/contact', require('./src/routes/contact'));
app.use('/api/messages', require('./src/routes/messages'));
app.use('/api/chatbot', require('./src/routes/chatbot'));

// 404
app.use('*', (req, res) => res.status(404).json({ success: false, message: 'Not Found' }));

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server listening on port ${PORT}`);
});
