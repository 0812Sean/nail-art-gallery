const express = require('express');
const router = express.Router();
const Design = require('../models/design');

// Render home page with photo slideshow
router.get('/', (req, res) => {
  const photos = [
    { url: '/images/photo1.jpg', title: 'Photo 1' },
    { url: '/images/photo2.jpg', title: 'Photo 2' },
    { url: '/images/photo3.jpg', title: 'Photo 3' },
    { url: '/images/photo4.jpg', title: 'Photo 4' },
    { url: '/images/photo5.jpg', title: 'Photo 5' },
    { url: '/images/photo6.jpg', title: 'Photo 6' },
  ];
  res.render('home', { photos });
});

// Render design page with all designs
router.get('/home', async (req, res) => {
  try {
    const designs = await Design.find({}).populate('author');
    res.render('index', { designs, });
  } catch (error) {
    console.log(error);
    res.redirect('/');
  }
});

// Render login page
router.get('/login', (req, res) => {
  res.render('users/login');
});

module.exports = router;
