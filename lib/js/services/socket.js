angular
  .module("Ballr")
  .factory("socket", socket);

socket.$inject = ["$window", "$rootScope", "TokenService"];
function socket($window, $rootScope, TokenService) {
  
  var socket = $window.io();

  socket.on('connect', function() {
    socket
      .emit('authenticate', { token: TokenService.getToken() })
      .on('authenticated', function() {
        $rootScope.$applyAsync(function() {
          $rootScope.$broadcast("connected");
        });
      })
      .on('unauthorized', function() {
        $rootScope.$applyAsync(function() {
          $rootScope.$broadcast("unauthorized");
        });
      });
  });

  socket.on('disconnect', function(){
    $rootScope.$applyAsync(function() {
      $rootScope.$broadcast("disconnected");
    });
  });

  return socket;
}