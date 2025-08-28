// taskRoutes.ts
import express from "express";
import { taskCreate } from "../controller/taskController.js";
import { authMiddleware } from "../middleware/authMidleware.js";
const router = express.Router();

// The middleware runs BEFORE taskCreate
router.post("/tasks", authMiddleware, taskCreate);

export default router;
