const { randomBytes } = require('crypto');
const commnetsByPostId = {};

class CommentsController {
  async getCommentsByPostId(req, res) {
    const { id: postId } = req.params;
    res.status(200).json(commnetsByPostId[postId] || []);
  }

  async createCommentByPostId(req, res) {
    const { id: postId } = req.params;
    const commentId = randomBytes(4).toString('hex');
    const { content } = req.body;

    const comments = commnetsByPostId[postId] || [];
    comments.push({ content, id: commentId });

    commnetsByPostId[postId] = comments;

    res.status(201).json(comments);
  }
}

module.exports = CommentsController;
