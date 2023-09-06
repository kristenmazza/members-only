const express = require('express');
const router = express.Router();
const passport = require('passport');
const user_controller = require('../controllers/userController');

// Get homepage
router.get('/', user_controller.index);

// Render signup form
router.get('/signup', user_controller.user_create_get);

// Create new user
router.post('/signup', user_controller.user_create_post);

// Render login form
router.get('/login', user_controller.login_get);

// Authenticate user
router.post('/login', user_controller.login_post);

// Log out
router.get('/log-out', (req, res, next) => {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect('/');
  });
});

module.exports = router;
