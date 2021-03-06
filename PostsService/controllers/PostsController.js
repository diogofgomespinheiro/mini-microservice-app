const { randomBytes } = require('crypto');
const axios = require('axios');

const posts = {};

class PostsController {
  async createPost(req, res) {
    const id = randomBytes(4).toString('hex');
    const { title } = req.body;

    posts[id] = {
      id,
      title,
    };

    try {
      await axios.post(`${process.env.EVENT_BUS_URL}/events`, {
        data: {
          id,
          title,
        },
        service: 'Posts',
        type: 'PostCreated',
      });
    } catch (error) {
      res.status(400).json({ msg: 'There was an error creating a post' });
      console.error('There was an error creating a post');
      console.error(error);
    }

    res.status(201).json(posts[id]);
  }
}

module.exports = PostsController;
