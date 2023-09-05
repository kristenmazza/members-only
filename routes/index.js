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
router.get('/login', function (req, res, next) {
  res.render('login_form', { title: 'Log in' });
});

// Authenticate user
router.post(
  '/login',
  passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/',
  })
);

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
