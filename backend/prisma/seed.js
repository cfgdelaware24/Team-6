// prisma/seed.js
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const riskAssessmentQuestions = [
  { question: "Do you experience chest pain?", isRiskFactor: true },
  { question: "Do you have a rapid or irregular heartbeat?", isRiskFactor: true },
  { question: "Do you experience shortness of breath?", isRiskFactor: true },
  { question: "Do you often feel dizzy?", isRiskFactor: true },
  { question: "Do you experience unusual fatigue?", isRiskFactor: true },
  { question: "Has your ability to exercise decreased recently?", isRiskFactor: true },
  { question: "Do you have a family history of heart disease?", isRiskFactor: true },
  { question: "Do you have diabetes?", isRiskFactor: true },
  { question: "Are you over 60 years old?", isRiskFactor: true },
  { question: "Do you smoke?", isRiskFactor: true }
];

async function main() {
  for (const question of riskAssessmentQuestions) {
    await prisma.riskAssessmentQuestion.create({
      data: question
    });
  }
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });