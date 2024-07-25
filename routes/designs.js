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
  try {
    const newDesign = new Design({
      ...req.body.design,
      author: req.session.userId,
      image: req.file ? `/uploads/${req.file.filename}` : undefined
    });
    await newDesign.save();
    res.redirect(`/designs/${newDesign._id}`);
  } catch (error) {
    console.error(error);
    res.redirect('/new');
  }
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
  } catch (error) {
    console.error(error);
    res.redirect('/');
  }
});

// Edit Design
router.get('/:id/edit', isLoggedIn, async (req, res) => {
  try {
    const design = await Design.findById(req.params.id);
    res.render('designs/edit', { design });
  } catch (error) {
    console.error(error);
    res.redirect('/');
  }
});

// Update Design
router.put('/:id', isLoggedIn, async (req, res) => {
  try {
    const design = await Design.findByIdAndUpdate(req.params.id, req.body.design, { new: true });
    if (req.file) {
      design.image = `/uploads/${req.file.filename}`;
    }
    await design.save();
    res.redirect(`/designs/${design._id}`);
  } catch (error) {
    console.error(error);
    res.redirect(`/designs/${req.params.id}/edit`);
  }
});

// Delete Design
router.delete('/:id', isLoggedIn, async (req, res) => {
  try {
    await Design.findByIdAndDelete(req.params.id);
    res.redirect('/home');
  } catch (error) {
    console.error(error);
    res.redirect('/');
  }
});

// Filter by Category
router.get('/category/:category', async (req, res) => {
  try {
    const designs = await Design.find({ category: req.params.category }).populate('author');
    res.render('index', { designs });
  } catch (error) {
    console.error(error);
    res.redirect('/');
  }
});

module.exports = router;
