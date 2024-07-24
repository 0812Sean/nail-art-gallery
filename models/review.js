const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    nail_art_style: { type: mongoose.Schema.Types.ObjectId, ref: 'NailArtStyle' },
    comment: { type: String, required: true }
  });

module.exports = mongoose.model('Review', reviewSchema);
