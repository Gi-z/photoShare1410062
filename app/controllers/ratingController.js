const Comment = require("../models/comment.js");
const User = require("../models/user.js");

exports.rateUser = function(req, res, done) {
	if (!req.user)
		return res.json({
			"success": "false",
			"msg": "You must be logged in to make ratings."
		});

	var ratingUser = req.user;
	var uname = req.params.username;
	if (uname == null) {
		return res.json({
			"success": "false",
			"msg": "You must specify a user to rate."
		});
	}

	var userToRateFunc = function(usname, cb) {
		User.findOne({ username: usname }, function (err, user) {
			if (err == null) {
				cb(user);
			}
		});
	}

	var userToRate;
	userToRateFunc(uname, function(user) {
		userToRate = user;
	
		if (userToRate == null) {
			return res.json({
				"success": "false",
				"msg": "Rating could not be completed as the user does not exist."
			});
		}
		else {
			var userToBeCurrentRating = userToRate.rating;
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
			if (newRating > 5) {
				newRating = 5;		
			}
			else if (newRating < 0) {
				newRating = 0;
			}

			User.update({ username: userToRate.username }, { $set:{ rating: newRating }}, function(err, result) {
				if (err != null) {
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
		}
	});
};

exports.rateImage = function(req, res, done) {
		
};

exports.rateComment = function(req, res, done) {
	
};
