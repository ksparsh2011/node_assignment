const express = require("express");
const {
  getAllResources,
  createResource,
  getResourceById,
  updateResource,
  deleteResource,
} = require("../controllers/resourceController");

const router = express.Router();

/**
 * Routes for CRUD operations on resources.
 */

// Route to get all resources
router.get("/", getAllResources);

// Route to create a new resource
router.post("/", createResource);

// Route to get a resource by ID
router.get("/:id", getResourceById);

// Route to update a resource
router.put("/:id", updateResource);

// Route to delete a resource
router.delete("/:id", deleteResource);

module.exports = router;
