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

    try {
      axios.post(`${process.env.EVENT_BUS_URL}/events`, {
        data: {
          ...comment,
          postId,
        },
        service: 'Comments',
        type: 'CommentCreated',
      });
    } catch (error) {
      res.status(400).json({ msg: 'There was an error creating the comment' });
      console.error('There was an error creating the comment');
      console.error(error);
    }

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
        await axios.post(`${process.env.EVENT_BUS_URL}/events`, {
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
        res
          .status(400)
          .json({ msg: 'There was an error updating the comment' });
        console.error('There was an error updating the comment');
        console.error(error);
      }
    }

    res.send({});
  }
}

module.exports.commentsByPostId = commentsByPostId;
module.exports = CommentsController;
