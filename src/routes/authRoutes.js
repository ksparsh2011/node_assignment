const express = require("express");
const { login } = require("../controllers/authController");

const router = express.Router();

/**
 * Routes for authentication-related operations.
 */

// Route for user login
router.post("/login", login);

module.exports = router;
