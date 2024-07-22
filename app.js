const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const session = require('express-session');


// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI);
mongoose.connection.on('connected', () => {
  console.log(`Connected to MongoDB ${mongoose.connection.name}.`);
});

app.use(express.urlencoded({ extended: false }));
app.use(methodOverride('_method'));
app.use(
    session({
      secret: process.env.SESSION_SECRET,
      resave: false,
      saveUninitialized: true,
    })
  );

  app.get('/', (req, res) => {
    res.render('index.ejs', {
      user: req.session.user,
    });
  });

  app.get('/register', (req, res) => {
    res.render('register.ejs');
  });

  app.get('/login', (req, res) => {
    res.render('login.ejs');
  });

  app.get('/logout', (req, res) => {
    req.logout();
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

// Middleware
app.set('view engine', 'ejs');



app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
