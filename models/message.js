const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const format = require('date-fns/format');

const MessageSchema = new Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  time_stamp: { type: Date, default: () => Date.now() },
  author: { type: Schema.Types.ObjectId, ref: 'User', required: true },
});

MessageSchema.virtual('date__formatted').get(function () {
  return format(this.time_stamp, "MM/dd/yyyy 'at' h:mm a");
});

module.exports = mongoose.model('Message', MessageSchema);
