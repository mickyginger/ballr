var mongoose = require('mongoose');
var utils = require('../config/utils');
var emoji = require('node-emoji');

var messageSchema = new mongoose.Schema({
  content: { type: String, required: true },
  channel: { type: mongoose.Schema.ObjectId, ref: 'Channel' },
  user: { type: mongoose.Schema.ObjectId, ref: 'User', required: true },
  file: String,
  giphy: {
    image: String,
    link: String,
    title: String,
    size: Number
  },
  date: Date
});

messageSchema.path('date')
  .get(function(date) {
    return utils.time.format(date);
  });

messageSchema.path('giphy.size')
  .get(function(size) {
    if(size) return utils.number.toKB(size);
  });

messageSchema.path('content')
  .get(function(content) {
    return emoji.emojify(content);
  });

messageSchema.set('toJSON', { getters: true });

module.exports = mongoose.model('Message', messageSchema);