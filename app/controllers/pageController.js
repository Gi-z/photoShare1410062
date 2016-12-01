exports.home = function(req, res, done) {
	res.render("homepage");
}

exports.register = function(req, res, done) {
	res.render("register");
}

exports.login = function(req, res, done) {
	res.render("login");
}

exports.upload = function(req, res, done) {
	res.render("upload");
}

exports.profile = function(req, res, done) {
	res.render("profile", { user: req.user.username });
}

exports.discover = function(req, res, done) {
	res.render("discover");
}
