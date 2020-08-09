const { randomBytes } = require('crypto');
const axios = require('axios');

const commentsByPostId = {};
const DEFAULT_STATUS = 'pending';

class CommentsController {
  async getCommentsByPostId(req, res) {
    const { id: postId } = req.params;
    res.status(200).json(commentsByPostId[postId] || []);
  }

  async createCommentByPostId(req, res) {
    const { id: postId } = req.params;
    const commentId = randomBytes(4).toString('hex');
    const { content } = req.body;

    const comments = commentsByPostId[postId] || [];
    const comment = { content, id: commentId, status: DEFAULT_STATUS };
    comments.push(comment);

    commentsByPostId[postId] = comments;

    axios.post('http://localhost:4005/events', {
      data: {
        ...comment,
        postId,
      },
      service: 'Comments',
      type: 'CommentCreated',
    });

    res.status(201).json(comments);
  }

  async handleCommentsEvents(req, res) {
    const { type, data } = req.body;
    console.log('Received Event:', type);

    if (type === 'CommentModerated') {
      try {
        const { content, id, postId, status } = data;
        const comments = commentsByPostId[postId];

        const comment = comments.find(commentItem => commentItem.id === id);
        comment.status = status;
        await axios.post('http://localhost:4005/events', {
          data: {
            content,
            id,
            postId,
            status,
          },
          service: 'Comments',
          type: 'CommentUpdated',
        });
      } catch (error) {
        console.error('There was an error updating the comment');
        console.error(error);
      }
    }

    res.send({});
  }
}

module.exports.commentsByPostId = commentsByPostId;
module.exports = CommentsController;
