const express = require('express');
const { requireAuth } = require('../../middlewares/requireAuth.middleware');
const { log } = require('../../middlewares/logger.middleware');
const {
  // getlogServices,
  // getlogService,
  addlogService,
  // updatelogService,
  // removelogService,
} = require('./logService.controller');
const router = express.Router();

router.post('/', addlogService);
// router.get('/', log, getlogServices);
// router.get('/:id', getlogService);
// router.put('/:toyId',requireAuth, updatelogService)
// router.delete('/:toyId',requireAuth, removelogService)
// router.put('/:id', updatelogService);
// router.delete('/:id', removelogService);

module.exports = router;
