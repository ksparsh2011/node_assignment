const {
  getAllResources,
  createResource,
  getResourceById,
  updateResource,
  deleteResource,
} = require("../src/controllers/resourceController");

// Mock AWS SDK DocumentClient
jest.mock("aws-sdk", () => ({
  DynamoDB: {
    DocumentClient: jest.fn(() => ({
      scan: jest.fn().mockReturnThis(),
      put: jest.fn().mockReturnThis(),
      get: jest.fn().mockReturnThis(),
      update: jest.fn().mockReturnThis(),
      delete: jest.fn().mockReturnThis(),
      promise: jest.fn(),
    })),
  },
}));

describe("getAllResources", () => {
  test("should return resources", async () => {
    const req = {};
    const res = { json: jest.fn() };

    await getAllResources(req, res);

    expect(res.json).toHaveBeenCalledWith({ resources: [] });
  });
  // Add more test cases for edge cases and error scenarios
});

describe("createResource", () => {
  test("should create a resource", async () => {
    const req = {
      body: { name: "Test Resource", description: "Test Description" },
    };
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

    await createResource(req, res);

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalled();
  });
  // Add more test cases for edge cases and error scenarios
});

// Write similar test cases for other controller functions like getResourceById, updateResource, deleteResource
