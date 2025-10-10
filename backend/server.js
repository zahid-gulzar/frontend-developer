// backend/server.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');

const app = express();

// Connect MongoDB
connectDB();

// Parse JSON
app.use(express.json());

// CORS setup
app.use(cors({
  origin: [
    process.env.FRONTEND_URL,     // Deployed frontend
    "http://localhost:3000"       // Optional for local dev
  ],
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  credentials: true
}));

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/tasks', require('./routes/tasks'));

// Root
app.get('/', (req, res) => res.send('✅ ToDo Backend is running'));

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
