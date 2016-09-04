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
      })
      .then(function(res) {
        var randomIndex = Math.floor(Math.random() * res.data.length);
        var selectedGiphy = res.data[randomIndex];

        return {
          image: selectedGiphy.images.fixed_height.url,
          link: selectedGiphy.url,
          title: querystring,
          size: selectedGiphy.images.fixed_height.size
        };
      });
  }
}