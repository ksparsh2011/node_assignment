const AWS = require("aws-sdk");
const { DYNAMODB_TABLE } = require("../../config");
const { v4: uuidv4 } = require("uuid");
const HttpStatus = require("http-status-codes");
const _ = require("lodash");

const dynamodb = new AWS.DynamoDB.DocumentClient();

/**
 * Controller for handling CRUD operations on resources.
 */

// Controller function to fetch all resources
const getAllResources = async (req, res) => {
  try {
    const params = {
      TableName: DYNAMODB_TABLE,
    };

    const data = await dynamodb.scan(params).promise();
    const resources = data.Items || [];

    res.json({ resources });
  } catch (error) {
    console.error("Error fetching resources:", error);
    res
      .status(HttpStatus.INTERNAL_SERVER_ERROR)
      .json({ message: "Internal Server Error" });
  }
};

// Controller function to create a new resource
const createResource = async (req, res) => {
  try {
    const { name, description } = req.body;

    if (!name) {
      const errorMessage = "Name is required";
      console.error(errorMessage);
      res.status(HttpStatus.BAD_REQUEST).json({ message: errorMessage });
      return;
    }

    const id = uuidv4();
    const params = {
      TableName: DYNAMODB_TABLE,
      Item: { id, name, description },
    };

    await dynamodb.put(params).promise();

    res.status(HttpStatus.CREATED).json({ id, name, description });
  } catch (error) {
    console.error("Error creating resource:", error);
    res
      .status(HttpStatus.INTERNAL_SERVER_ERROR)
      .json({ message: "Internal Server Error" });
  }
};

// Controller function to fetch a resource by ID
const getResourceById = async (req, res) => {
  try {
    const { id } = req.params;

    const params = {
      TableName: DYNAMODB_TABLE,
      Key: { id },
    };

    const data = await dynamodb.get(params).promise();
    const resource = data.Item;

    if (!resource) {
      const errorMessage = "Resource not found";
      console.error(errorMessage);
      res.status(HttpStatus.NOT_FOUND).json({ message: errorMessage });
      return;
    }

    res.json({ resource });
  } catch (error) {
    console.error("Error fetching resource by ID:", error);
    res
      .status(HttpStatus.INTERNAL_SERVER_ERROR)
      .json({ message: "Internal Server Error" });
  }
};

// Controller function to update a resource
const updateResource = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description } = req.body;

    if (!name) {
      const errorMessage = "Name is required";
      console.error(errorMessage);
      res.status(HttpStatus.BAD_REQUEST).json({ message: errorMessage });
      return;
    }

    const params = {
      TableName: DYNAMODB_TABLE,
      Key: { id },
      UpdateExpression: "SET #name = :name, description = :description",
      ExpressionAttributeNames: { "#name": "name" },
      ExpressionAttributeValues: {
        ":name": name,
        ":description": description || null,
      },
      ReturnValues: "ALL_NEW",
    };

    const data = await dynamodb.update(params).promise();
    const updatedResource = data.Attributes;

    res.json({ updatedResource });
  } catch (error) {
    console.error("Error updating resource:", error);
    res
      .status(HttpStatus.INTERNAL_SERVER_ERROR)
      .json({ message: "Internal Server Error" });
  }
};

// Controller function to delete a resource
const deleteResource = async (req, res) => {
  try {
    const { id } = req.params;

    const params = {
      TableName: DYNAMODB_TABLE,
      Key: { id },
    };

    await dynamodb.delete(params).promise();

    res.json({ message: "Resource deleted successfully" });
  } catch (error) {
    console.error("Error deleting resource:", error);
    res
      .status(HttpStatus.INTERNAL_SERVER_ERROR)
      .json({ message: "Internal Server Error" });
  }
};

module.exports = {
  getAllResources,
  createResource,
  getResourceById,
  updateResource,
  deleteResource,
};
