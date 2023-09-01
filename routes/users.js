var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});

// Render signup form
router.get('/signup', function (req, res, next) {
  res.send('Not implemented: GET signup form');
});

// Create new user
router.post('/signup', function (req, res, next) {
  res.send('Not implemented: POST signup form');
});

// Render login form
router.get('/login', function (req, res, next) {
  res.send('Not implemented: GET login form');
});

// Authenticate user
router.get('/login', function (req, res, next) {
  res.send('Not implemented: POST login form');
});

module.exports = router;
