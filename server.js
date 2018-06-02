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
mongoose.connect(process.env.MONGODB_URI)


app.use('/api', api);

// Point static path to dist
app.use(express.static(__dirname + '/dist'));

app.get('/*', function(req,res) {
    
	res.sendFile(path.join(__dirname+'/dist/index.html'));
});

// Set our api routes


// Catch all other routes and return the index file
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