angular
  .module('Ballr')
  .factory('Message', Message);

Message.$inject = ["$resource"];
function Message($resource) {
  return $resource('/messages/:id', { id: '@_id' }, {
    update: { method: "PUT" },
    query: { method: "GET", isArray: true, url: '/messages/:channelId' }
  });
}