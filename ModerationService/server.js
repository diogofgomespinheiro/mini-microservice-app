const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();

const PORT = process.env.PORT || 4003;

app.use(express.json());
app.use(cors());

const handleEvent = async ({ type, data }) => {
  if (type === 'CommentCreated') {
    const status = data.content.includes('orange') ? 'rejected' : 'approved';

    await axios.post('http://localhost:4005/events', {
      data: {
        content: data.content,
        id: data.id,
        postId: data.postId,
        status,
      },
      service: 'Moderation',
      type: 'CommentModerated',
    });
  }
};

app.post('/events', async (req, res) => {
  const { type, data } = req.body;
  console.log('Received Event:', type);

  handleEvent({ data, type });

  res.send({});
});

app.listen(PORT, async () => {
  console.log(`Listening on ${PORT}`);

  const res = await axios.get('http://localhost:4005/events');

  res.data.forEach(event => {
    console.log('Processing Event', event);
    handleEvent({ data: event.data, type: event.type });
  });
});
