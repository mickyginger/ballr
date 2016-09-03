angular
  .module('Ballr')
  .directive('message', messageDirective);

function messageDirective() {
  return {
    restrict: 'E',
    replace: true,
    templateUrl: '/templates/directives/message.html',
    scope: {
      message: '=',
      currentUser: '=',
      controller: '='
    }
  }
}