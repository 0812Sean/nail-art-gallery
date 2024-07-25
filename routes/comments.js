const express = require('express');
const router = express.Router();
const Design = require('../models/design');
const Comment = require('../models/comment');
const { isLoggedIn } = require('../middleware');

router.post('/:designId/comments', isLoggedIn, async (req, res) => {
  try {
    const design = await Design.findById(req.params.designId);
    const comment = new Comment(req.body.comment);
    comment.author = req.session.userId;
    comment.design = design._id;
    await comment.save();
    design.comments.push(comment);
    await design.save();
    res.redirect(`/designs/${design._id}`);
  } catch (error) {
    console.log(error);
    res.redirect('/');
  }
});

router.delete('/:designId/comments/:commentId', isLoggedIn, async (req, res) => {
  try {
    const { designId, commentId } = req.params;
    const comment = await Comment.findById(commentId);

    if (comment.author.equals(req.session.userId)) {
      await comment.deleteOne();
      await Design.findByIdAndUpdate(designId, { $pull: { comments: commentId } });
    }

    res.redirect(`/designs/${designId}`);
  } catch (error) {
    console.log(error);
    res.redirect('/');
  }
});
module.exports = router;
