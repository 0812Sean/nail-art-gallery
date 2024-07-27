const express = require('express');
const app = express();
const mongoose = require('mongoose');
const session = require('express-session');
const methodOverride = require('method-override');
const dotenv = require('dotenv');
dotenv.config();
const morgan = require('morgan');
const port = process.env.PORT ? process.env.PORT : '3000';
const multer = require('multer');
const path = require('path');

const indexRoutes = require('./routes/index');
const userRoutes = require('./routes/users');
const designRoutes = require('./routes/designs');
const commentRoutes = require('./routes/comments'); 

mongoose.connect(process.env.MONGODB_URI);
mongoose.connection.on('connected', () => {
  console.log(`Connected to MongoDB ${mongoose.connection.name}.`);
});

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, 'public')));

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
  })
);

app.use((req, res, next) => {
    res.locals.currentUser = req.session.userId;
    next();
  });
  
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
});
const upload = multer({ storage: storage });
app.use('/designs', upload.single('image'));

app.use('/', indexRoutes);
app.use('/users', userRoutes);
app.use('/designs', designRoutes);  
app.use('/designs', commentRoutes); 

app.listen(port, () => {
    console.log(`The express app is ready on port ${port}!`);
  });