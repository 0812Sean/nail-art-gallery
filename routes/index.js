const express = require('express');
const router = express.Router();
const Design = require('../models/design');

router.get('/', async (req, res) => {
  const photos = [
    { url: '/images/photo1.jpg', title: 'Photo 1' },
    { url: '/images/photo2.jpg', title: 'Photo 2' },
    { url: '/images/photo3.jpg', title: 'Photo 3' },
  ];
  res.render('home', { photos });
});

router.get('/home', async (req, res) => {
  const designs = await Design.find({}).populate('author');
  res.render('index', { designs });
});

router.get('/login', (req, res) => {
  res.render('users/login');
});

module.exports = router;
