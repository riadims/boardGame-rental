import express from "express";
import User from "../models/User.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// Get current user profile
router.get("/me", protect, async (req, res) => {
  const user = await User.findById(req.user._id).select("-password");
  if (user) {
    res.json(user);
  } else {
    res.status(404).json({ message: "User not found" });
  }
});

// GET /api/users/usernames
router.get("/usernames", async (req, res) => {
  try {
    const users = await User.find({}, "username"); // fetch only usernames
    const usernames = users.map(user => user.username);
    res.json(usernames);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// Update user profile
router.put("/me", protect, async (req, res) => {
  const user = await User.findById(req.user._id);

  if (!user) return res.status(404).json({ message: "User not found" });

  const { username, email, password } = req.body;

  if (username) user.username = username;
  if (email) user.email = email;
  if (password) user.password = password;

  await user.save();

  res.json({
    _id: user._id,
    username: user.username,
    email: user.email,
  });
});

// Delete user account
router.delete("/me", protect, async (req, res) => {
  await User.findByIdAndDelete(req.user._id);
  res.json({ message: "User deleted" });
});

router.put("/change-password", protect, async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    console.log("Stored hashed password:", user.password);
    console.log("req.user._id:", req.user._id);
    if (!user) return res.status(404).json({ message: "User not found" });

    const { currentPassword, newPassword } = req.body;
    console.log("Current password received:", currentPassword);

    console.log("Checking password for user:", user._id);
    const isMatch = await user.matchPassword(currentPassword);
    console.log("Password match result:", isMatch);

    if (!isMatch) return res.status(400).json({ message: "Current password is incorrect" });

    user.password = newPassword;
    await user.save();

    res.json({ message: "Password updated successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
