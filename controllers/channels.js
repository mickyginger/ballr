var Channel = require('../models/channel');

function channelsIndex(req, res) {
  Channel
    .find()
    .then(function(channels) {
      res.status(200).send(channels);
    })
    .catch(function(err) {
      res.status(500).json(err);
    });
}

function channelsCreate(req, res) {
  
  req.body.creator = req.user;

  Channel
    .create(req.body)
    .then(function(channel) {
      res.status(200).send(channel);
    })
    .catch(function(err) {
      res.status(500).json(err);
    });
}

function channelsDelete(req, res) {
  Channel
    .findById(req.params.id)
    .then(function(channel) {

      console.log(channel, req.user._id);
      if(channel.creator != req.user._id) {
        return res.status(401).json({ message: "Unauthorized" });
      }

      return channel.remove();
    })
    .then(function() {
      return res.status(204).end();
    })
    .catch(function(err) {
      console.log(err);
      return res.status(500).json(err);
    });
}

module.exports = {
  index: channelsIndex,
  create: channelsCreate,
  delete: channelsDelete
}