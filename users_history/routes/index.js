const express = require('express');
const router = express.Router();
const userHistories = require('./history');

router.use('/history', userHistories);

module.exports = router;
