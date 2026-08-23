import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";

import connectDb from "./config/db.js";
import AuthRouter from "./Routes/AuthRouter.js";
import carRoutes from "./Routes/carRoutes.js";
import userRouter from "./Routes/userRouter.js";
import cron from "node-cron";
import { endBooking } from "./Controller/BookingController.js";

const app = express();

const PORT = process.env.PORT || 8000;

const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:5174",
  "https://renterr-user.vercel.app",
  "https://renterr.vercel.app",
];

app.use(
  cors({
    origin: function (origin, callback) {
      // Allow Postman/server requests
      if (!origin) {
        return callback(null, true);
      }

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      console.log("❌ CORS blocked:", origin);

      return callback(new Error("Not allowed by CORS"));
    },

    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],

    allowedHeaders: [
      "Content-Type",
      "Authorization",
    ],

    credentials: true,
  })
);

app.use(express.json());

app.use((req, res, next) => {
  console.log("REQUEST:", req.method, req.originalUrl);
  next();
});

app.use("/api/car", carRoutes);
app.use("/api/auth", AuthRouter);
app.use("/api/user", userRouter);

app.get("/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Renterr backend is working",
  });
});

const startServer = async () => {
  try {
    await connectDb();

    cron.schedule("0 0 * * *", async () => {
      try {
        await endBooking();
      } catch (err) {
        console.log(
          "Error checking expired bookings:",
          err
        );
      }
    });

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });

  } catch (error) {
    console.error("Server startup failed:", error);
    process.exit(1);
  }
};

startServer();