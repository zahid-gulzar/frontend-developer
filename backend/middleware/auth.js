// backend/middleware/auth.js
const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    const header = req.header("Authorization");
    if (!header) return res.status(401).json({ message: "No token" });

    const token = header.split(" ")[1];
    if (!token) return res.status(401).json({ message: "Invalid token" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded.user; // { id: userId }
    next();
  } catch (err) {
    return res.status(401).json({ message: "Token not valid" });
  }
};
