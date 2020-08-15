const { randomBytes } = require('crypto');
const axios = require('axios');

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

    await axios.post(`${process.env.EVENT_BUS_URL}/events`, {
      data: {
        id,
        title,
      },
      service: 'Posts',
      type: 'PostCreated',
    });

    res.status(201).json(posts[id]);
  }
}

module.exports = PostsController;
