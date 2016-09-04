angular
  .module("Ballr")
  .controller("UsersController", UsersController);

UsersController.$inject = ["$window", "User", "socket", "$rootScope"];
function UsersController($window, User, socket, $rootScope) {
  var self = this;

  socket.on('active', function(loggedInUser) {
    $rootScope.$applyAsync(function() {
      self.all.map(function(user) {
        if(loggedInUser._id === user._id) {
          user.active = true;
        }

        return user;
      });
    });
  });

  socket.on('away', function(loggedInUser) {
    $rootScope.$applyAsync(function() {
      self.all.map(function(user) {
        if(loggedInUser._id === user._id) {
          user.active = false;
        }

        return user;
      });
    });
  });

  this.all = User.query();
}