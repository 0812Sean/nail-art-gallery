const mongoose = require('mongoose');

const nailArtStyleSchema = new mongoose.Schema({
  title: { 
    type: String, 
    required: true 
},
  description: String,
  image_url: String,
  category: String,
  user: String,
});

module.exports = mongoose.model('NailArtStyle', nailArtStyleSchema);
