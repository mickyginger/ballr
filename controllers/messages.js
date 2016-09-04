var Message = require('../models/message');

function messagesIndex(req, res) {
  Message
    .find({ channel: req.params.channelId })
    .sort({ date: 1 })
    .populate('user', '_id name profileImage')
    .exec()
    .then(function(messages) {
      res.status(200).send(messages);
    })
    .catch(function(err) {
      res.status(500).json(err);
    });
}

function messagesDelete(req, res) {
  Message
    .findById(req.params.id)
    .then(function(message) {

      if(message.user != req.user._id) {
        return res.status(401).json({ message: "Unauthorized" });
      }

      return message.remove();
    })
    .then(function() {
      res.status(204).end();
    })
    .catch(function(err) {
      console.log(err);
      res.status(500).json(err);
    });
}

module.exports = {
  index: messagesIndex,
  delete: messagesDelete
}