var express = require('express'),
	bodyParser = require('body-parser'),
	methodOverride = require('method-override'),
	expressJwt = require('express-jwt'),
	morgan = require('morgan'),
	unless = require('express-unless'),
	mongoose = require('mongoose'),
	User = mongoose.model('User');

module.exports = function (app) {
	// for send json in body
	app.use(bodyParser.json());
	app.use(bodyParser.urlencoded({extended : true}));

	// for send post/put methods
	app.use(methodOverride()); 

	// it means 'logs: on only test environment
	if (process.env.NODE_ENV !== 'test') { 
		app.use(morgan('combined'));
	}

	// Allow Cross-Origin request sharing
	// you can write any domain name instead of *
	// example http://localhost:4000
	app.use(function (req, res, next) {
		res.header('Access-Control-Allow-Origin', '*');
		res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
		//res.header('Access-Control-Allow-Headers', 'X-Requested-With,Content-Type,Authorization');
		next();
	});

	// activate Jwt
	// required parameters body(user credentials) and secret(key for crypting)
	// unless: don't apply authentication layer for path variables
	app.use(
		expressJwt({
			secret: process.env.JWT_SECRET || 'sssshhhh'
		}).unless({
			path: ['/api/login', '/api/register']
		})
	);

	// token is the field on user table
	app.use(function (req, res, next) {
		User.find({token: req.token}, function (err, user) {
			if (err){
				return next(err);
			}
			req.user = user;
			next();
		});
	});

	// include routes
	app.use('/api', require(process.cwd() + '/core/router.js')());

	//if not any routing, go 404 not found
	app.all('*', function (req, res) {
		res.status(404).json({
			success : false,
			data: 'Not found'
		});
	});
}