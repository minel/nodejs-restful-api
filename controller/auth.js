var mongoose = require('mongoose'),
	User = mongoose.model('User'),
	jwt = require('jsonwebtoken');

exports.login = function (req, res) {
	User.findOne({
		email: req.body.email,
		password: req.body.password
	},function (err, user) {
		if (err) {
			console.error(err);
			res.status(500)
				.json({
					success: false,
					data: 'Error occured while login'
				});
		} else {
			if (user) {
				var userWillBeSigned = delete user.password;
				var token = jwt.sign(userWillBeSigned, process.env.JWT_SECRET || 'sshhsshh');
				user.token = token;
				user.save(function (err) {
					if (err) {
						res.json({
							success: false,
							data: 'Error occured while saving user token'
						});
					} else {
						res.json({
							success: true,
							data: token
						});
					}
				});
			} else {
				res.json({
					success: false,
					data: 'Invalid credentials'
				});
			}
		}
	})
};

exports.register = function (req, res) {
	//automatic cast the req.body
	var userModel = new User(req.body);

	userModel.save(function (err, user) {
		if (err) {
			console.error(err);
			res.status(500)
			.json({
				success: false,
				data: 'Error occured registering user'
			});
		} else {
			res.json({
				success: true,
				data: user
			});
		}
	});

};