var utils = require('./utils');
var socketioJwt = require('socketio-jwt');
var secret = require('./tokens').secret;
var Promise = require('bluebird');
var Channel = require('../models/channel');
var Message = require('../models/message');
var _ = require('underscore');
var giphy = require('./giphy');

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

      io.sockets.emit('active', user);

      socket.on('message', function(data) {
        data.user = user;
        data.date = utils.time.format(new Date());

        if(!data.content.match(/\/giphy/)) {
          return Message.create(data)
            .then(function(message) {

              data._id = message._id;
              data.content = message.content;

              io.sockets.emit('message', data);
            });
        }

        var querystring = data.content.match(/^\/giphy (.*)/)[1];
        return giphy.search(querystring).then(function(giphyData) {

          data.giphy = giphyData;

          return Message.create(data)
            .then(function(message) {

              data._id = message._id;
              data.content = message.content;
              
              io.sockets.emit('message', data);
            });
        });
      });

      socket.on('disconnect', function() {
        io.sockets.emit('away', user);
      });
    });
}