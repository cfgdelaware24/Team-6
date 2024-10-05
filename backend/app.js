const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
require('dotenv').config();

const authRoutes = require('./Routes/authRoutes');
const chatRoutes = require('./Routes/chatRoutes');
// const eventsController = require('./src/controllers');

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(morgan('dev'));
app.use(bodyParser.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/risk-assessment', chatRoutes);

// Basic route
app.get('/', (req, res) => {
  res.send('Heart in the Game API');
});

// Events route
// app.post('/event', eventsController.createEvent);

// API routes
// app.use('/api/events', eventsController);

// 404 Route
app.use((req, res, next) => {
  res.status(404).send("Sorry, that route doesn't exist.");
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

module.exports = app;