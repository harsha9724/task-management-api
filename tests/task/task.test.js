const request = require("supertest");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const { MongoMemoryServer } = require("mongodb-memory-server");

const app = require("../../index");
const User = require("../../models/user");
const Task = require("../../models/task");

let mongoServer;
let token;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();

   await mongoose.disconnect();
  await mongoose.connect(uri);

  // Create a test user and get JWT token
  const testUser = await User.create({
    name: "Test User",
    email: "test@example.com",
    password: "hashedPassword", 
  });

  token = jwt.sign({ user_id: testUser._id }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });
});

afterAll(async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
  await mongoServer.stop();
});

afterEach(async () => {
  await Task.deleteMany({});
});

describe("POST /api/tasks", () => {
  it("should create a task for authenticated user", async () => {
    const res = await request(app)
      .post("/api/tasks")
      .set("Authorization", `Bearer ${token}`)
      .send({
        title: "Test Task",
        description: "This is a test task",
      });

    expect(res.statusCode).toBe(201);
    expect(res.body.status).toBe("success");
    expect(res.body.message).toBe("Task created successfully");
    expect(res.body.data.data.title).toBe("Test Task");
  });

  it("should return 401 if no token is provided", async () => {
    const res = await request(app)
      .post("/api/tasks")
      .send({
        title: "Unauthorized Task",
        description: "No token",
      });

    expect(res.statusCode).toBe(401);
    expect(res.body.message).toMatch(/not authorized/i);
  });
});
