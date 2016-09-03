angular
  .module("Ballr")
  .controller("LoginController", LoginController);

LoginController.$inject = ["$auth", "$rootScope"];
function LoginController($auth, $rootScope) {

  this.authenticate = function(provider) {

    $auth.authenticate(provider)
      .then(function(res) {
        $rootScope.$broadcast("loggedIn");
      });

  }
}