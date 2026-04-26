const mongoose = require('mongoose');

const favoriteSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
    mealId: {
      type: String,
      required: true,
    },
    strMeal: {
      type: String,
      required: true,
    },
    strMealThumb: {
      type: String,
      required: true,
    },
    strCategory: { type: String, default: '' },
    strArea:     { type: String, default: '' },
    strTags:     { type: String, default: '' },
  },
  { timestamps: true }
);

// Each user can only save a given meal once
favoriteSchema.index({ userId: 1, mealId: 1 }, { unique: true });

module.exports = mongoose.model('Favorite', favoriteSchema);
