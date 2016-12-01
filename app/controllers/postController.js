exports.loadPost = function(req, res, done) {
	if (req.param("post_id") == undefined)
		res.redirect("/");
	else
		res.render("post", { "post_id": req.param("post_id")});
}

exports.emptyPost = function(req, res, done) {
	res.redirect("/");
}
