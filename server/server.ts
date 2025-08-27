import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/config.js";
import userModel from "./model/userModel.js";
dotenv.config();

const app = express();

const port: number = Number(process.env.PORT) || 3000;
const tryToConnect = async (): Promise<void> => {
  try {
    await connectDB();
    app.listen(port, () => {
      console.log(`Server is running on http://localhost:${port}`);
    });
  } catch (error) {
    console.error("Database connection failed:", error);
  }
};

app.post("/", function (req: any, res: any) {
  const { name, email, password } = req.body;
  if (!name || !email || password) {
    return res.staus(400).send({
      message: "All fild is required",
    });
  }
  const newUser = new userModel({
    name,
    email,
    password,
  });
  if (newUser) {
    return res.staus(201).send("user is created");
  }
});

tryToConnect();
