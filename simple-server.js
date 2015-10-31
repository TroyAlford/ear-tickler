var http = require('http'),
	url  = require('url'),
	path = require('path'),
	express = require('express'),
	fs = require('fs');

var app = express();
app.use('/js', express.static(path.join(__dirname, '/bin/js')));
app.use('/css', express.static(path.join(__dirname, '/bin/css')));
app.use('/img', express.static(path.join(__dirname, '/bin/img')));
app.use('/fonts', express.static(path.join(__dirname, '/bin/fonts')));
app.use('/pages', express.static(path.join(__dirname, '/bin/pages')));
app.all('/*', function(req, res, next) {
	res.sendFile('bin/index.html', { root: __dirname });
});

http.createServer(app).listen(8080, function() {
	console.log("Express server running on port 8080");
});