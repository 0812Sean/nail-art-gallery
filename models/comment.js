const mongoose = require('mongoose');
const CommentSchema = new mongoose.Schema({
  text: String,
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  design: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Design'
  }
});

module.exports = mongoose.model('Comment', CommentSchema);
