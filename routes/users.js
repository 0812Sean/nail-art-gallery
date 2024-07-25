const express = require('express');
const User = require('../models/user');
const Design = require('../models/design');
const router = express.Router();
const bcrypt = require('bcryptjs');

// Middleware
const isLoggedIn = (req, res, next) => {
  if (!req.session.userId) {
    return res.redirect('/users/login');
  }
  next();
};

// Register
router.get('/register', (req, res) => {
  res.render('users/register');
});

router.post('/register', async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = new User({ username, password });
    await user.save();
    req.session.userId = user._id;
    res.redirect('/home');
  } catch (e) {
    res.redirect('/users/register');
  }
});

// Login
router.get('/login', (req, res) => {
  res.render('users/login');
});

router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  if (user && await user.comparePassword(password)) {
    req.session.userId = user._id;
    res.redirect('/home');
  } else {
    res.redirect('/login');
  }
});

// Logout
router.get('/logout', (req, res) => {
  req.session.destroy();
  res.redirect('/');
});

// Follow User
router.post('/:id/follow', isLoggedIn, async (req, res) => {
    try {
      const userToFollow = await User.findById(req.params.id);
      const currentUser = await User.findById(req.session.userId);
        if (!currentUser.following.includes(userToFollow._id)) {
        currentUser.following.push(userToFollow._id);
        await currentUser.save();
      }
  
      res.redirect(`/users/${userToFollow._id}`);
    } catch (e) {
      console.error(e);
      res.redirect('/');
    }
  });

  // Unfollow User
router.post('/:id/unfollow', isLoggedIn, async (req, res) => {
  try {
    const userToUnfollow = await User.findById(req.params.id);
    const currentUser = await User.findById(req.session.userId);

    if (currentUser.following.includes(userToUnfollow._id)) {
      currentUser.following = currentUser.following.filter(
        (userId) => !userId.equals(userToUnfollow._id)
      );
      await currentUser.save();
    }

    res.redirect(`/users/${userToUnfollow._id}`);
  } catch (e) {
    console.error(e);
    res.redirect('/');
  }
});

// View User Profile
router.get('/:id', async (req, res) => {
  const user = await User.findById(req.params.id).populate('following');
  const designs = await Design.find({ author: user._id });
  const currentUser = await User.findById(req.session.userId).populate('following');

  res.render('users/profile', { user, designs, currentUser });
});

module.exports = router;
