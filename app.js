const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const session = require('express-session');
const User = require('./models/user');
const NailArtStyle = require('./models/nailArtStyle');
const morgan = require('morgan')
const { isAuthenticated } = require('./middlewares/auth');
const bcrypt = require('bcryptjs');
const Category = require('./models/category');


// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI);
mongoose.connection.on('connected', () => {
  console.log(`Connected to MongoDB ${mongoose.connection.name}.`);
});

// Middleware
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride('_method'));
app.use(express.static('public'));

app.use(
    session({
      secret: process.env.SESSION_SECRET,
      resave: false,
      saveUninitialized: false,
    })
  );

const userRoutes = require('./routes/user.js');
const nailArtStyleRoutes = require('./routes/nailArtStyle.js');
const favoriteRoutes = require('./routes/favorite.js');
const ratingRoutes = require('./routes/rating.js');
const reviewRoutes = require('./routes/review.js');
const categoryRoutes = require('./routes/category.js');

app.use('/users', userRoutes);
app.use('/nail-art-styles', nailArtStyleRoutes);
app.use('/favorites', favoriteRoutes);
app.use('/ratings', ratingRoutes);
app.use('/reviews', reviewRoutes);
app.use('/categories', categoryRoutes);

// home route
app.get('/', (req, res) => {
    res.render('index.ejs', {
        user: req.session.userId ? req.session.userId : null });
    });

  // Gallery Route
app.get('/gallery', async (req, res) => {
    try {
        const nailArtStyles = await NailArtStyle.find().populate('category user');
        res.render('gallery', { nailArtStyles, user: req.session.userId ? req.session.userId : null });
    } catch (error) {
      console.log(error);
      res.redirect('/')
    }
  });

// Detail Route
app.get('/detail/:id', async (req, res) => {
  try {
    const nailArtStyle = await NailArtStyle.findById(req.params.id).populate('category user');
    const reviews = await Review.find({ nail_art_style: req.params.id }).populate('user');
    res.render('detail', { nailArtStyle, reviews, user: req.session.userId ? req.session.userId : null });
} catch (error) {
    console.log(error);
    res.redirect('/')
  }
});

// Profile Route
app.get('/profile', isAuthenticated, async (req, res) => {
    try {
      const user = await User.findById(req.session.userId);
      if (!user) {
        console.log('User not found in profile route'); // Debug logging
        return res.redirect('/login');
      }
      const nailArtStyles = await NailArtStyle.find({ user: user._id }).populate('category');
      const categories = ['Regular nail polish', 'gel polish', 'Acrylic Nails', 'dipping powder'];
      res.render('profile', { user, nailArtStyles, categories });
    } catch (error) {
        console.log(error);
        res.redirect('/')
      }
    });

app.get('/register', (req, res) => {
    res.render('register.ejs', { user: null });
  });

app.get('/login', (req, res) => {
    res.render('login.ejs', { user: null });
  });

app.get('/logout', (req, res) => {
    req.session.destroy();
    res.redirect('/');
  });

app.post('/register', async (req, res) => {
    const { username, email, password, bio, profile_picture_url } = req.body;
    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = new User({
        username,
        email,
        password: hashedPassword,
        bio,
        profile_picture_url
      });
  
      await user.save();
      res.redirect('/login');
    } catch (error) {
      console.log(error);
      res.redirect('/')
    }
  });

  app.post('/login', async (req, res) => {
    const { username, password } = req.body;
    try {
      const user = await User.findOne({ username });
      if (!user) {
        return res.redirect('/login');
      }
  
      const isMatch = await user.isValidPassword(password);
      if (!isMatch) {
        return res.redirect('/login');
      }
  
      req.session.userId = user._id;
      res.redirect('/profile');
    } catch (error) {
        console.log(error);
        res.redirect('/')
      }
    });



app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
