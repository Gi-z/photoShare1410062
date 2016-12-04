const Comment = require("../models/comment.js");
const User = require("../models/user.js");
const Post = require("../models/post.js");
const stringify = require("node-stringify");

exports.rateUser = function(req, res, done) {
	if (!req.user)
		return res.json({
			"success": "false",
			"msg": "You must be logged in to make ratings."
		});

	var ratingUser = req.user;
	var uname = req.params.username;
	var ratingUserMade = req.param("proposedRating");
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
			calculateAndRateUser(userToRate, ratingUser, ratingUserMade, null, res);
		}
	});
};

exports.rateImage = function(req, res, done) {
	
	if (!req.user)
		return res.json({
			"success": "false",
			"msg": "You must be logged in to make ratings."
		});

	var ratingUserRating = req.user.rating;
	var ratingUserMade = parseFloat(req.param("proposedRating"));
	var imId = req.params.image_id;
	
	if (imId == null) {
		return res.json({
			"success": "false",
			"msg": "You must specify an image to rate."
		});
	}

	var imageToRateFunc = function(imageId, cb) {
		Post.findOne({ _id: imageId }, function (err, image) {
			if (err == null) {
				cb(image);
			}
			else {
				return res.json({
					"success": "false",
					"msg": "Post not found."
				});
			}
		});
	}
	
	var imageToRate;
	imageToRateFunc(imId, function(image) {
		imageToRate = image;
	
		if (imageToRate == null) {
			return res.json({
				"success": "false",
				"msg": "Rating could not be completed as the image does not exist."
			});
		}
		else {
			calculateAndRateImage(imageToRate, ratingUserRating, req.param("proposedRating"), res);
				
			//Need to rate the user too.
				
			var ratingUser = req.user;
			var uname = imageToRate.user;
			var ratingUserMade = req.param("proposedRating");

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
					calculateAndRateUser(userToRate, ratingUser, ratingUserMade, "post", res);
				}
			});
		}
	});
};

exports.rateComment = function(req, res, done) {
	
			
};

function calculateAndRateUser(userToRate, ratingUser, ratingUserMade, postType, res) {
	
	var userToBeCurrentRating = userToRate.rating;
	var ratingUserRating = ratingUser.rating;
	var maxRating = 5;

	var ratingMultiplier = 1;

	if (postType == "post") {
		ratingMultiplier = 0.25;
	}
	else if (postType == "comment") {
		ratingMultiplier = 0.125;
	}

	if (isNaN(ratingUserMade) && postType == null)
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
	else
		ratingUserMade = 0;

	var ratingImpact = ratingUserRating/maxRating;
	var calculatedRatingChange = (ratingUserMade/10)*ratingImpact;
	var newRating = userToBeCurrentRating+(calculatedRatingChange*ratingMultiplier);
	if (newRating > 5) {
		newRating = 5;		
	}
	else if (newRating < 0) {
		newRating = 0;
	}

	User.update({ username: userToRate.username }, { $set:{ rating: newRating }}, function(err, result) {
		if (err != null && postType == null) {
			return res.json({
				"success": "false",
				"msg": "Failed to update user rating."
			});
		}
		
		if (postType == null) {
			return res.json({
				"success": "true",
				"msg": "User successfully rated.",
				"newRating": newRating
			});
		}
	});
}

function calculateAndRateImage(imageToBeRated, ratingUserRating, ratingUserMade, res) {
	
	var imageToBeCurrentRating = imageToBeRated.rating;
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
	else
		ratingUserMade = 0;

	var ratingImpact = ratingUserRating/maxRating;
	var calculatedRatingChange = (ratingUserMade/10)*ratingImpact;
	var newRating = imageToBeCurrentRating+calculatedRatingChange;
	if (newRating > 5) {
		newRating = 5;		
	}
	else if (newRating < 0) {
		newRating = 0;
	}

	Post.update({ _id: imageToBeRated._id }, { $set:{ rating: newRating }}, function(err, result) {
		if (err != null) {
			return res.json({
				"success": "false",
				"msg": "Failed to update post rating."
			});
		}
		
		return res.json({
			"success": "true",
			"msg": "Post successfully rated.",
			"newRating": newRating
		});
	});
}
