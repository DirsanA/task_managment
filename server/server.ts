import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/config.js";
import userRoute from "./routes/userRoutes.js";
import User from "./model/userModel.js"; // capitalized by convention

dotenv.config();

const app = express();
app.use(express.json()); // parse JSON bodies
app.use("/", userRoute);

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

// POST /post
app.post("/post", async (req: any, res: any) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).send({
        message: "All filds are required",
      });
    }
    const newUser = new User({
      name,
      email,
      password,
    });
    await newUser.save();
    return res.status(201).send({
      message: "User is created",
    });
  } catch (error) {
    console.log(error);
  }
});

// get user

app.get("/get", async (req: any, res: any) => {
  try {
    const user = await User.find({});
    if (user.length === 0) {
      console.log("user not found");
      return res.status(404).send({
        message: "User not found",
        data: [],
      });
    }
    return res.status(200).send({
      message: "user found",
      data: user,
    });
  } catch (error) {
    console.log(error);
  }
});

tryToConnect();
