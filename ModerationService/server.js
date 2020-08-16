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

    try {
      await axios.post(`${process.env.EVENT_BUS_URL}/events`, {
        data: {
          content: data.content,
          id: data.id,
          postId: data.postId,
          status,
        },
        service: 'Moderation',
        type: 'CommentModerated',
      });
    } catch (error) {
      res.status(400).json({ msg: 'There was an error processing an event' });
      console.error('There was an error processing an event');
      console.error(error);
    }
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

  try {
    const res = await axios.get(`${process.env.EVENT_BUS_URL}/events`);
    res.data.forEach(event => {
      console.log('Processing Event', event);
      handleEvent({ data: event.data, type: event.type });
    });
  } catch (error) {
    res.status(400).json({ msg: 'There was an error processing an event' });
    console.error('There was an error processing an event');
    console.error(error);
  }
});
