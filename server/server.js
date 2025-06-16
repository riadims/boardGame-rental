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

app.use(cors({
  origin: ["http://localhost:3000", "http://localhost:5173", "http://localhost:5000"] // frontend origin
}));
app.use(express.json());

// Middleware
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/games", boardGameRoutes);

// Routes
app.get("/", (req, res) => {
  res.send("Board Game Rental API is running");
});

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected");
    app.listen(process.env.PORT || 5000, () => {
      console.log(`Server running on port ${process.env.PORT || 5000}`);
    });
  })
  .catch((err) => console.error("DB connection error:", err));


