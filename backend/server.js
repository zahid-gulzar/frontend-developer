require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');

const app = express();   // ✅ define app before using it

connectDB();

app.use(express.json());

// ✅ Dynamic CORS: allow any localhost or 127.0.0.1 port
app.use(cors({
  origin: (origin, callback) => {
    if (!origin) return callback(null, true); // allow requests without origin (e.g., Postman)
    if (
      origin.startsWith("http://localhost:") ||
      origin.startsWith("http://127.0.0.1:")
    ) {
      callback(null, true); // allow all localhost ports
    } else {
      callback(new Error("Not allowed by CORS"));
    }
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
