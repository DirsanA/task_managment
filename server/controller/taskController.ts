import type { Request, Response } from "express";
import taskModel from "../model/taskModel.js";

// Extend Request type to include userId from middleware
interface AuthRequest extends Request {
  userId?: string;
}

// Create a tasks
export async function taskCreate(req: AuthRequest, res: Response) {
  try {
    const { name, description, status } = req.body;
    const user = req.userId; // user ID from auth middleware

    if (!name || !description || !status || !user) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newTask = new taskModel({ name, description, status, user });
    await newTask.save();

    return res.status(201).json({ message: "Task created", data: newTask });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
}
