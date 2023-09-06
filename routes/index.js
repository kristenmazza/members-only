const express = require('express');
const router = express.Router();
const passport = require('passport');
const user_controller = require('../controllers/userController');

// Provides access to currentUser variable in all views
router.use(function (req, res, next) {
  res.locals.currentUser = req.user;
  next();
});

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

// Render join club form
router.get('/join', user_controller.join_get);

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
