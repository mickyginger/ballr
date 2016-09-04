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
    var index = this.all.indexOf(message);
    message.$delete(function() {
      self.all.splice(index, 1);
    });
  }

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
    $rootScope.$applyAsync(function() {
      console.log("receiving message", data);
      var message = new Message(data);
      self.all.push(message);
    });
  });
}