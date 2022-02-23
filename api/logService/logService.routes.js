const express = require('express');

const { addlogService } = require('./logService.controller');
const router = express.Router();

router.post('/', addlogService);

module.exports = router;
