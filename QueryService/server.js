const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();

const PORT = process.env.PORT || 4002;

app.use(express.json());
app.use(cors());

const posts = {};

const handleEvent = (type, data) => {
  if (type === 'PostCreated') {
    const { id, title } = data;
    posts[id] = { comments: [], id, title };
  }

  if (type === 'CommentCreated') {
    const { content, id: commentId, postId, status } = data;
    const post = posts[postId];
    post.comments.push({ content, id: commentId, status });
  }

  if (type === 'CommentUpdated') {
    const { content, id: commentId, postId, status } = data;

    const post = posts[postId];
    const comment = post.comments.find(
      commentItem => commentItem.id === commentId,
    );

    comment.status = status;
    comment.content = content;
  }
};

app.get('/posts', (req, res) => {
  res.send(posts);
});

app.post('/events', (req, res) => {
  const { type, data } = req.body;
  console.log('Received Event:', type);

  handleEvent(type, data);

  res.send({});
});

app.listen(PORT, async () => {
  console.log(`Listening on ${PORT}`);

  try {
    const res = await axios.get(`${process.env.EVENT_BUS_URL}/events`);

    res.data.forEach(event => {
      console.log('Processing Event', event);
      handleEvent(event.type, event.data);
    });
  } catch (error) {
    res.status(400).json({ msg: 'There was an error processing an event' });
    console.error('There was an error processing an event');
    console.error(error);
  }
});
