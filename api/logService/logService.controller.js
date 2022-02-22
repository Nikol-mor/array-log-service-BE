const logServiceService = require('./logService.service');
const logger = require('../../services/logger.service');

module.exports = {
  // getlogServices,
  // getlogService,
  addlogService,
  // updatelogService,
  // removelogService,
};

async function addlogService(req, res) {
  console.log('req.body ', req.body);
  try {
    const logService = req.body;
    const addedlogService = await logServiceService.add(logService);
    // res.send(addedlogService);
    res.end();
  } catch (err) {
    logger.error('Failed to add logService', err);
    res.status(500).send({ err: 'Failed to update logService' });
  }
}

// async function getlogServices(req, res) {
//   try {
//     const filterBy = {
//       txt: req.query?.userid || '',
//     };
//     console.log('req.query', req.query);
//     console.log('filterBy', filterBy);
//     const logServices = await logServiceService.query(filterBy);
//     res.send(logServices);
//   } catch (err) {
//     logger.error('Failed to get logServices', err);
//     res.status(500).send({ err: 'Failed to get logServices' });
//   }
// }

// async function getlogService(req, res) {
//   try {
//     const logService = await logServiceService.getById(req.params.id);
//     res.send(logService);
//   } catch (err) {
//     logger.error('Failed to get logService', err);
//     res.status(500).send({ err: 'Failed to get logService' });
//   }
// }

// async function updatelogService(req, res) {
//   try {
//     const logService = req.body;
//     const savedlogService = await logServiceService.update(logService);
//     res.send(savedlogService);
//   } catch (err) {
//     logger.error('Failed to update logService', err);
//     res.status(500).send({ err: 'Failed to update logService' });
//   }
// }

// async function removelogService(req, res) {
//   try {
//     await logServiceService.remove(req.params.id);
//     res.send({ msg: 'Deleted successfully' });
//   } catch (err) {
//     logger.error('Failed to delete logService', err);
//     res.status(500).send({ err: 'Failed to delete logService' });
//   }
// }
