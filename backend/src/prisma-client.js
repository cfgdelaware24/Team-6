const prisma = require('@prisma/client');

const prismaClient = new prisma.PrismaClient();

if (process.env.NODE_ENV === 'development') global.prisma = prismaClient;

module.exports = prismaClient;
