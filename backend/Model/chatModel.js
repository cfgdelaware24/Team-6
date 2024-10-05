const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const getRiskAssessmentQuestions = async () => {
    return await prisma.riskAssessmentQuestion.findMany();
};

module.exports = {
    getRiskAssessmentQuestions,
};