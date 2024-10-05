const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcryptjs");

const prisma = new PrismaClient({
    datasources: {
        db: {
            url: process.env.DATABASE_URL,
        },
    },
});

const createUser = async (username, email, password, role, name, age, phone) => {
    return prisma.user.create({
        data: {
            username,
            email,
            password_hash: password,
            name,
            age,
            phone,
            role
        },
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

const getUserDetails = async (userId) => {
    return await prisma.user.findUnique({
        where: { userId: parseInt(userId) },
        select: {
            name: true,
            email: true,
            phone: true,
            Participant: {
                select: {
                    participant_id: true
                }
            },
            Volunteer: {
                select: {
                    volunteer_id: true
                }
            }
        },
    });
};

module.exports = {
    createUser,
    findUserByUsername,
    findUserByEmail,
    updateUserPasswordByUsername,
    getUserById,
    getAllUsers,
    getUserDetails
};