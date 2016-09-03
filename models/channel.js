var mongoose = require('mongoose');

var channelSchema = new mongoose.Schema({
  name: { type: String, required: true, lowercase: true },
  creator: { type: mongoose.Schema.ObjectId, ref: 'User' }
});

channelSchema.pre('remove', function(next) {
  this
    .model('Message')
    .find({ channel: this._id })
    .remove()
    .then(next)
    .catch(next);
});

module.exports = mongoose.model('Channel', channelSchema);