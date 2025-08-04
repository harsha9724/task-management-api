#  Secure Task Manager API

A secure, modular, and scalable RESTful API built with **Node.js**, **Express**, and **MongoDB**. Authenticated users can register, log in, and manage their personal tasks.

---

##  Tech Stack

- **Node.js + Express** for server and routing
- **MongoDB + Mongoose** for database and data modeling
- **JWT** for authentication
- **bcrypt** for password hashing
- **Helmet, CORS, Rate Limiting** for security
- **express-validator** for input validation
- **Swagger UI** for API documentation
- **Jest + Supertest** for unit testing

---

##  Setup Instructions

### 1. Clone and Install

```bash
git clone https://github.com/harsha9724/task-management-api.git
cd task-manager-api
npm install
```
### 2. Create .env file and add following variables

```bash
Install or Add MongoUrl either from Atlas or local url
PORT
MONGO_URL
JWT_SECRET
```
### 3. To run the application
```bash
npm start or npm run dev
```
### 4. To test the api
```bash
for testing register api run
npx jest tests/auth/register.test.js

for testing create task api run
npx jest tests/task/task.test.js
```
### 5. To test the api using postman
```bash
curl -X POST http://localhost:8000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","email":"test@example.com","password":"123456"}'
```

```bash
curl -X POST http://localhost:8000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"123456"}'
```

```bash
curl -X POST http://localhost:8000/api/task \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{"title":"New Task","description":"Task description"}'
```

```bash
curl --location 'http://localhost:8080/api/tasks' \
--header 'Authorization: Bearer <token>'
```

```bash
curl --location --request DELETE 'http://localhost:8080/api/tasks/688f8c5d26b479d9ee8ef662' \
--header 'Authorization: Bearer <token>'
```

### 6. To test the api using swagger-ui

visit 
```bash
http://localhost:{your_port_number}/api-docs
```

##  Scalability Design

The project is structured and engineered for scalability in terms of both codebase and data handling.

| Aspect                        | Explanation                                                                                                                            |
|------------------------------|----------------------------------------------------------------------------------------------------------------------------------------|
| **Modular Structure**         | Code is split into `controllers`, `routes`, `models`, and `middleware`, making it easy to scale features independently.                |
| **Middleware-driven**         | Core logic like authentication, validation, and error handling are abstracted into middleware, allowing easy reuse across new routes.  |
| **Validation Layer**          | Input checks are handled using `express-validator`, separating concerns and preventing logic duplication.                             |
| **Reusable Auth**             | JWT middleware provides a plug-and-play authentication layer, easily applied to any future protected routes.                          |


##  Database Scalability

The MongoDB data model is designed for efficient querying, indexing, and future scaling.

| Feature                   | Explanation                                                                                               |
|---------------------------|-----------------------------------------------------------------------------------------------------------|
| **MongoDB Schema Design** | Tasks reference the user via `userID`, enabling efficient user-specific queries with indexing.            |
| **Indexes**               | Indexes can be created on fields like `userID`, `completed`, and `createdAt` to improve filtering/sorting. |
| **Sharding Ready**        | MongoDB supports horizontal sharding for large datasets using `userID` as a shard key in multi-tenant apps. |


##  Infrastructure Scalability

| Component            | Scalable Option                                                                            |
| -------------------- | ------------------------------------------------------------------------------------------ |
| **Express App**      | Can run on multiple instances behind a load balancer (e.g., Nginx or AWS ELB).             |
| **Stateless Auth**   | JWT is stateless, so the app can scale horizontally with no session storage bottlenecks.   |
| **Rate Limiting**    | Use centralized stores like Redis for distributed rate limiting.                           |
| **Database**         | MongoDB Atlas or self-managed cluster can scale horizontally.                              |
