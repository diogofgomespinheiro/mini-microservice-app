const express = require('express');

const router = express.Router();

const CommentsController = require('./controllers/CommentsController');
const commentsController = new CommentsController();

router.get('/posts/:id/comments', commentsController.getCommentsByPostId);

router.post('/posts/:id/comments', commentsController.createCommentByPostId);

module.exports = router;
