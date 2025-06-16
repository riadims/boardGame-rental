// routes/boardGameRoutes.js
import express from "express";
import BoardGame from "../models/BoardGame.js";
import protect from "../middleware/authMiddleware.js";

const router = express.Router();

// Get all board games
router.get('/', async (req, res) => {
  try {
    const games = await BoardGame.find();
    res.json(games);
  } catch (err) {
    res.status(500).json({ message: 'Napaka pri pridobivanju iger.' });
  }
});

// Get one game by ID
router.get("/:id", async (req, res) => {
  try {
    const game = await BoardGame.findById(req.params.id);
    if (!game) return res.status(404).json({ message: "Game not found" });
    res.json(game);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Update a game (admin or for status updates)
router.put("/:id", protect, async (req, res) => {
  try {
    const game = await BoardGame.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!game) return res.status(404).json({ message: "Game not found" });
    res.json(game);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete a game
router.delete("/:id", protect, async (req, res) => {
  try {
    const game = await BoardGame.findByIdAndDelete(req.params.id);
    if (!game) return res.status(404).json({ message: "Game not found" });
    res.json({ message: "Game deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Rent a board game
router.put("/rent/:id", protect, async (req, res) => {
  try {
    const game = await BoardGame.findById(req.params.id);

    if (!game) return res.status(404).json({ message: "Game not found" });
    if (game.availability === "borrowed") {
      return res.status(400).json({ message: "Game already borrowed" });
    }

    game.availability = "borrowed";
    game.borrowedBy = req.user._id;
    game.borrowedDate = new Date();
    game.returnDate = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // 7 days later

    await game.save();
    res.json(game);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Return a board game
router.put("/return/:id", protect, async (req, res) => {
  try {
    const game = await BoardGame.findById(req.params.id);

    if (!game) return res.status(404).json({ message: "Game not found" });
    if (game.availability === "available") {
      return res.status(400).json({ message: "Game is not currently borrowed" });
    }
    if (String(game.borrowedBy) !== String(req.user._id)) {
      return res.status(403).json({ message: "You did not borrow this game" });
    }

    game.availability = "available";
    game.borrowedBy = null;
    game.borrowedDate = null;
    game.returnDate = null;

    await game.save();
    res.json(game);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get('/my-games', protect, async (req, res) => {
  try {
    const games = await BoardGame.find({ owner: req.user._id });
    res.json(games);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});


router.post("/", protect, async (req, res) => {
  const { title, description, category, available } = req.body;

  if (!title) {
    return res.status(400).json({ message: "Naslov igre je obvezen." });
  }
  console.log("Creating game with owner:", req.user?._id);
  try {
    const newGame = new BoardGame({
      title,
      description,
      category,
      available,
      owner: req.user && req.user._id ? req.user._id : null,
    });
    
    const savedGame = await newGame.save();
    res.status(201).json(savedGame);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Napaka pri shranjevanju igre." });
  }
});



export default router;
