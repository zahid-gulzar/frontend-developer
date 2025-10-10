const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, default: "User" },
  email: { type: String, required: true, unique: true, lowercase: true },
  password: { type: String, required: true },
  resetPasswordToken: String,
  resetPasswordExpires: Date
}, { timestamps: true });

module.exports = mongoose.model("User", userSchema);
