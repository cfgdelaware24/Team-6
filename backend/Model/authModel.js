const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcryptjs");

const prisma = new PrismaClient({
    datasources: {
        db: {
            url: process.env.DATABASE_URL,
        },
    },
});

const createUser = async (username, email, password, securityAnswer) => {
    const hashedPassword = await bcrypt.hash(password, 10);
    const hashedSecurityAnswer = await bcrypt.hash(securityAnswer, 10);
    return await prisma.user.create({
        data: { username, email, password: hashedPassword, securityAnswer: hashedSecurityAnswer },
    });
};

const findUserByUsername = async (username) => {
    return await prisma.user.findUnique({
        where: { username },
    });
};

const findUserByEmail = async (email) => {
    return await prisma.user.findUnique({
        where: { email },
    });
};

const updateUserPasswordByUsername = async (username, newPassword) => {
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    return await prisma.user.update({
        where: { username },
        data: { password: hashedPassword },
    });
};

const getUserById = async (userId) => {
    return await prisma.user.findUnique({
        where: { userID: parseInt(userId) },
    });
};

const getAllUsers = async () => {
    return await prisma.user.findMany({
        select: {
            userID: true,
            email: true,
            firstName: true,
            lastName: true,
        },
    });
};

module.exports = {
    createUser,
    findUserByUsername,
    findUserByEmail,
    updateUserPasswordByUsername,
    updateUserTopics,
    getUserById,
    getAllUsers,
    saveRiskAssessmentResult
};