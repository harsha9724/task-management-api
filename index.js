const express = require("express");
const app = express();
require("dotenv").config();
const {connectToDb} = require("./config/db");
const userRoutes = require("./routes/user");
const taskRoutes = require("./routes/task");

const PORT = process.env.PORT;
const MONGO_URL = process.env.MONGO_URL

// to read data from body as json object
app.use(express.json());

app.get("/",(req,res)=>{
    res.send("Welcome to home page");
})

app.use("/api/auth",userRoutes);
app.use("/api/tasks",taskRoutes);


app.listen(PORT,()=>{
    connectToDb(MONGO_URL)
    console.log(`Server running on the port ${PORT}`);
})