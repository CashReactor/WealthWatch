const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

router.get('/', (req, res, next) => {
  res.json('Initial Routing');
});

module.exports = router;