const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const getRiskAssessmentQuestions = async () => {
    return await prisma.riskAssessmentQuestion.findMany();
};

const saveRiskAssessmentResult = async (userId, result) => {
    return await prisma.user.update({
        where: { userID: parseInt(userId) },
        data: { riskAssessmentResult: result },
    });
};

module.exports = {
    getRiskAssessmentQuestions, saveRiskAssessmentResult,
};