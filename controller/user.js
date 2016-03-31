var mongoose = require('mongoose'),
	User = mongoose.model('User');

exports.save = function (req, res) {
	var userModel = new User(req.body);
	userModel.save(function (err, user) {
		if (err) {
			res.json({
				success: false,
				data: err
			});
		} else {
			res.json({
				success: true,
				data: user
			});
		}
	})
};

exports.update = function (req, res) {

};

exports.delete = function (req, res) {

};
exports.list = function (req, res) {

};

exports.get = function (req, res) {

};