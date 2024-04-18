const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../../config");

/**
 * Controller for handling authentication-related operations.
 */

// Controller function for user login
const login = (req, res) => {
  // If credentials are valid, generate JWT token
  const token = jwt.sign({ username: req.body.username }, JWT_SECRET);
  res.json({ token });
};

module.exports = { login };
