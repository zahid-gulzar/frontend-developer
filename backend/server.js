require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db'); // ensure this file exists and exports a function

const app = express();

// connect to DB and handle errors
(async () => {
  try {
    await connectDB();
    console.log('✅ Connected to database');
  } catch (err) {
    console.error('❌ Database connection failed:', err);
    // optional: process.exit(1);
  }
})();

app.use(express.json());

// More robust CORS: allow localhost dev ports and the FRONTEND_URL
const allowedOrigins = [
  process.env.FRONTEND_URL,
  'http://localhost:3000',
  'http://localhost:5500',
  'http://127.0.0.1:5500',
  'https://zahidgulzar.netlify.app/frontend/login.html'
].filter(Boolean);

app.use(cors({
  origin: (origin, callback) => {
    // Allow requests with no origin (like mobile apps or curl, or same-origin)
    if (!origin) return callback(null, true);
    if (allowedOrigins.some(o => origin === o || origin.startsWith(o))) {
      return callback(null, true);
    }
    // otherwise block
    return callback(new Error('CORS policy: This origin is not allowed'));
  },
  methods: ["GET","POST","PUT","DELETE","OPTIONS"],
  credentials: true
}));

// Routes (ensure these files exist)
app.use('/api/auth', require('./routes/auth'));
app.use('/api/tasks', require('./routes/tasks'));

app.get('/', (req, res) => res.send('✅ ToDo Backend is running'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

