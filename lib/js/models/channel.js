angular
  .module('Ballr')
  .factory('Channel', Channel);

Channel.$inject = ["$resource"];
function Channel($resource) {
  return $resource('/channels/:id', { id: '@_id' }, {
    update: { method: "PUT" }
  });
}