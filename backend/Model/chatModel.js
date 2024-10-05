const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const getRiskAssessmentQuestions = async () => {
    return await prisma.riskAssessmentQuestion.findMany();
};

const saveRiskAssessmentResult = async (userId, result) => {
    if (!userId || isNaN(userId)) {
        throw new Error('Invalid userId');
    }

    return await prisma.user.update({
        where: {
            user_id: parseInt(userId), // Correct field name and ensure it is an integer
        },
        data: {
            riskAssessmentResult: result,
        },
    });
};

module.exports = {
    getRiskAssessmentQuestions, saveRiskAssessmentResult,
};