const express = require("express");
const app = express();
require("dotenv").config();
const {connectToDb} = require("./config/db")

const PORT = process.env.PORT;
const MONGO_URL = process.env.MONGO_URL



app.get("/",(req,res)=>{
    res.send("Welcome to home page")
})



app.listen(PORT,()=>{
    connectToDb(MONGO_URL)
    console.log(`Server running on the port ${PORT}`);
})