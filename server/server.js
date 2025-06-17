// server.js
// Main entry point for the Board Game Rental backend server.
// Sets up Express, connects to MongoDB, and configures all API routes and middleware.

import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import authRoutes from "./routes/authRoutes.js";
import protect from "./middleware/authMiddleware.js";
import userRoutes from "./routes/userRoutes.js";
import boardGameRoutes from "./routes/boardGameRoutes.js";

dotenv.config();

const app = express();

// Enable CORS for frontend and local API testing
app.use(
  cors({
    origin: ["http://localhost:5173", "http://localhost:5000"], // Allowed frontend origins
  })
);

// Parse incoming JSON requests
app.use(express.json());

// Authentication routes (register, login)
app.use("/api/auth", authRoutes);
// User management routes (profile, password change, etc.)
app.use("/api/users", userRoutes);
// Board game management routes (CRUD, rent/return)
app.use("/api/games", boardGameRoutes);

// Root route for health check
app.get("/", (req, res) => {
  res.send("Board Game Rental API is running");
});

// Connect to MongoDB and start the server
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected");
    app.listen(process.env.PORT || 5000, () => {
      console.log(`Server running on port ${process.env.PORT || 5000}`);
    });
  })
  .catch((err) => console.error("DB connection error:", err));


