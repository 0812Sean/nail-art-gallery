const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  user: { 
    type: String, 
    required: true, 
},
  nail_art_style: { 
    type: String, 
    required: true, 
},
  comment: { 
    type: String, 
    required: true, 
},
});

module.exports = mongoose.model('Review', reviewSchema);
