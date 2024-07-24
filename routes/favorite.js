const express = require('express');
const router = express.Router();
const Favorite = require('../models/favorite');

// Get all favorites
router.get('/', async (req, res) => {
  try {
    const favorites = await Favorite.find().populate('user nail_art_style');
    res.render('favorites', { favorites });
} catch (error) {
    console.log(error);
    res.redirect('/');
  };
});

// Create a new favorite
router.post('/', async (req, res) => {
  const favorite = new Favorite({
    user: req.user._id,
    nail_art_style: req.body.nail_art_style
  });

  try {
    const newFavorite = await favorite.save();
    res.redirect('/favorites');
} catch (error) {
    console.log(error);
    res.redirect('/');
  };
});

// Delete a favorite
router.delete('/:id', getFavorite, async (req, res) => {
  try {
    await res.favorite.remove();
    res.redirect('/favorites');
} catch (error) {
    console.log(error);
    res.redirect('/');
  };
});

async function getFavorite(req, res, next) {
    let favorite;
    try {
      favorite = await Favorite.findById(req.params.id).populate('user nail_art_style');
      if (favorite == null) {
        return res.status(404).json({ message: 'Cannot find favorite' });
      }
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
    res.favorite = favorite;
    next();
  }

module.exports = router;
