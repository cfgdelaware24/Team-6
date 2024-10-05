const { GoogleGenerativeAI } = require("@google/generative-ai");
const { saveRiskAssessmentResult } = require("../Model/chatModel");
const { getUserById } = require('../Model/authModel');
require('dotenv').config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Hardcoded risk assessment questions
const riskAssessmentQuestions = [
    { id: 1, question: "Do you experience chest pain?", isRiskFactor: true, weight: 3 },
    { id: 2, question: "Do you have a rapid or irregular heartbeat?", isRiskFactor: true, weight: 2 },
    { id: 3, question: "Do you experience shortness of breath?", isRiskFactor: true, weight: 3 },
    { id: 4, question: "Do you often feel dizzy?", isRiskFactor: true, weight: 1 },
    { id: 5, question: "Do you experience unusual fatigue?", isRiskFactor: true, weight: 2 },
    { id: 6, question: "Has your ability to exercise decreased recently?", isRiskFactor: true, weight: 2 },
    { id: 7, question: "Do you have a family history of heart disease?", isRiskFactor: true, weight: 3 },
    { id: 8, question: "Do you have diabetes?", isRiskFactor: true, weight: 3 },
    { id: 9, question: "Are you over 60 years old?", isRiskFactor: true, weight: 1 },
    { id: 10, question: "Do you smoke?", isRiskFactor: true, weight: 2 }
];

// Controller to handle fetching risk assessment questions
const getRiskAssessment = async (req, res) => {
    try {
        console.log('getRiskAssessment was called');
        res.status(200).json(riskAssessmentQuestions);
    } catch (error) {
        console.error('Failed to fetch risk assessment questions:', error);
        res.status(500).json({ error: 'Failed to fetch questions' });
    }
};

// Controller to handle submitting risk assessment answers and calculating result
const submitRiskAssessment = async (req, res) => {
    const { userId, answers } = req.body;

    // Add logging to check what is being received
    console.log('Received request with userId:', userId);
    console.log('Received answers:', answers);

    if (!answers || !Array.isArray(answers)) {
        console.error("Invalid answers received:", answers);
        return res.status(400).json({ error: "Invalid risk assessment submission" });
    }

    try {
        const totalScore = answers.reduce((score, answer, index) => {
            return score + (answer ? riskAssessmentQuestions[index].weight : 0);
        }, 0);

        // Debugging totalScore calculation
        console.log('Total Score:', totalScore);

        const maxScore = riskAssessmentQuestions.reduce((sum, q) => sum + q.weight, 0);
        const riskPercentage = (totalScore / maxScore) * 100;

        // Debugging risk percentage
        console.log('Risk Percentage:', riskPercentage);

        let assessment;
        let ekgRecommendation;
        if (riskPercentage < 30) {
            assessment = "good";
            ekgRecommendation = "An EKG test is not necessary at this time, but regular check-ups are recommended.";
        } else if (riskPercentage < 70) {
            assessment = "need more assistance";
            ekgRecommendation = "Consider scheduling an EKG test to further assess your heart health.";
        } else {
            assessment = "bad";
            ekgRecommendation = "It is strongly recommended that you schedule an EKG test as soon as possible.";
        }

        // Save the risk assessment result in the database
        try {
            console.log('Saving risk assessment result...');
            await saveRiskAssessmentResult(userId, assessment);
            console.log('Risk assessment result saved successfully');
        } catch (dbError) {
            console.error('Database error while saving risk assessment result:', dbError);
            return res.status(500).json({ error: "Failed to save assessment result in the database" });
        }

        // Use Google Generative AI to generate health advice
        try {
            console.log('Generating health advice using Google Generative AI...');
            const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
            const prompt = `
                Based on a heart health risk assessment, the patient's risk level is considered "${assessment}".
                Their risk score is ${riskPercentage.toFixed(2)}% out of 100%.
                
                Please provide:
                1. A brief explanation of what this assessment means.
                2. Detailed advice on how the patient can better take care of their heart health. This should be 5 sentences and unique each time.
                3. The following EKG recommendation: ${ekgRecommendation}
                
                Format the response in HTML, with appropriate headings and paragraphs.
            `;

            const result = await model.generateContent(prompt);
            const advice = await result.response.text();

            res.json({
                assessment,
                riskPercentage: riskPercentage.toFixed(2),
                ekgRecommendation,
                advice
            });
        } catch (aiError) {
            console.error('Error generating health advice:', aiError);
            return res.status(500).json({ error: "Failed to generate health advice" });
        }
    } catch (error) {
        console.error('Error processing risk assessment submission:', error);
        res.status(500).json({ error: "Failed to process risk assessment submission" });
    }
};


const getRiskAssessmentResult = async (req, res) => {
    const { userId } = req.params;
    try {
        const user = await getUserById(userId);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.status(200).json({ riskAssessmentResult: user.riskAssessmentResult });
    } catch (error) {
        console.error('Failed to retrieve risk assessment result:', error);
        res.status(500).json({ error: 'Failed to retrieve risk assessment result' });
    }
};

module.exports = { getRiskAssessment, submitRiskAssessment, getRiskAssessmentResult };
