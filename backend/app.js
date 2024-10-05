const express = require('express');
const controllers = require('./src/controllers');
var bodyParser = require('body-parser');

var jsonParser = bodyParser.json();

const app = express();
const port = 3000;
require('dotenv').config();


app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.post('/event', jsonParser, controllers.createEvent);
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
