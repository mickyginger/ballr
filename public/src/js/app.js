angular
  .module("Ballr", ['ngResource', 'satellizer', 'ui.router', 'angular-jwt'])
  .config(setupInterceptor)
  .config(oauthConfig)
  .config(Router);

setupInterceptor.$inject = ["$httpProvider"];
function setupInterceptor($httpProvider) {
  return $httpProvider.interceptors.push("AuthInterceptor");
}

oauthConfig.$inject = ["$authProvider"];
function oauthConfig($authProvider) {

  $authProvider.tokenPrefix = '';

  $authProvider.facebook({
    url: '/oauth/facebook',
    clientId: '1495326170795857'
  });
}

Router.$inject = ["$stateProvider", "$urlRouterProvider"];
function Router($stateProvider, $urlRouterProvider) {
  
  $stateProvider
    .state("main", {
      url: "/",
      templateUrl: "/templates/main.html"
    })
    .state("login", {
      url: "/login",
      templateUrl: "/templates/login.html",
      controller: "LoginController as login"
    });

  $urlRouterProvider.otherwise("/");
}