import type { Request, Response } from "express";
import userModel from "../model/userModel.js";
import bcrypt from "bcrypt";

export async function createUser(req: Request, res: Response) {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new userModel({ name, email, password: hashedPassword });
    await newUser.save();

    return res.status(201).json({ message: "User created", data: newUser });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
}
