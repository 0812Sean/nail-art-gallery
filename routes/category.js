const express = require('express');
const router = express.Router();
const Category = require('../models/category');

// Get all categories
router.get('/', async (req, res) => {
  try {
    const categories = await Category.find();
    res.render('categories', { categories });
} catch (error) {
    console.log(error);
    res.redirect('/');
  };
});

// Create a new category
router.post('/', async (req, res) => {
  const category = new Category({
    name: req.body.name
  });

  try {
    const newCategory = await category.save();
    res.redirect('/categories');
} catch (error) {
    console.log(error);
    res.redirect('/');
  };
});

// Get a category by ID
router.get('/:id', getCategory, (req, res) => {
  res.render('category_detail', { category: res.category });
});

// Update a category
router.patch('/:id', getCategory, async (req, res) => {
  if (req.body.name != null) {
    res.category.name = req.body.name;
  }

  try {
    const updatedCategory = await res.category.save();
    res.redirect(`/categories/${res.category._id}`);
} catch (error) {
    console.log(error);
    res.redirect('/');
  };
});

// Delete a category
router.delete('/:id', getCategory, async (req, res) => {
  try {
    await res.category.remove();
    res.redirect('/categories');
} catch (error) {
    console.log(error);
    res.redirect('/');
  };
});

async function getCategory(req, res, next) {
  let category;
  try {
    category = await Category.findById(req.params.id);
    if (category == null) {
      return res.status(404).json({ message: 'Cannot find category' });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
  res.category = category;
  next();
}

module.exports = router;
