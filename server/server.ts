import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/config.js";
import userRoute from "./routes/userRoutes.js";
import loginRoute from "./routes/loginRoute.js";
import taskRoute from "./routes/taskRoute.js";

dotenv.config();

const app = express();
app.use(cors());

app.use(express.json());
app.use("/", userRoute);
app.use("/", loginRoute);
app.use("/", taskRoute);
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

tryToConnect();
