const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    // Get token from Authorization header
    const authHeader = req.headers["authorization"] || req.headers["Authorization"];
    if (!authHeader) return res.status(401).json({ message: "No token provided" });

    // Header format: "Bearer <token>"
    const tokenParts = authHeader.split(" ");
    if (tokenParts.length !== 2 || tokenParts[0] !== "Bearer") {
      return res.status(401).json({ message: "Invalid token format" });
    }

    const token = tokenParts[1];
    if (!token) return res.status(401).json({ message: "Token missing" });

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded.user; // attach { id: userId } to request
    next();
  } catch (err) {
    console.error("Auth middleware error:", err.message);
    return res.status(401).json({ message: "Token not valid" });
  }
};
