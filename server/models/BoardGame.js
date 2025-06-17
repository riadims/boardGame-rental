// models/BoardGame.js
// Mongoose schema and model for board games in the rental system.
// Defines all properties and relationships for a board game document.

import mongoose from "mongoose";

/**
 * BoardGame Schema
 * Represents a board game in the rental system.
 *
 * Fields:
 * - title: Name of the board game (unique, required)
 * - category: Category or genre of the game
 * - description: Description of the game
 * - available: Whether the game is available for rent
 * - borrowedBy: User ID of the person who borrowed the game (null if available)
 * - borrowedDate: Date when the game was borrowed
 * - returnDate: Date when the game should be returned
 * - owner: Reference to the User who owns the game (required)
 * - timestamps: Automatically managed createdAt and updatedAt fields
 */
const boardGameSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
    category: {
      type: String,
    },
    description: {
      type: String,
    },
    available: {
      type: Boolean,
      default: true,
    },
    borrowedBy: {
      type: String, // User ID of the borrower
      default: null,
    },
    borrowedDate: {
      type: Date,
      default: null,
    },
    returnDate: {
      type: Date,
      default: null,
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    }
  },
  { timestamps: true }
);

export default mongoose.model("BoardGame", boardGameSchema);
