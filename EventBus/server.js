const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();

const PORT = process.env.PORT || 4005;

app.use(express.json());
app.use(cors());

const events = [];

app.post('/events', async (req, res) => {
  const event = req.body;
  console.log('Received Event:', event);

  events.push(event);

  try {
    await axios.post(`${process.env.POSTS_SERVICE_URL}/events`, event);
    await axios.post(`${process.env.COMMENTS_SERVICE_URL}/events`, event);
    await axios.post(`${process.env.QUERY_SERVICE_URL}/events`, event);
    await axios.post(`${process.env.MODERATION_SERVICE_URL}/events`, event);
  } catch (error) {
    res.status(400).json({ msg: 'There was an error emiting an event' });
    console.error('There was an error emiting an event');
    console.error(error);
  }

  res.send({ status: 'OK' });
});

app.get('/events', (req, res) => {
  res.send(events);
});

app.listen(PORT, () => {
  console.log(`Listening on ${PORT}`);
});
