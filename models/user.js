var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
  name: String,
  email: String,
  profileImage: String,
  facebookId: String,
  twitterId: String,
  githubId: String
});

module.exports = mongoose.model('User', userSchema);