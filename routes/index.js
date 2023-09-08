const express = require('express');
const router = express.Router();
const user_controller = require('../controllers/userController');
const message_controller = require('../controllers/messageController');

// Provides access to currentUser variable in all views
router.use(function (req, res, next) {
  res.locals.currentUser = req.user;
  next();
});

// Get homepage
router.get('/', message_controller.index);

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

// Authorize user for membership
router.post('/join', user_controller.join_post);

// Render admin password form
router.get('/admin', user_controller.admin_create_get);

// Authorize user for admin
router.post('/admin', user_controller.admin_create_post);

// Render create message form
router.get('/new-message', message_controller.message_create_get);

// Add message
router.post('/new-message', message_controller.message_create_post);

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
