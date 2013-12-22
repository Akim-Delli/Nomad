/**
 * web server entry point.
 */

var express = require('express');
var app = express();

app.configure(function(){
	app.set('view engine','jade');
	app.use(express.static(__dirname + '/public'));
});

app.get('/', function(req, res){
	res.render("index.jade", {layout: false});
});

app.get('/account/authenticated', function(req, res){
	if ( req.session.loggedIn ) {
		res.send(200);
	} else {
		res.send(401);
	}
});

app.post('/register', function(req,res) {
	var firstname = req.param('firstName', '');
	var lastName = req.param('lastName','');
	var email = req.param('email', null);
	var password = req.param('password', null);

	if (null === email || null === password) {
		res.send(400);
		return;
	}

	//!! registration is going to get fired off and handled
	//!!even after the user received an OK response from the server.
	Account.register(email, password, firstName, lastName);
	res.send(200);
});

app.post('/login', function(req,res) {
	console.log('login request');
	var email = req.param('email', null);
	var password = req.param('password', null);

	if (null === email || email.length < 1 || null === password || password.lenght < 1) {
		res.send(400);
		return;
	}

	//!! registration is going to get fired off and handled
	//!!even after the user received an OK response from the server.
	Account.login(email, password, function(success) {
		if(!success) {
			res.send(401);
			return;
		}
		console.log('login was successful');
		res.send(200);
	});
	res.send(200);
});

app.post('/forgotpassword', function(req,res) {
	var hostname = req.headers.host;
	var resetPasswordUrl = 'http://' + hostname + '/resetPassword';
	var email   = req.param('email', null);
	if( null === email || email.length < 1 ) {
		res.send(400);
		return;
	}

	Account.forgotPassword(email, resetPasswordUrl, function(success) {
		if(!success) {
			res.send(200);
		} else {
			// Username or password not found
			res.send(400);
		}
	});
});

app.listen(8080);