const express = require('express');

const router = express.Router();

const PostsController = require('./controllers/PostsController');
const postsController = new PostsController();

router.post('/create', postsController.createPost);

module.exports = router;
