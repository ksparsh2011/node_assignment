const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../../config");

/**
 * Middleware for authentication and authorization.
 */

// Middleware function for authenticating JWT token
const authenticate = (req, res, next) => {
  // Extract JWT token from request header
  const token = req.header("Authorization");

  if (!token) {
    return res.status(401).json({ message: "Authorization token is required" });
  }

  try {
    // Verify the token
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid token" });
  }
};

module.exports = authenticate;
