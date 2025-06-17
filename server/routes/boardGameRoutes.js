// routes/boardGameRoutes.js
// Express routes for board game management (CRUD, rent, return, user games).
// All protected routes require authentication via JWT.

import express from "express";
import BoardGame from "../models/BoardGame.js";
import protect from "../middleware/authMiddleware.js";

const router = express.Router();

/**
 * @route   GET /api/games/
 * @desc    Get all board games
 * @access  Public
 */
router.get('/', async (req, res) => {
  try {
    const games = await BoardGame.find();
    res.json(games);
  } catch (err) {
    res.status(500).json({ message: 'Napaka pri pridobivanju iger.' });
  }
});

/**
 * @route   GET /api/games/:id
 * @desc    Get a single board game by ID
 * @access  Public
 */
router.get("/:id", async (req, res) => {
  try {
    const game = await BoardGame.findById(req.params.id);
    if (!game) return res.status(404).json({ message: "Game not found" });
    res.json(game);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

/**
 * @route   PUT /api/games/:id
 * @desc    Update a board game (admin or owner)
 * @access  Private
 */
router.put("/:id", protect, async (req, res) => {
  try {
    const game = await BoardGame.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!game) return res.status(404).json({ message: "Game not found" });
    res.json(game);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

/**
 * @route   DELETE /api/games/:id
 * @desc    Delete a board game
 * @access  Private
 */
router.delete("/:id", protect, async (req, res) => {
  try {
    const game = await BoardGame.findByIdAndDelete(req.params.id);
    if (!game) return res.status(404).json({ message: "Game not found" });
    res.json({ message: "Game deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

/**
 * @route   PUT /api/games/rent/:id
 * @desc    Rent a board game (mark as borrowed)
 * @access  Private
 */
router.put("/rent/:id", protect, async (req, res) => {
  try {
    const game = await BoardGame.findById(req.params.id);

    if (!game) return res.status(404).json({ message: "Game not found" });

    if (!game.available) {
      return res.status(400).json({ message: "Game already borrowed" });
    }

    game.available = false;
    game.borrowedBy = req.user._id;
    game.borrowedDate = new Date();
    game.returnDate = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // 7 days from now

    await game.save();
    res.json(game);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

/**
 * @route   PUT /api/games/return/:id
 * @desc    Return a borrowed board game
 * @access  Private
 */
router.put("/return/:id", protect, async (req, res) => {
  try {
    const game = await BoardGame.findById(req.params.id);

    if (!game) return res.status(404).json({ message: "Game not found" });
    if (game.available === true) {
      return res.status(400).json({ message: "Game is not currently borrowed" });
    }
    if (String(game.borrowedBy) !== String(req.user._id)) {
      return res.status(403).json({ message: "You did not borrow this game" });
    }

    game.available = true;
    game.borrowedBy = null;
    game.borrowedDate = null;
    game.returnDate = null;

    await game.save();
    res.json(game);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

/**
 * @route   GET /api/games/my-games
 * @desc    Get all games owned by the current user
 * @access  Private
 */
router.get('/my-games', protect, async (req, res) => {
  try {
    const games = await BoardGame.find({ owner: req.user._id });
    res.json(games);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

/**
 * @route   POST /api/games/
 * @desc    Create a new board game
 * @access  Private
 */
router.post("/", protect, async (req, res) => {
  const { title, description, category, available } = req.body;

  if (!title) {
    return res.status(400).json({ message: "Naslov igre je obvezen." });
  }
  // console.log("Creating game with owner:", req.user?._id);
  try {
    const newGame = new BoardGame({
      title,
      description,
      category,
      available: available !== undefined ? available : true, // enforce true if not provided
      owner: req.user && req.user._id ? req.user._id : null,
    });

    const savedGame = await newGame.save();
    res.status(201).json(savedGame);
  } catch (err) {
    // console.error(err);
    res.status(500).json({ message: "Napaka pri shranjevanju igre." });
  }
});

/**
 * @route   GET /api/games/borrowed
 * @desc    Get all games borrowed by the current user
 * @access  Private
 */
router.get("/borrowed", protect, async (req, res) => {
  try {
    const games = await BoardGame.find({ borrowedBy: req.user._id });
    res.json(games);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

export default router;
