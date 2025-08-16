const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const rateLimit = require('express-rate-limit');
const morgan = require('morgan');

dotenv.config();

const app = express();
const corsOptions = {
  origin: [
    'http://localhost:5173',
    'https://mock-bot-orcin.vercel.app',
    'https://vercel.app',
    process.env.CLIENT_ORIGIN
  ].filter(Boolean),
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
};
app.use(cors(corsOptions));
app.use(morgan('combined'));
app.use(express.json());

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/mockbot';

mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch((err) => console.error('MongoDB connection error:', err));

// Rate limiting
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10, // limit each IP to 10 requests per windowMs
  message: { message: 'Too many authentication attempts, please try again later.' }
});
const chatLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 30, // limit each IP to 30 chat requests per windowMs
  message: { message: 'Too many chat requests, please slow down.' }
});

const authRoutes = require('./routes/auth');
app.use('/api/auth', authLimiter, authRoutes);

const chatRoutes = require('./routes/chat');
app.use('/api/chat', chatLimiter, chatRoutes);

const sessionRoutes = require('./routes/session');
app.use('/api/sessions', sessionRoutes);

app.get('/api/test-gemini', async (req, res) => {
  const axios = require('axios');
  const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
  const prompt = "Explain how AI works in a few words";

  try {
    const response = await axios.post(
      'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent',
      {
        contents: [{ parts: [{ text: prompt }] }]
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'X-goog-api-key': GEMINI_API_KEY
        }
      }
    );
    res.json(response.data);
  } catch (err) {
    res.status(500).json({ error: err.response?.data || err.message });
  }
});

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

// Root route for basic info
app.get('/', (req, res) => {
  res.json({ 
    message: 'MockBot API Server',
    status: 'running',
    endpoints: ['/api/auth', '/api/chat', '/api/sessions', '/api/health']
  });
});

// Handle 404 for undefined routes
app.use((req, res) => {
  res.status(404).json({ 
    error: 'Route not found',
    message: 'This is the MockBot API server. Use /api/ endpoints for functionality.',
    availableEndpoints: [
      '/api/auth/login',
      '/api/auth/register',
      '/api/chat',
      '/api/sessions',
      '/api/health'
    ]
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
}); 
