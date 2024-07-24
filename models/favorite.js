const mongoose = require('mongoose');

const favoriteSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    nail_art_style: { type: mongoose.Schema.Types.ObjectId, ref: 'NailArtStyle' }
  });

module.exports = mongoose.model('Favorite', favoriteSchema);
