const express = require("express");
const { createTaskSchema, validateBodySchema } = require("../middlewares/task");
const auhtenticateUser = require("../middlewares/auth");
const { createTask, updateTask, fetchTask, deleteTask } = require("../controllers/task");
const router = express.Router();

// create task
/**
 * @swagger
 * /api/tasks:
 *   post:
 *     summary: Create a new task
 *     tags:
 *       - Tasks
 *     security:
 *       - bearerAuth: []
 *     description: |
 *       Creates a new task for the authenticated user.  
 *       Requires a valid JWT token in the Authorization header.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - description
 *             properties:
 *               title:
 *                 type: string
 *                 example: Finish project report
 *               description:
 *                 type: string
 *                 example: Complete the final report and submit by Friday
 *     responses:
 *       201:
 *         description: Task created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 message:
 *                   type: string
 *                   example: Task created successfully
 *                 data:
 *                   type: object
 *                   properties:
 *                     data:
 *                       type: object
 *                       properties:
 *                         _id:
 *                           type: string
 *                           example: 64fdb6a3dcf8fa12ab456789
 *                         title:
 *                           type: string
 *                           example: Finish project report
 *                         description:
 *                           type: string
 *                           example: Complete the final report and submit by Friday
 *                         user_id:
 *                           type: string
 *                           example: 64abc123dcf8fa12ab000000
 *       401:
 *         description: Unauthorized or invalid token
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Not authorized, Please provide the token
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: Failed
 *                 message:
 *                   type: string
 *                   example: Something went wrong
 */

router.post("/",auhtenticateUser,createTaskSchema,validateBodySchema,createTask);

// update task
/**
 * @swagger
 * /api/tasks/{id}:
 *   put:
 *     summary: Update a task
 *     tags:
 *       - Tasks
 *     security:
 *       - bearerAuth: []
 *     description: |
 *       Updates a task belonging to the authenticated user.  
 *       Only the task owner can update their task.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the task to update
 *         schema:
 *           type: string
 *           example: 64fdb6a3dcf8fa12ab456789
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: Updated Task Title
 *               description:
 *                 type: string
 *                 example: Updated task description
 *               completed:
 *                 type: boolean
 *                 example: true
 *     responses:
 *       201:
 *         description: Task updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: Success
 *                 message:
 *                   type: string
 *                   example: Task updated successfully
 *                 data:
 *                   type: object
 *                   properties:
 *                     data:
 *                       type: object
 *                       properties:
 *                         acknowledged:
 *                           type: boolean
 *                           example: true
 *                         modifiedCount:
 *                           type: integer
 *                           example: 1
 *                         matchedCount:
 *                           type: integer
 *                           example: 1
 *       401:
 *         description: Unauthorized or not the owner of the task
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: Failed
 *                 message:
 *                   type: string
 *                   example: Your are not authorized to update this task
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: Failed
 *                 message:
 *                   type: string
 *                   example: Something went wrong
 */

router.put("/:id",auhtenticateUser,updateTask);

// fetch all task
/**
 * @swagger
 * /api/tasks:
 *   get:
 *     summary: Fetch tasks for authenticated user
 *     tags:
 *       - Tasks
 *     security:
 *       - bearerAuth: []
 *     description: |
 *       Returns a list of all tasks created by the authenticated user.
 *       Requires a valid JWT token.
 *     responses:
 *       200:
 *         description: List of tasks fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: Success
 *                 message:
 *                   type: string
 *                   example: Task fetched successfully
 *                 count:
 *                   type: integer
 *                   example: 2
 *                 data:
 *                   type: object
 *                   properties:
 *                     data:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           _id:
 *                             type: string
 *                             example: 64fdb6a3dcf8fa12ab456789
 *                           title:
 *                             type: string
 *                             example: Complete Swagger docs
 *                           description:
 *                             type: string
 *                             example: Write and review all task-related Swagger docs
 *                           user_id:
 *                             type: string
 *                             example: 64abc123dcf8fa12ab000000
 *       401:
 *         description: Unauthorized or invalid token
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Not authorized, Please provide the token
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: Failed
 *                 message:
 *                   type: string
 *                   example: Something went wrong
 */

router.get("/",auhtenticateUser,fetchTask);

// delete task
/**
 * @swagger
 * /api/tasks/{id}:
 *   delete:
 *     summary: Delete a task
 *     tags:
 *       - Tasks
 *     security:
 *       - bearerAuth: []
 *     description: |
 *       Deletes a task owned by the authenticated user.  
 *       Only the task owner is allowed to delete their task.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the task to delete
 *         schema:
 *           type: string
 *           example: 64fdb6a3dcf8fa12ab456789
 *     responses:
 *       201:
 *         description: Task deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: Success
 *                 message:
 *                   type: string
 *                   example: Task deleted successfully
 *                 data:
 *                   type: object
 *                   properties:
 *                     data:
 *                       type: object
 *                       properties:
 *                         acknowledged:
 *                           type: boolean
 *                           example: true
 *                         deletedCount:
 *                           type: integer
 *                           example: 1
 *       401:
 *         description: Unauthorized or not the owner of the task
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: Failed
 *                 message:
 *                   type: string
 *                   example: Your are not authorized to delete this task
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: Failed
 *                 message:
 *                   type: string
 *                   example: Something went wrong
 */

router.delete("/:id",auhtenticateUser,deleteTask);

module.exports = router;