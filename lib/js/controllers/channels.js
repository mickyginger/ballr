angular
  .module("Ballr")
  .controller("ChannelsController", ChannelsController);

ChannelsController.$inject = ["Channel", "$rootScope"];
function ChannelsController(Channel, $rootScope) {
  var self = this;

  this.all = [];
  this.current = null;
  this.new = null;

  Channel.query(function(channels) {
    self.all = channels;

    self.current = channels.filter(function(channel) {
      return channel.name === "general";
    })[0];

    $rootScope.$broadcast("currentChannel", self.current);
  });

  this.change = function change(channel) {
    this.current = channel;
    $rootScope.$broadcast("currentChannel", self.current);
  }

  this.add = function addChannel() {
    this.new = {};
  }

  this.cancel = function cancel() {
    this.new = null;
  }

  this.create = function createChannel() {
    Channel.save(self.new, function(channel) {
      self.all.push(channel);
      self.change(channel);
      self.new = null;
    });
  }

  this.delete = function deleteChannel(channel) {
    var index = self.all.indexOf(channel);
    channel.$delete(function() {
      self.all.splice(index, 1);
      self.change(self.all[0]);
    });
  }

}