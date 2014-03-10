/**
 * web server entry point.
 */

var express = require('express');
var http = require('http');
var app = express();
var nodemailer = require('nodemailer');
var MemoryStore = require('connect').session.MemoryStore;
var dbPath = 'mongodb://localhost/nodebackbone';
var fs = require('fs')

// Create an http server
app.server = http.createServer(app);

// Create a session store to share between methods
app.sessionStore = new MemoryStore();

// Import the data layer
var mongoose = require('mongoose');
var config = {
	mail: require('./config/mail')
};
// Import the models
var models = {
	Account: require('./models/Account')(config, mongoose, nodemailer)
};

app.configure(function(){
	app.set('view engine','jade');
	app.use(express.static(__dirname + '/public'));
	app.use(express.limit('1mb'));
	app.use(express.bodyParser());
	app.use(express.cookieParser());
	app.use(express.session({
		secret: "Nomad secret key",
		key: 'express.id',
		store: app.sessionStore
	}));
	mongoose.connect(dbPath, function onMongooseError(err){
		if (err) throw err;
	});
});

// Import the routes
fs.readdirSync('routes').forEach(function(file) {
	if( file[0] === '.') return;
	var routeName = file.substr(0, file.indexOf('.'));
	require('./routes/' + routeName) (app, models);
});

app.get('/', function(req, res){
	res.render('index.jade');
});

app.post('/contacts/find', function (req, res) {
	var searchStr = req.param('searchStr', null);
	if (null == searchStr ) {
		res.send(400);
		return;
	}

	models.Account.findByString(searchStr, function onSearchDone(err, accounts) {
		if (err || accounts.length === 0) {
			res.send(404);
		} else {
			res.send(accounts);
		}
	});
});

app.server.listen(8080);
console.log('Listening on port 8080');