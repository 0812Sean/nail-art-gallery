const express = require('express');
const router = express.Router();
const Design = require('../models/design');

router.get('/', async (req, res) => {
  const designs = await Design.find({}).populate('author');
  res.render('index.ejs', { designs });
});

module.exports = router;
