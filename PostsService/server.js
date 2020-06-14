const express = require('express');
const routes = require('./routes');

const app = express();

const PORT = process.env.PORT || 4000;

app.use(express.json());
app.use('/posts', routes);

app.listen(PORT, () => {
  console.log(`Listening on ${PORT}`);
});
