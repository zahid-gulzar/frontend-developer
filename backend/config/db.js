// config/db.js
const mongoose = require('mongoose');

const connectDB = async () => {
  const uri = process.env.MONGO_URI;
  if (!uri) throw new Error('MONGO_URI not set in environment');

  return mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
    // other options if required
  });
};

module.exports = connectDB;
