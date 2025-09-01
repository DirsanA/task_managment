// taskRoutes.ts
import express from "express";
import { taskCreate } from "../controller/taskController.js";
import { authMiddleware } from "../middleware/authMidleware.js";
const router = express.Router();

// The middleware runs BEFORE taskCreate
router.post("/task-create", authMiddleware, taskCreate);

export default router;
