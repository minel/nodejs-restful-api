var app = module.exports = require("express")();

require('./core/mongoose');
//require('./core/express')(app);

var port = process.env.PORT || 3000;

app.listen(port, function (err) {
	if (err) {
		console.error(err);
	} else {
		console.info("App is running on port: ", port);
	}
});