import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import session from 'express-session';


dotenv.config();

// Debug environment variables (remove in production)
console.log('🔧 Environment Variables Check:');
console.log('   OPENAI_API_KEY:', process.env.OPENAI_API_KEY ? `✅ Set (${process.env.OPENAI_API_KEY.substring(0, 20)}...)` : '❌ Missing');
console.log('   PORT:', process.env.PORT || '5000 (default)');
console.log('   NODE_ENV:', process.env.NODE_ENV || 'development (default)');
console.log('   ALLOWED_ORIGINS:', process.env.ALLOWED_ORIGINS || 'Using defaults');
console.log('FIREBASE_PROJECT_ID:', process.env.FIREBASE_PROJECT_ID);
console.log('---');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
// ALLOWED_ORIGINS is required - no hardcoded fallback
if (!process.env.ALLOWED_ORIGINS) {
  console.error('❌ ERROR: ALLOWED_ORIGINS environment variable is required');
  process.exit(1);
}

// Parse ALLOWED_ORIGINS and enable wildcard matching for Vercel domains
const allowedOrigins = process.env.ALLOWED_ORIGINS
  .split(',')
  .map(url => url.trim())
  .filter(url => url.length > 0);

app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (mobile apps, Postman, etc.)
    if (!origin) return callback(null, true);

    console.log('🔍 CORS check - Request origin:', origin);
    console.log('🔍 CORS check - Allowed origins:', allowedOrigins);

    // Check for exact match first
    if (allowedOrigins.includes(origin)) {
      console.log('✅ CORS allowed (exact match):', origin);
      return callback(null, true);
    }

    // Check for wildcard patterns (e.g., https://*.vercel.app)
    const isAllowed = allowedOrigins.some(allowed => {
      if (allowed.includes('*')) {
        // Convert wildcard pattern to regex
        const pattern = allowed
          .replace(/\./g, '\\.')  // Escape dots
          .replace(/\*/g, '.*');   // Convert * to .*
        const regex = new RegExp(`^${pattern}$`);
        return regex.test(origin);
      }
      return false;
    });

    if (isAllowed) {
      console.log('✅ CORS allowed (wildcard match):', origin);
      return callback(null, true);
    }

    console.log('❌ CORS blocked origin:', origin);
    callback(new Error('Not allowed by CORS'));
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept']
}));

// Handle preflight requests explicitly
// app.options(cors());

app.use(express.json());
app.use(session({
  secret: process.env.SESSION_SECRET || 'your-secret-key',
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: process.env.NODE_ENV === 'production',
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000 // 24 hours
  }
}));

// Parse URL-encoded bodies
app.use(express.urlencoded({ extended: true }));

// Parse cookies
app.use(cookieParser());

// Import routes
import usersRouter from './routes/users.js';
import chatRouter from './routes/chat.js';
import authRouter from './routes/auth.js';
import contactRouter from './routes/contact.js';

// Health check route
app.get('/', (req, res) => {
  res.json({ message: 'Backend server is running with CORS enabled!' });
});

// Ping route
app.get('/api/ping', (req, res) => {
  res.json({ message: 'pong' });
});

// CORS test route
app.get('/api/cors-test', (req, res) => {
  res.json({
    message: 'CORS test successful',
    origin: req.headers.origin,
    allowedOrigins: allowedOrigins,
    timestamp: new Date().toISOString()
  });
});

// API routes
app.use('/api/users', usersRouter);
app.use('/api/chat', chatRouter);
app.use('/api/contact', contactRouter);
app.use('/auth', authRouter);

// Start the server
app.listen(PORT, async () => {
  console.log(`🚀 Server is running on port ${PORT}`);
  console.log(`🌐 CORS enabled for: ${allowedOrigins.join(', ')}`);
  console.log('---');
  console.log('🎯 API endpoints ready:');
  // Use BACKEND_URL from env if available, otherwise construct from PORT (for console display only)
  const baseUrl = process.env.BACKEND_URL || `http://localhost:${PORT}`;
  console.log(`   GET  ${baseUrl}/api/ping`);
  console.log(`   GET  ${baseUrl}/api/users`);
  console.log(`   POST ${baseUrl}/api/users`);
  console.log(`   POST ${baseUrl}/api/chat`);
  console.log(`   POST ${baseUrl}/api/contact`);
  console.log(`   POST ${baseUrl}/auth/signup`);
  console.log(`   POST ${baseUrl}/auth/login`);
  console.log(`   GET  ${baseUrl}/auth/session`);
});