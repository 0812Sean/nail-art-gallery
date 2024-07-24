const mongoose = require('mongoose');

const nailArtStyleSchema = new mongoose.Schema({
  title: { 
    type: String, 
    required: true 
},
  description: String,
  image_url: { type: String, required: true },
  category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
});

module.exports = mongoose.model('NailArtStyle', nailArtStyleSchema);
