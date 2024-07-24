const express = require('express');
const router = express.Router();
const Rating = require('../models/rating');

// Get all ratings
router.get('/', async (req, res) => {
  try {
    const ratings = await Rating.find().populate('user nail_art_style');
    res.render('ratings', { ratings });
} catch (error) {
    console.log(error);
    res.redirect('/');
  };
});

// Create a new rating
router.post('/', async (req, res) => {
  const rating = new Rating({
    user: req.user._id,
    nail_art_style: req.body.nail_art_style,
    score: req.body.score
  });

  try {
    const newRating = await rating.save();
    res.redirect('/ratings');
} catch (error) {
    console.log(error);
    res.redirect('/');
  };
});

// Delete a rating
router.delete('/:id', getRating, async (req, res) => {
  try {
    await res.rating.remove();
    res.redirect('/ratings');
} catch (error) {
    console.log(error);
    res.redirect('/');
  };
});

async function getRating(req, res, next) {
  let rating;
  try {
    rating = await Rating.findById(req.params.id).populate('user nail_art_style');
    if (rating == null) {
      return res.status(404).json({ message: 'Cannot find rating' });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
  res.rating = rating;
  next();
}

module.exports = router;
