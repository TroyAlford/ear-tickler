var
  express = require('express'),
  fs      = require('fs'),
  http    = require('http'),
  path    = require('path'),
  request = require('request'),
  url     = require('url'),

  port = 8080;

var app = module.exports.app = exports.app = express();

var streamer = express();
// Usage: GET ~/stream?url=http://www.domain.tld/path/to/file.mp4
streamer.get('*', function (req, res) {
  request(req.query.url).pipe(res);
});

app.use(express.static('builds/develop'));
app.use('/audio', express.static(path.join(__dirname, '/audio')));
app.use('/images', express.static(path.join(__dirname, '/images')));

app.use('/stream', streamer);

http.createServer(app).listen(port, function() {
  console.log("Express server running on port " + port);
});