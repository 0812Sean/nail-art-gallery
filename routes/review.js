const express = require('express');
const router = express.Router();
const Review = require('../models/review');

// Get all reviews
router.get('/', async (req, res) => {
  try {
    const reviews = await Review.find().populate('user nail_art_style');
    res.render('reviews', { reviews });
} catch (error) {
    console.log(error);
    res.redirect('/');
  };
});

// Create a new review
router.post('/', async (req, res) => {
  const review = new Review({
    user: req.user._id,
    nail_art_style: req.body.nail_art_style,
    comment: req.body.comment
  });

  try {
    const newReview = await review.save();
    res.redirect('/reviews');
} catch (error) {
    console.log(error);
    res.redirect('/');
  };
});

// Delete a review
router.delete('/:id', getReview, async (req, res) => {
  try {
    await res.review.remove();
    res.redirect('/reviews');
} catch (error) {
    console.log(error);
    res.redirect('/');
  };
});

async function getReview(req, res, next) {
  let review;
  try {
    review = await Review.findById(req.params.id).populate('user nail_art_style');
    if (review == null) {
      return res.status(404).json({ message: 'Cannot find review' });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
  res.review = review;
  next();
}

module.exports = router;
