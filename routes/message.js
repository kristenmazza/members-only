const express = require('express');
const router = express.Router();
const message_controller = require('../controllers/messageController');
const { canDeleteMessage } = require('../permissions/messages');

// Get request to delete message
router.get(
  '/:id/delete',
  authDeleteMessage,
  message_controller.message_delete_get
);

// Post request to delete message
router.post('/:id/delete', message_controller.message_delete_post);

// Middleware to only allow admins to access message deletion
function authDeleteMessage(req, res, next) {
  if (!req.user) {
    res.status(401);
    res.send('Not allowed.');
  }
  if (!canDeleteMessage(req.user)) {
    res.status(401);
    res.send('Not allowed.');
  }

  next();
}

module.exports = router;
