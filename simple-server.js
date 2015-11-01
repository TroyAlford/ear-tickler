var http = require('http'),
	url  = require('url'),
	path = require('path'),
	express = require('express'),
	fs = require('fs'),
    port = 80;

var app = express();
app.use('/js', express.static(path.join(__dirname, '/bin/js')));
app.use('/css', express.static(path.join(__dirname, '/bin/css')));
app.use('/img', express.static(path.join(__dirname, '/bin/img')));
app.use('/fonts', express.static(path.join(__dirname, '/bin/fonts')));
app.use('/tmpl', express.static(path.join(__dirname, '/bin/tmpl')));
app.use('/audio', express.static(path.join(__dirname, '/audio')));
app.all('/*', function(req, res, next) {
	res.sendFile('bin/index.html', { root: __dirname });
});

http.createServer(app).listen(port, function() {
	console.log("Express server running on port " + port);
});