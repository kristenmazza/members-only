const express = require('express');
const router = express.Router();
const passport = require('passport');
const bcrypt = require('bcryptjs');
const User = require('../models/user');

// Get homepage
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Messages', user: req.user });
});

// Render signup form
router.get('/signup', function (req, res, next) {
  res.render('signup_form', { title: 'Sign up' });
});

// Create new user
router.post('/signup', async function (req, res, next) {
  try {
    bcrypt.hash(req.body.password, 10, async (err, hashedPassword) => {
      // Store hashed password in database
      const user = new User({
        username: req.body.username,
        password: hashedPassword,
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        membership_status: 'viewer',
      });
      const result = await user.save();
      res.redirect('/');
    });
  } catch (err) {
    return next(err);
  }
});

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
