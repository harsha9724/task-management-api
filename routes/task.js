const express = require("express");
const { createTaskSchema, validateBodySchema } = require("../middlewares/task");
const auhtenticateUser = require("../middlewares/auth");
const { createTask, updateTask, fetchTask, deleteTask } = require("../controllers/task");
const router = express.Router();

// create task
router.post("/",auhtenticateUser,createTaskSchema,validateBodySchema,createTask);

// update task
router.put("/:id",auhtenticateUser,updateTask);

// fetch all task
router.get("/",auhtenticateUser,fetchTask);

// delete task
router.delete("/:id",auhtenticateUser,deleteTask);

module.exports = router;