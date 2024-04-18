const express = require("express");
const bodyParser = require("body-parser");
const authRoutes = require("./src/routes/authRoutes");
const resourceRoutes = require("./src/routes/resourceRoutes");

const app = express();

app.use(bodyParser.json());

// Mounting authentication routes
app.use("/auth", authRoutes);

// Middleware for authentication and authorization
app.use(require("./src/utils/authMiddleware"));

// Mounting resource routes
app.use("/resources", resourceRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
