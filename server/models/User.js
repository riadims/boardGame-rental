// models/User.js
// Mongoose schema and model for users in the board game rental system.
// Handles user authentication, password hashing, and password comparison.

import mongoose from "mongoose";
import bcrypt from "bcryptjs";

/**
 * User Schema
 * Represents a user in the system.
 *
 * Fields:
 * - username: Unique username for the user (required, trimmed)
 * - email: Unique email address (required, lowercase)
 * - password: Hashed password (required)
 * - timestamps: Automatically managed createdAt and updatedAt fields
 */
const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

/**
 * Pre-save middleware to hash the password before saving the user document.
 * Only hashes if the password field is modified.
 */
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

/**
 * Compares a provided password with the stored hashed password.
 * @param {string} enteredPassword - The password to compare.
 * @returns {Promise<boolean>} - True if passwords match, false otherwise.
 */
userSchema.methods.matchPassword = function (enteredPassword) {
  return bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model("User", userSchema);
export default User;
