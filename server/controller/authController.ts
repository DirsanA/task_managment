import bcrypt from "bcrypt";
import type { Request, Response } from "express";
import userModel from "../model/userModel.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

interface LoginRequest extends Request {
  body: {
    email: string;
    password: string;
  };
}

dotenv.config();

async function loginController(req: LoginRequest, res: Response) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Missing fields" });
    }

    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET || "mysecret",
      { expiresIn: "1h" }
    );

    return res.status(200).json({
      message: "Login successful",
      data: {
        user: { id: user._id, name: user.name, email: user.email },
        token,
      },
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
}

export default loginController;
