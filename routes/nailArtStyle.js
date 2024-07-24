const express = require('express');
const router = express.Router();
const NailArtStyle = require('../models/nailArtStyle');

// Get all nail art styles
router.get('/', async (req, res) => {
  try {
    const styles = await NailArtStyle.find({});
    res.render('gallery', { styles, user: req.user });
} catch (error) {
    console.log(error);
    res.redirect('/')
  };
});

// Create a new nail art style
router.post('/add', async (req, res) => {
    console.log('POST /nail-art-styles/add'); // Debug logging
    console.log('Request body:', req.body); // Debug logging
  const style = new NailArtStyle({
    title: req.body.title,
    description: req.body.description,
    image_url: req.body.image_url,
    category: req.body.category,
    user: req.user._id
  });

  try {
    const newStyle = await style.save();
    res.redirect('/profile');
} catch (error) {
    console.log(error);
    res.redirect('/')
  };
});

// Get a nail art style by ID
router.get('/:id', getNailArtStyle, (req, res) => {
  res.render('detail', { style: res.style, user: req.user });
});

// Update a nail art style
router.patch('/:id', getNailArtStyle, async (req, res) => {
  if (req.body.title != null) {
    res.style.title = req.body.title;
  }
  if (req.body.description != null) {
    res.style.description = req.body.description;
  }
  if (req.body.image_url != null) {
    res.style.image_url = req.body.image_url;
  }
  if (req.body.category != null) {
    res.style.category = req.body.category;
  }

  try {
    const updatedStyle = await res.style.save();
    res.redirect(`/detail/${res.style._id}`);
} catch (error) {
    console.log(error);
    res.redirect('/')
  };
});

// Delete a nail art style
router.delete('/:id', getNailArtStyle, async (req, res) => {
  try {
    await res.style.remove();
    res.redirect('/profile');
} catch (error) {
    console.log(error);
    res.redirect('/')
  };
});

async function getNailArtStyle(req, res, next) {
    let style;
    try {
      style = await NailArtStyle.findById(req.params.id).populate('category user');
      if (style == null) {
        return res.status(404).json({ message: 'Cannot find nail art style' });
      }
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
    res.style = style;
    next();
  }

module.exports = router;
