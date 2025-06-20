// routes/userRoutes.js
// Express routes for user profile management and password changes.
// All protected routes require authentication via JWT.

import express from "express";
import User from "../models/User.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

/**
 * @route   GET /api/users/me
 * @desc    Get current user's profile
 * @access  Private
 */
router.get("/me", protect, async (req, res) => {
  const user = await User.findById(req.user._id).select("-password");
  if (user) {
    res.json(user);
  } else {
    res.status(404).json({ message: "User not found" });
  }
});

/**
 * @route   GET /api/users/usernames
 * @desc    Get all usernames (public)
 * @access  Public
 */
router.get("/usernames", async (req, res) => {
  try {
    const users = await User.find({}, "username"); // fetch only usernames
    const usernames = users.map(user => user.username);
    res.json(usernames);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

/**
 * @route   PUT /api/users/me
 * @desc    Update current user's profile
 * @access  Private
 */
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

/**
 * @route   DELETE /api/users/me
 * @desc    Delete current user's account
 * @access  Private
 */
router.delete("/me", protect, async (req, res) => {
  await User.findByIdAndDelete(req.user._id);
  res.json({ message: "User deleted" });
});

/**
 * @route   PUT /api/users/change-password
 * @desc    Change current user's password
 * @access  Private
 */
router.put("/change-password", protect, async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    // console.log("Stored hashed password:", user.password);
    // console.log("req.user._id:", req.user._id);
    if (!user) return res.status(404).json({ message: "User not found" });
    const { currentPassword, newPassword } = req.body;
    // console.log("Current password received:", currentPassword);
    // console.log("Checking password for user:", user._id);
    const isMatch = await user.matchPassword(currentPassword);
    // console.log("Password match result:", isMatch);
    if (!isMatch) return res.status(400).json({ message: "Current password is incorrect" });
    user.password = newPassword;
    await user.save();
    res.json({ message: "Password updated successfully" });
  } catch (err) {
    // console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
