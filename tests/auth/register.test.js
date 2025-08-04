const request = require('supertest');
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const app = require('../../index'); 
const User = require('../../models/user'); 

let mongoServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();
   await mongoose.disconnect();
  await mongoose.connect(uri);
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

afterEach(async () => {
  await User.deleteMany(); // clear users after each test
});

describe('POST /api/auth/register', () => {
  it('should register a new user', async () => {
    const res = await request(app)
      .post('/api/auth/register')
      .send({
        email: 'test@example.com',
        password: 'Password123'
      });

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('status', 'Success');
    expect(res.body).toHaveProperty('message', 'User registered successfully');
    expect(res.body.data).toHaveProperty('user_id');
  });

  it('should not register if user already exists', async () => {
    await User.create({ email: 'test@example.com', password: 'hashed' });

    const res = await request(app)
      .post('/api/auth/register')
      .send({
        email: 'test@example.com',
        password: 'Password123'
      });

    expect(res.statusCode).toBe(400);
    expect(res.body).toHaveProperty('message', 'User already exists');
  });

  it('should fail if email or password is missing', async () => {
    const res = await request(app)
      .post('/api/auth/register')
      .send({ email: '' });

    expect(res.statusCode).toBe(400); // or whatever your validation returns
  });
});
