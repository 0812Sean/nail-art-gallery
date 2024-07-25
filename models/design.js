const mongoose = require('mongoose');

const DesignSchema = new mongoose.Schema({
  title: String,
  description: String,
  category: String,
  image: String,
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  comments: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Comment'
  }]
});

module.exports = mongoose.model('Design', DesignSchema);
