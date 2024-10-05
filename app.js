const express = require('express');
const controllers = require('./src/controllers');
var bodyParser = require('body-parser');

var jsonParser = bodyParser.json();

const app = express();
const port = 3000;
require('dotenv').config();


// Middleware to parse JSON bodies
app.use(express.json());

// Load the model when the server starts
CardiacArrestPrediction.loadModel().catch(console.error);

app.post('/predict', async (req, res) => {
  try {
    const inputData = req.body.inputData;
    if (!inputData || !Array.isArray(inputData)) {
      return res.status(400).json({ error: 'Invalid input data' });
    }

    const prediction = await CardiacArrestPrediction.predict(inputData);
    res.json({ prediction: Array.from(prediction) });
  } catch (error) {
    console.error('Prediction error:', error);
    res.status(500).json({ error: 'An error occurred during prediction' });
  }
});

app.post('/event', jsonParser, controllers.createEvent);
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});