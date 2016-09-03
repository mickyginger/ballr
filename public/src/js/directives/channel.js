angular
  .module('Ballr')
  .directive('channel', channelDirective);

function channelDirective() {
  return {
    restrict: 'E',
    replace: true,
    templateUrl: '/templates/directives/channel.html',
    scope: {
      channel: '=',
      currentUser: '=',
      controller: '='
    }
  }
}