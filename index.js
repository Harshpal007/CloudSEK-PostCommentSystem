const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 4000;

const postRoutes = require('./routes/postRoutes');

app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('Test!');
});

//routes
app.use('/posts', postRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});