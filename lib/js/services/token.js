angular
  .module("Ballr")
  .service("TokenService", TokenService);

TokenService.$inject = ["$window", "jwtHelper"];
function TokenService($window, jwtHelper) {

  this.getToken = function() {
    return $window.localStorage.getItem("token");
  }

  this.setToken = function(token) {
    return $window.localStorage.setItem("token", token);
  }

  this.clearToken = function() {
    return $window.localStorage.removeItem("token");
  }

  this.decodeToken = function() {
    var token = this.getToken();
    return token ? jwtHelper.decodeToken(token) : null;
  }
}