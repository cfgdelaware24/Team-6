const services = require('./services');

const createEvent = async (req, res) => {
  const { name, date, description } = req.body;
  console.log(req.body);
  const event = await services.createEvent(name, new Date(date), description);
  res.send(event);
};

module.exports = {
  createEvent,
};
