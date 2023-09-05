const { body, validationResult } = require('express-validator');
const asyncHandler = require('express-async-handler');
const bcrypt = require('bcryptjs');
const User = require('../models/user');

// Display homepage
exports.index = asyncHandler(async (req, res, next) => {
  res.render('index', { title: 'Messages', user: req.user });
});

// Display user sign up form on get
exports.user_create_get = asyncHandler(async (req, res, next) => {
  res.render('signup_form', { title: 'Sign up' });
});

// Display user sign up form on post
exports.user_create_post = [
  // Validate and sanitize fields.
  body('first_name', 'First name cannot be blank').trim().isLength({ min: 1 }),
  body('last_name', 'Last name cannot be blank').trim().isLength({ min: 1 }),
  body('username')
    .trim()
    .isEmail()
    .withMessage('Email is not valid')
    .isLength({ min: 1 })
    .withMessage('Email cannot be blank')
    .custom(async (value) => {
      const existingUser = await User.findOne({ username: value });

      if (existingUser) {
        throw new Error('A user already exists with this email');
      }
    }),
  body('password')
    .isLength({ min: 5 })
    .withMessage('Password must be at least 5 characters'),
  body('c_password')
    .custom((value, { req }) => {
      return value === req.body.password;
    })
    .withMessage('Passwords do not match'),

  asyncHandler(async (req, res, next) => {
    // Handle request
    const errors = validationResult(req);

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

        if (!errors.isEmpty()) {
          res.render('signup_form', {
            title: 'Sign up',
            errors: errors.array(),
            user: user,
          });
        } else {
          const result = await user.save();
          res.redirect('/');
        }
      });
    } catch (err) {
      return next(err);
    }
  }),
];
