const express = require('express');

const router = express.Router();

const PostsController = require('./controllers/PostsController');
const postsController = new PostsController();

router.get('/', postsController.getPosts);

router.post('/', postsController.createPost);

module.exports = router;
