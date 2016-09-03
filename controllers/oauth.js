var request = require('request-promise');
var qs = require('qs');
var jwt = require('jsonwebtoken');
var User = require('../models/user');
var secret = require('../config/tokens').secret;

function facebook(req, res) {
  console.log(req.headers);
  var params = {
    code: req.body.code,
    client_id: req.body.clientId,
    client_secret: process.env.FACEBOOK_API_SECRET,
    redirect_uri: 'http://localhost:3000/'
  };

  var userProfile;

  request
    .get({
      url: 'https://graph.facebook.com/v2.5/oauth/access_token',
      qs: params,
      json: true
    })
    .then(function(accessToken){
      return request.get({
        url: 'https://graph.facebook.com/v2.5/me?fields=id,email,name,picture',
        qs: accessToken,
        json: true
      });
    })
    .then(function(profile) {
      return User.findOne({ facebookId: profile.id })
        .then(function(user) {
          if(user) {
            user.profileImage = profile.picture.data.url
          }
          else {
            user = new User({
              facebookId: profile.id,
              name: profile.name,
              profileImage: profile.picture.data.url,
              email: profile.picture.email
            });
          }

          return user.save();
        })
    })
    .then(function(user) {
      var payload = { _id: user._id, name: user.name, profileImage: user.profileImage };
      var token = jwt.sign(payload, secret, { expiresIn: '24h' });
      res.status(200).json({ token: token });
    })
    .catch(function(err) {
      console.log(err);
      res.status(500).json(err);
    });
}

module.exports = {
  facebook: facebook
}