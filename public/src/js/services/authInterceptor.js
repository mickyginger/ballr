angular
  .module("Ballr")
  .factory("AuthInterceptor", AuthInterceptor);

AuthInterceptor.$inject = ["$rootScope"];
function AuthInterceptor($rootScope) {
  return {
    responseError: function(res) {
      if(res.status === 401) {
        $rootScope.$broadcast("unauthorized");
      }

      return res.data;
    }
  }
}