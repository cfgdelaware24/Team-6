const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
require('dotenv').config();

const authRoutes = require('./Routes/authRoutes');
const riskAssessmentRoutes = require('./Routes/chatRoutes');

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/risk-assessment', riskAssessmentRoutes);

// Basic route
app.get('/', (req, res) => {
  res.send('Heart in the Game API');
});

// 404 Route
app.use((req, res, next) => {
  res.status(404).send("Sorry, that route doesn't exist.");
});

app.post('/event', jsonParser, controllers.createEvent);
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

module.exports = app;