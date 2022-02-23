const logServiceService = require('./logService.service');
const logger = require('../../services/logger.service');

module.exports = {
  addlogService,
};

async function addlogService(req, res) {
  console.log('request ', req.body);
  try {
    const logService = req.body;
    const addedlogService = await logServiceService.add(logService);

    res.end();
  } catch (err) {
    logger.error('Failed to add logService', err);
    res.status(500).send({ err: 'Failed to update logService' });
  }
}
