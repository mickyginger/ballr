var request = require('request-promise');

module.exports = {
  search: function(querystring) {
    return request
      .get({
        url: "http://api.giphy.com/v1/gifs/search",
        qs: {
          q: querystring,
          api_key: "dc6zaTOxFJmzC"
        },
        json: true
      });
  }
}