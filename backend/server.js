import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";

import connectDb from "./config/db.js";
import AuthRouter from "./Routes/AuthRouter.js";
import carRoutes from "./Routes/carRoutes.js";
import authRouter from './Routes/authRouter.js'
import userRouter from './Routes/userRouter.js'
const app = express();

const PORT = process.env.PORT || 8000;

app.use(cors());
app.use(express.json());

app.use("/api/car", carRoutes);
app.use("/api/auth", authRouter)
app.use("/api/user", userRouter)

const startServer = async () => {
  try {
    await connectDb();

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Server startup failed:", error);
    process.exit(1);
  }
};

startServer()