var express = require('express');
var http = require('http');
var path = require('path');
var logger = require('./logger');

// Create express application.
var app = express();

// Expose client.
app.use(express.static(path.join(__dirname, '..', 'client')));

// Create and expose server.
var server = module.exports = http.createServer(app);

// Log when server is started.
server.on('listening', function () {
  logger.log('Server started http://localhost:%d/', server.address().port);
});
