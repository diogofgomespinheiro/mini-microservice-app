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
    await axios.post('http://localhost:4000/events', event);
    await axios.post('http://localhost:4001/events', event);
    await axios.post('http://localhost:4002/events', event);
    await axios.post('http://localhost:4003/events', event);
  } catch (err) {
    console.error(err);
  }

  res.send({ status: 'OK' });
});

app.get('/events', (req, res) => {
  res.send(events);
});

app.listen(PORT, () => {
  console.log(`Listening on ${PORT}`);
});