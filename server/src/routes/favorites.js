const express = require('express');
const router = express.Router();
const Favorite = require('../models/Favorite');
const authMiddleware = require('../middleware/auth');

// All routes require authentication
router.use(authMiddleware);

// GET /api/favorites — get logged-in user's favorites
router.get('/', async (req, res) => {
  try {
    const favorites = await Favorite.find({ userId: req.user._id }).sort({ createdAt: -1 });
    res.json({ success: true, data: favorites });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// GET /api/favorites/ids — get mealIds only (for quick heart icon lookup)
router.get('/ids', async (req, res) => {
  try {
    const favorites = await Favorite.find({ userId: req.user._id }, 'mealId');
    res.json({ success: true, data: favorites.map((f) => f.mealId) });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// POST /api/favorites — add a favorite
router.post('/', async (req, res) => {
  try {
    const { mealId, strMeal, strMealThumb, strCategory, strArea, strTags } = req.body;

    if (!mealId || !strMeal || !strMealThumb) {
      return res.status(400).json({ success: false, message: 'mealId, strMeal, and strMealThumb are required.' });
    }

    const existing = await Favorite.findOne({ userId: req.user._id, mealId });
    if (existing) {
      return res.status(409).json({ success: false, message: 'Already in favorites.' });
    }

    const favorite = await Favorite.create({
      userId: req.user._id,
      mealId,
      strMeal,
      strMealThumb,
      strCategory: strCategory || '',
      strArea: strArea || '',
      strTags: strTags || '',
    });

    res.status(201).json({ success: true, data: favorite });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// DELETE /api/favorites/:mealId — remove a favorite
router.delete('/:mealId', async (req, res) => {
  try {
    const deleted = await Favorite.findOneAndDelete({
      userId: req.user._id,
      mealId: req.params.mealId,
    });

    if (!deleted) {
      return res.status(404).json({ success: false, message: 'Favorite not found.' });
    }

    res.json({ success: true, message: 'Removed from favorites.' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

module.exports = router;
