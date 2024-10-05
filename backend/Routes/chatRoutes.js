const express = require('express');
const router = express.Router();
const { 
    getRiskAssessment, 
    submitRiskAssessment,
    getRiskAssessmentResult
} = require('../Controller/chatController');

// Route to get risk assessment questions
router.get('/questions', getRiskAssessment);

// Route to submit risk assessment answers and get results
router.post('/submit', submitRiskAssessment);

// Route to get a user's saved risk assessment result
router.get('/result/:userId', getRiskAssessmentResult);

module.exports = router;