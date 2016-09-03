var express = require('express');
var app = express();
var env = app.get('env');
var port = process.env.PORT || 3000;
var bodyParser = require('body-parser');
var morgan = require('morgan');
var router = require('./config/routes');

var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
var databaseUri = require('./config/db')(env);
mongoose.connect(databaseUri);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

if('test' !== env) {
  app.use(morgan('dev'));
}

app.use(express.static("public"));

app.use(router);

var server = app.listen(port, function() {
  console.log("Baller!");
});

require('./config/sockets')(server);