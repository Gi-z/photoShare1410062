const Comment = "../models/comment.js";

exports.rateUser = function(req, res, done) {
	if (!req.user)
		return res.json({
			"success": "false",
			"msg": "You must be logged in to make ratings."
		});

	var ratingUser = req.user;
	var userToBeRated;
	var uname = req.param("user");
	if (!uname)
		return res.json({
			"success": "false",
			"msg": "You must specify a user to rate."
		});

	User.findOne({ username: uname }, function (err, user) {
		if (err)
			userToBeRated = null;
		else
			userToBeRated = user;
	});

	if (!userToBeRated)
		return res.json({
			"success": "false",
			"msg": "Rating could not be completed as the user does not exist."
		});

	var userToBeCurrentRating = userToBeRated.rating;
	var ratingUserRating = ratingUser.rating;
	var ratingUserMade = req.param("proposedRating");
	var maxRating = 5;

	if (isNaN(ratingUserMade))
		return res.json({
			"success": "false",
			"msg": "Rating could not be completed as the rating was not a valid number."
		});

	//Convert rating out of 5 into easily calculable numbers.
	//5 stars is 2.5
	//1 star is -2.5, etc.	

	if (ratingUserMade == 1)
		ratingUserMade = -2.5;
	else if (ratingUserMade == 2)
		ratingUserMade = -1.25;
	else if (ratingUserMade == 3)
		ratingUserMade = 0;
	else if (ratingUserMade == 4)
		ratingUserMade = 1.25;
	else if (ratingUserMade == 5)
		ratingUserMade = 2.5;

	var ratingImpact = ratingUserRating/maxRating;
	var calculatedRatingChange = (ratingUserMade/10)*ratingImpact;

	var newRating = userToBeCurrentRating+calculatedRatingChange;
	
	User.update({ username: userToBeRated.username }, { $set:{ rating: newRating }}, function(err, result) {
		if (err) {
			return res.json({
				"success": "false",
				"msg": "Failed to update user rating."
			});
		}
		
		return res.json({
			"success": "true",
			"msg": "User successfully rated.",
			"newRating": newRating
		});
	});
};

exports.rateImage = function(req, res, done) {
	
};

exports.rateComment = function(req, res, done) {
	
};
