const prisma = require('./prisma-client');

const createEvent = async (name, time, description) => {
  const event = await prisma.event.create({
    data: {
      name,
      time,
      description,
    },
  });
  return event;
};

module.exports = { createEvent };
