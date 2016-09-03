var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');
var secret = require('./tokens').secret;

var oauthController = require('../controllers/oauth');
var usersController = require('../controllers/users');
var channelsController = require('../controllers/channels');
var messagesController = require('../controllers/messages');

function secureRoute(req, res, next){
  if(!req.headers.authorization) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  var token = req.headers.authorization.replace('Bearer ', '');
  jwt.verify(token, secret, function(err, payload) {
    if(err) return res.status(401).json({ messgae: "Unauthorized" });

    req.user = payload;

    next();
  });
}

router.post('/oauth/facebook', oauthController.facebook);

router.route('/users')
  .get(secureRoute, usersController.index);

router.route('/channels')
  .all(secureRoute)
  .get(channelsController.index)
  .post(channelsController.create);

router.route('/channels/:id')
  .all(secureRoute)
  .delete(channelsController.delete);

router.get('/messages/:channelId', secureRoute, messagesController.index);

router.route('/messages/:id')
  .all(secureRoute)
  .delete(messagesController.delete);

module.exports = router;