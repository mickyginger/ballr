var utils = require('./utils');
var socketioJwt = require('socketio-jwt');
var secret = require('./tokens').secret;
var Promise = require('bluebird');
var Channel = require('../models/channel');
var Message = require('../models/message');
var _ = require('underscore');

module.exports = function(server) {
      
  var io = require('socket.io').listen(server);

  io.on('connection', socketioJwt.authorize({
      secret: secret,
      timeout: 2000
    })).on('authenticated', function(socket) {
      
      var user = {
        _id: socket.decoded_token._id,
        name: socket.decoded_token.name,
        profileImage: socket.decoded_token.profileImage
      };

      socket.emit('active', user);

      socket.on('message', function(data) {
        data.user = user;
        data.date = utils.time.format(new Date());
        socket.emit('message', data);

        Message.create(data);
      });

      socket.on('disconnect', function() {
        socket.emit('away', user);
      });
    });
}