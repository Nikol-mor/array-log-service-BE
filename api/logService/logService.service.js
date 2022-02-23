const dbService = require('../../services/db.service');
const logger = require('../../services/logger.service');

module.exports = {
  add,
};

async function add(array) {
  console.log('array to logServiceDB', array);
  try {
    const collection = await dbService.getCollection('logService');
    await collection.insertOne({ array });
    console.log('array inserted toDB');
  } catch (err) {
    logger.error('cannot insert desiredArray', err);
    throw err;
  }
}
