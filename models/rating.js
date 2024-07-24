const mongoose = require('mongoose');

const ratingSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    nail_art_style: { type: mongoose.Schema.Types.ObjectId, ref: 'NailArtStyle' },
    score: { type: Number, required: true, min: 1, max: 5 }
  });

module.exports = mongoose.model('Rating', ratingSchema);
