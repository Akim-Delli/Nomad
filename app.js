/**
 * web server entry point.
 */

var express = require('express');
var app = express();
var nodemailer = require('nodemailer');
var MemoryStore = require('connect').session.MemoryStore;
var dbPath = 'mongodb://localhost/nodebackbone';

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
	app.use(express.session(
		{secret: "Nomad secret key", store: new MemoryStore()}));
	mongoose.connect(dbPath, function onMongooseError(err){
		if (err) throw err;
	});
});

app.get('/', function(req, res){
	res.render('index.jade');
});

app.post('/login', function(req,res) {
	console.log('login request');
	var email = req.param('email', null);
	var password = req.param('password', null);

	if (null === email || email.length < 1 || null === password || password.length < 1) {
		res.send(400);
		return;
	}

	//!! registration is going to get fired off and handled
	//!!even after the user received an OK response from the server.
	models.Account.login(email, password, function(success) {
		if(!success) {
			res.send(401);
			return;
		}
		console.log('login was successful');
		req.session.loggedIn = true;
		req.session.accountId = account._id;
		res.send(200);
	});
});

app.post('/register', function(req,res) {
	var firstName = req.param('firstName', '');
	var lastName = req.param('lastName','');
	var email = req.param('email', null);
	var password = req.param('password', null);

	if (null === email || null === password) {
		res.send(400);
		return;
	}

	//!! registration is going to get fired off and handled
	//!!even after the user received an OK response from the server.
	models.Account.register(email, password, firstName, lastName);
	res.send(200);
});


app.get('/account/authenticated', function(req, res){
	if ( req.session.loggedIn ) {
		res.send(200);
	} else {
		res.send(401);
	}
});

app.get('/account/:id/activity', function(req, res) {
	var accountId = req.params.id === 'me'	? req.session.accountId	: req.param.id;
	models.Account.findById(accountId, function( account) {
		res.send(account.activity);
	});
	res.send(200);
});

app.get('/account/:id/status', function(req, res) {
	var accountId = req.params.id === 'me'	? req.session.accountId	: req.param.id;
	models.Account.findById(accountId, function( account) {
		res.send(account.status);
	});
	res.send(200);
});

app.post('/account/:id/status', function(req, res) {
	var accountId = req.params.id === 'me'	? req.session.accountId	: req.param.id;
	models.Account.findById(accountId, function( account) {
		var status = {
			name: account_name,
			status: req.param('status', '')
		};
		account.status.push(status);

		//push the status to all friend
		account.activity.push(status);
		account.save(function(err) {
			if (err) {
				console.log('Error saving account: ' + err);
			}
		});
	});
	res.send(200);
});

app.get('/account/:id', function(req, res) {
	var accountId = req.params.id === 'me'	? req.session.accountId	: req.param.id;
	models.Account.findById(accountId, function( account) {
		res.send(account);
	});
});

app.post('/forgotpassword', function(req,res) {
	var hostname = req.headers.host;
	var resetPasswordUrl = 'http://' + hostname + '/resetPassword';
	var email   = req.param('email', null);
	if( null === email || email.length < 1 ) {
		res.send(400);
		return;
	}

	models.Account.forgotPassword(email, resetPasswordUrl, function(success) {
		if(!success) {
			res.send(200);
		} else {
			// Username or password not found
			res.send(400);
		}
	});
});

app.get('/resetPassword', function(req, res) {
	var accountId = req.param('account', null);
	res.render('resetPassword.jade', {locals:{accountId:accountId}});
});

app.post('/resetPassword', function(req, res) {
	var accountId = req.param('accountId', null);
	var password = req.param('password', null);
	if(null !== accountId && null !== password ) {
		models.Account.changePassword(accountId, password);
	}
	res.render('resetPasswordSuccess.jade');
});

app.listen(8080);
console.log('Listening on port 8080');