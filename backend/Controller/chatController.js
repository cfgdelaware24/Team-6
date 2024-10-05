const { GoogleGenerativeAI } = require("@google/generative-ai");
const { getRiskAssessmentQuestions, saveRiskAssessmentResult } = require("../Model/chatModel");
const { getUserById } = require('../Model/authModel')
require('dotenv').config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const getRiskAssessment = async (req, res) => {
  try {
    const questions = await getRiskAssessmentQuestions();
    res.json(questions);
  } catch (error) {
    console.error('Error fetching risk assessment questions:', error);
    res.status(500).json({ error: "Failed to fetch risk assessment questions" });
  }
};

const submitRiskAssessment = async (req, res) => {
    const { userId, answers } = req.body;
    
    if (!answers || !Array.isArray(answers)) {
      return res.status(400).json({ error: "Invalid risk assessment submission" });
    }
  
    try {
      const questions = await getRiskAssessmentQuestions();
      const totalScore = answers.reduce((score, answer, index) => {
        return score + (answer ? questions[index].weight : 0);
      }, 0);
      const maxScore = questions.reduce((sum, q) => sum + q.weight, 0);
      const riskPercentage = (totalScore / maxScore) * 100;
  
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
  
      // Save the risk assessment result
      await saveRiskAssessmentResult(userId, assessment);
  
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
      const prompt = `
        Based on a heart health risk assessment, the patient's risk level is considered "${assessment}".
        Their risk score is ${riskPercentage.toFixed(2)}% out of 100%.
        
        Please provide:
        1. A brief explanation of what this assessment means.
        2. Detailed advice on how the patient can better take care of their heart health.
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