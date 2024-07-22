const mongoose = require('mongoose');

const favoriteSchema = new mongoose.Schema({
  user: {
    type: String,
    required: true,
},
  nail_art_style: { 
    type: String, 
    required: true ,
},
});

module.exports = mongoose.model('Favorite', favoriteSchema);
