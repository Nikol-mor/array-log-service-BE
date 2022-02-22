const dbService = require('../../services/db.service');
const logger = require('../../services/logger.service');
const ObjectId = require('mongodb').ObjectId;

module.exports = {
  // query,
  // getById,
  // remove,
  // update,
  add,
};

async function add(array) {
  console.log('array to logServiceDB', array);
  try {
    const collection = await dbService.getCollection('logService');
    await collection.insertOne({ array });
    console.log('inserted array2');
  } catch (err) {
    logger.error('cannot insert desiredArray', err);
    throw err;
  }
}

// async function query(filterBy = {}) {
//   // const criteria = _buildCriteria(filterBy)
//   let criteria;
//   if (filterBy.txt) criteria = { 'createdBy._id': filterBy.txt };
//   try {
//     const collection = await dbService.getCollection('logService');
//     var logServices = await collection.find(criteria).toArray();
//     logServices = logServices.map((logService) => {
//       logService.createdAt = ObjectId(logService._id).getTimestamp();
//       return logService;
//     });
//     return logServices;
//   } catch (err) {
//     logger.error('cannot find logServices', err);
//     throw err;
//   }
// }

// async function getById(logServiceId) {
//   try {
//     const collection = await dbService.getCollection('logService');
//     const logService = await collection.findOne({ _id: ObjectId(logServiceId) });
//     return logService;
//   } catch (err) {
//     logger.error(`while finding logService ${logServiceId}`, err);
//     throw err;
//   }
// }

// async function remove(logServiceId) {
//   try {
//     const collection = await dbService.getCollection('logService');
//     await collection.deleteOne({ _id: ObjectId(logServiceId) });
//   } catch (err) {
//     logger.error(`cannot remove logService ${logServiceId}`, err);
//     throw err;
//   }
// }

// async function update(logService) {
//   try {
//     const logServiceToSave = {
//       _id: ObjectId(logService._id),
//       name: logService.name,
//       imgUrl: logService.imgUrl,
//       desc: logService.desc,
//       createdAt: logService.createdAt,
//       createdBy: logService.createdBy,
//       tags: logService.tags,
//       likedByUsers: logService.likedByUsers,
//       songs: logService.songs,
//       bcgColor: logService.bcgColor,
//     };
//     const collection = await dbService.getCollection('logService');
//     await collection.updateOne({ _id: logServiceToSave._id }, { $set: logServiceToSave });
//     return logServiceToSave;
//   } catch (err) {
//     logger.error(`cannot update logService ${logService._id}`, err);
//     throw err;
//   }
// }

// function _buildCriteria(filterBy) {
//   const criteria = {};
//   if (filterBy.txt) {
//     const txtCriteria = { $regex: filterBy.txt, $options: 'i' };
//     criteria.$or = [
//       {
//         createdBy: { _id: filterBy.txt },
//       },
//     ];
//   }
//   return criteria;
// }
