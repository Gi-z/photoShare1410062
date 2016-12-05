exports.loadPost = function(req, res, done) {
	if (req.param("post_id") == undefined) {
		res.redirect("/");
	}	
	else {
		if (!req.user) {
			res.render("post", { post_id: req.param("post_id")});
		}
		else {
			res.render("post", { post_id: req.param("post_id"), user: req.user.username });
		}
	}
}

exports.emptyPost = function(req, res, done) {
	res.redirect("/");
}
