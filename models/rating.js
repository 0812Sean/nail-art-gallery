const mongoose = require('mongoose');

const ratingSchema = new mongoose.Schema({
  user: { 
    type: String, 
    required: true, 
},
  nail_art_style: { 
    type: String, required: true 
},
  score: { 
    type: Number, 
    required: true, 
},
});

module.exports = mongoose.model('Rating', ratingSchema);
