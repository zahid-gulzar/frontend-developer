require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');

const app = express();

connectDB();

app.use(express.json());

// ✅ Updated CORS to allow your deployed frontend
app.use(cors({
  origin: (origin, callback) => {
    // Allow requests with no origin (Postman or curl)
    if (!origin) return callback(null, true);

    // Allow localhost for development
    if (
      origin.startsWith("http://localhost:") ||
      origin.startsWith("http://127.0.0.1:")
    ) {
      return callback(null, true);
    }

    // ✅ Allow your deployed frontend
    if (origin === "https://frontend-developer-2r2v.onrender.com") {
      return callback(null, true);
    }

    // Block any other origins
    callback(new Error("Not allowed by CORS"));
  },
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  credentials: true
}));

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/tasks', require('./routes/tasks'));

app.get('/', (req, res) => res.send('✅ ToDo Backend is running'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
