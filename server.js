const express = require('express'),
	  bodyParser = require('body-parser'),
	  path = require('path'),
	  http = require('http'),
	  mongoose = require('mongoose');

const api = require('./server/routes/api');

const app = express();

//POST data parsers
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//connect to database
mongoose.connect('mongodb://127.0.0.1:27017/goji_Homework')


// Point static path to dist
app.use(express.static(path.join(__dirname, 'dist/giji-homework')));

// Set our api routes
app.use('/api', api);

// Catch all other routes and return the index file
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/index.html'));
});

/**
 * Get port from environment and store in Express.
 */
const port = process.env.PORT || '3000';
app.set('port', port);

/**
 * Create HTTP server.
 */
const server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */
server.listen(port, () => console.log(`API running on localhost:${port}`));