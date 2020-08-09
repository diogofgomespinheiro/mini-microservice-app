const express = require('express');
const cors = require('cors');
const routes = require('./routes');

const app = express();

const PORT = process.env.PORT || 4000;

app.use(express.json());
app.use(cors());
app.use('/posts', routes);

app.post('/events', (req, res) => {
  console.log('Received Event:', req.body.type);

  res.send({});
});

app.listen(PORT, () => {
  console.log(`Listening on ${PORT}`);
});
