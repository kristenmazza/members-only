// Return true if user has admin status
function canDeleteMessage(user) {
  return user.admin;
}

module.exports = {
  canDeleteMessage,
};
