var User = require('../models/user');

function usersIndex(req, res) {
  User
    .find()
    .then(function(users) {
      res.status(200).send(users);
    })
    .catch(function(err) {
      res.status(500).json(err);
    });
}

module.exports = {
  index: usersIndex
}