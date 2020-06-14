const { randomBytes } = require('crypto');
const posts = {};

class PostsController {
  async getPosts(req, res) {
    res.status(200).json(posts);
  }

  async createPost(req, res) {
    const id = randomBytes(4).toString('hex');
    const { title } = req.body;

    posts[id] = {
      id,
      title,
    };

    res.status(201).json(posts[id]);
  }
}

module.exports = PostsController;
