const express = require('express');
const router = express.Router();
const User = require('../models/user');

// Get all users
router.get('/', async (req, res) => {
  try {
    const users = await User.find();
    res.render('users', { users });
  } catch (error) {
    console.log(error);
    res.redirect('/');
  };
});

// Create a new user
router.post('/', async (req, res) => {
  const user = new User({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
    bio: req.body.bio,
    profile_picture_url: req.body.profile_picture_url
  });

  try {
    const newUser = await user.save();
    res.redirect('/users');
   } catch (error) {
    console.log(error);
    res.redirect('/')
   };
});

// Get a user by ID
router.get('/:id', getUser, (req, res) => {
  res.render('user_detail', { user: res.user });
});

// Update a user
router.patch('/:id', getUser, async (req, res) => {
  if (req.body.username != null) {
    res.user.username = req.body.username;
  }
  if (req.body.email != null) {
    res.user.email = req.body.email;
  }
  if (req.body.password != null) {
    res.user.password = req.body.password;
  }
  if (req.body.bio != null) {
    res.user.bio = req.body.bio;
  }
  if (req.body.profile_picture_url != null) {
    res.user.profile_picture_url = req.body.profile_picture_url;
  }

  try {
    const updatedUser = await res.user.save();
    res.redirect(`/users/${res.user._id}`);
  } catch (error) {
    console.log(error);
    res.redirect('/')
  };
});

// Delete a user
router.delete('/:id', getUser, async (req, res) => {
  try {
    await res.user.remove();
    res.redirect('/users');
  } catch (error) {
    console.log(error);
    res.redirect('/')
  };
});

async function getUser(req, res, next) {
    let user;
    try {
      user = await User.findById(req.params.id);
      if (user == null) {
        return res.status(404).json({ message: 'Cannot find user' });
      }
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
    res.user = user;
    next();
  }


module.exports = router;
