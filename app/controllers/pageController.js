exports.home = function(req, res, done) {
	if (req.user)
		res.render("homepage", {user: req.user.username});
	else
		res.render("homepage");
}

exports.register = function(req, res, done) {
	if (req.user)
		res.redirect("/home");
	else
		res.render("register");
}

exports.login = function(req, res, done) {
	if (req.user)
		res.redirect("/home");
	else
		res.render('login');
}

exports.upload = function(req, res, done) {
	if (req.user)
		res.render("upload");
	else
		res.redirect("/login")
}

exports.profile = function(req, res, done) {
	if (req.user)
		res.render("profile", { user: req.user.username });
	else
		res.redirect("/home")
}

exports.discover = function(req, res, done) {
	if (req.user)
		res.render("discover", {user: req.user.username});
	else
		res.render("discover");
}
