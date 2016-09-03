var mongoose = require('mongoose');
var utils = require('../config/utils');

var messageSchema = new mongoose.Schema({
  content: { type: String, required: true },
  channel: { type: mongoose.Schema.ObjectId, ref: 'Channel' },
  user: { type: mongoose.Schema.ObjectId, ref: 'User', required: true },
  file: String,
  date: Date
});

messageSchema.path('date')
  .get(function(date) {
    return utils.time.format(date);
  });

messageSchema.set('toJSON', { getters: true });

module.exports = mongoose.model('Message', messageSchema);