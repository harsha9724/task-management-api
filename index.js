const express = require("express");
const app = express();
require("dotenv").config();
const cors = require("cors");
const {connectToDb} = require("./config/db");
const userRoutes = require("./routes/user");
const taskRoutes = require("./routes/task");
const rateLimit = require('express-rate-limit');
const helmet = require("helmet");
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const PORT = process.env.PORT;
const MONGO_URL = process.env.MONGO_URL

// swagger-api-docs configuration
const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Task Manager API',
      version: '1.0.0',
      description: 'A secure task manager backend using Node.js, Express, and MongoDB',
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
    security: [{ bearerAuth: [] }],
  },
  apis: ['./routes/*.js'],
};

const swaggerSpec = swaggerJsDoc(options);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));


// to read data from body as json object
app.use(express.json());

// implemeting only 5 request for 10 second can be made from any client
app.use(
  rateLimit({
    windowMs: 10*1000,
    max: 5,
    message: 'Too many requests from this IP',
  })
);

// for cors;
app.use(cors())

// to secure http header
app.use(helmet())


app.get("/",(req,res)=>{
    res.send("Welcome to home page");
})

app.use("/api/auth",userRoutes);
app.use("/api/tasks",taskRoutes);


app.listen(PORT,()=>{
    connectToDb(MONGO_URL)
    console.log(`Server running on the port ${PORT}`);
})