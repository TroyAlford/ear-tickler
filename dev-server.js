var http = require('http'),
  url  = require('url'),
  path = require('path'),
  express = require('express'),
  fs = require('fs'),
  port = 80;

var app = module.exports.app = exports.app = express();
app.use(express.static('build'));
app.use('/audio', express.static(path.join(__dirname, '/audio')));
app.use('/images', express.static(path.join(__dirname, '/images')));

http.createServer(app).listen(port, function() {
  console.log("Express server running on port " + port);
});