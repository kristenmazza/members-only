const { body, validationResult } = require('express-validator');
const asyncHandler = require('express-async-handler');
const Message = require('../models/message');

// Display homepage
exports.index = asyncHandler(async (req, res, next) => {
  const messages = await Message.find({}).populate('author').exec();
  res.render('index', {
    title: 'Messages',
    user: req.user,
    message_list: messages,
  });
});

// Render message form
exports.message_create_get = asyncHandler(async (req, res, next) => {
  res.render('message_form', { title: 'New message' });
});

// Create new message
exports.message_create_post = [
  // Validate and sanitize fields.
  body('subject', 'Subject cannot be blank').trim().isLength({ min: 1 }),
  body('message', 'Message cannot be blank').trim().isLength({ min: 1 }),

  asyncHandler(async (req, res, next) => {
    // Handle request
    const errors = validationResult(req);

    const message = new Message({
      title: req.body.subject,
      content: req.body.message,
      author: req.user._id,
    });

    if (!errors.isEmpty()) {
      res.render('message_form', {
        title: 'New message',
        errors: errors.array(),
      });
    } else {
      const result = await message.save();
      res.redirect('/');
    }
  }),
];
