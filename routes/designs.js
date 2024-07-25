const express = require('express');
const router = express.Router();
const Design = require('../models/design');
const { isLoggedIn } = require('../middleware');

// New Design
router.get('/new', isLoggedIn, (req, res) => {
  res.render('designs/create');
});

// Create Design
router.post('/', isLoggedIn, async (req, res) => {
  const newDesign = new Design(req.body.design);
  newDesign.author = req.session.userId;
  if (req.file) {
    newDesign.image = `/uploads/${req.file.filename}`;
  }
  await newDesign.save();
  res.redirect(`/designs/${newDesign._id}`);
});

// Show Design
router.get('/:id', async (req, res) => {
    try {
      const design = await Design.findById(req.params.id)
        .populate('author')
        .populate({
          path: 'comments',
          populate: { path: 'author' }
        });
      res.render('designs/show', { design });
    } catch (e) {
      console.error(e);
      res.redirect('/');
    }
  });

// Edit Design
router.get('/:id/edit', isLoggedIn, async (req, res) => {
  const design = await Design.findById(req.params.id);
  res.render('designs/edit', { design });
});

// Update Design
router.put('/:id', isLoggedIn, async (req, res) => {
  const design = await Design.findByIdAndUpdate(req.params.id, req.body.design);
  if (req.file) {
    design.image = `/uploads/${req.file.filename}`;
  }
  await design.save();
  res.redirect(`/designs/${design._id}`);
});

// Delete Design
router.delete('/:id', isLoggedIn, async (req, res) => {
  await Design.findByIdAndDelete(req.params.id);
  res.redirect('/home');
});

// Filter by Category
router.get('/category/:category', async (req, res) => {
    const category = req.params.category;
    const designs = await Design.find({ category }).populate('author');
    res.render('index', { designs });
  });

module.exports = router;
