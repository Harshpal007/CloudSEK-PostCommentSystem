const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 3000;

const routes = require('./routes/index');

app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('Test!');
});

app.use(routes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});