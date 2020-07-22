const express = require('express');
const cors = require('cors');
const routes = require('./routes');

const app = express();

const PORT = process.env.PORT || 4001;

app.use(express.json());
app.use(cors());
app.use('', routes);

app.listen(PORT, () => {
  console.log(`Listening on ${PORT}`);
});
