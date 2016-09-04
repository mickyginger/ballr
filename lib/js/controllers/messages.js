angular
  .module('Ballr')
  .controller("MessagesController", MessagesController);

MessagesController.$inject = ["$rootScope", "socket", "Message"];
function MessagesController($rootScope, socket, Message) {

  var self = this;

  this.connected = false;
  this.currentChannel = null;
  this.new = null;
  this.all = [];

  this.delete = function(message) {
    socket.emit("delete", message);
  }

  socket.on("delete", function(deletedMessage) {
    $rootScope.$applyAsync(function() {
      var index = self.all.findIndex(function(message) {
        return message._id === deletedMessage._id;
      });

      self.all.splice(index, 1);
    });
  });

  $rootScope.$on("currentChannel", function(event, channel) {
    if(channel) {
      self.currentChannel = channel;
      Message.query({ channelId: channel._id }, function(res) {
        self.all = res;
      });
    }
  });

  this.send = function(event) {
    if(event.keyCode === 13 && !event.shiftKey) {
      socket.emit("message", { content: this.new, channel: self.currentChannel });
      this.new = null;
    }
  }

  socket.on("message", function(data) {
    if(data.channel._id === self.currentChannel._id) {
      $rootScope.$applyAsync(function() {
        var message = new Message(data);
        self.all.push(message);
      });
    }
  });
}