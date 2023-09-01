const express = require('express');
const router = express.Router();

// Get homepage
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
