const fs = require("fs");
const multer = require("multer");
const aws = require("aws-sdk");
const fileType = require("file-type");
const ExifImage = require("exif").ExifImage;
const stringify = require("node-stringify");

const User = require("../models/user.js");
const Post = require("../models/post.js");
const Comment = require("../models/comment.js");

exports.register = function(req, res, done) {	
	if (res.user) {
		res.json({
			"success": "true",
			"msg": "User " + req.param("username") + " successfully created."
		});
	}
	else {
		res.json({
			"success": "false",
			"msg": "User creation failed."
		});
	}
}

exports.login = function(req, res, done) {
	if (res.user) {
		res.json({
			"success": "true",
			"msg": "Logged in successfully."
		});     
	}
	else {            
		res.json({
			"success": "false",
			"msg": "Login failed."
		}); 
	}
}

exports.getPost = function(req, res, done) {
	
	var postId = req.params.post_id;

	Post.findOne({ "_id": postId },
	function(err, post) {
			if (err)
				res.json({
					"success": "false",
					"msg": "Post retrieval failed with error: " + err
				});
			else
				var postTitle = post.title;
				var postUser = post.user;
				var postUploadedAt = post.uploaded_at;
				var postLocation = post.location;
				var postUrl = post.url;
				var postMeta = post.meta;
				var postComments = post.comments;
				var postRating = post.rating;

				var postResp = {
					"title": postTitle,
					"user": postUser,
					"uploaded_at": postUploadedAt,
					"location": postLocation,
					"url": postUrl,
					"rating": postRating,
					"meta": postMeta,
					"comments": postComments
				};
				res.json({
					"success": "true",
					"msg": "Post was successfully retrieved.",
					"post": postResp
				});
	});
}

exports.upload = function(req, res, done) {
		
	var postTitle = req.param("title");
	var postCaption = req.param("caption");
	var postUser = req.user.username;
	var postUploadedAt = new Date();
	var postLocation = req.param("location");
	var postRating = 3.000;

	var buf = req.file.buffer;
	
	var newPost = new Post();
	newPost.title = postTitle;
	newPost.user = postUser;
	newPost.uploaded_at = postUploadedAt;
	newPost.location = postLocation;
	newPost.meta.caption = postCaption;
	newPost.rating = postRating;

	if (fileType(buf).mime.indexOf("image") == -1) {
		res.json({
			"success": "false",
			"msg": "An image file was not uploaded."
		});
	}
	else {
		var exifInfo;	
		try {
		
			new ExifImage({ image: buf }, function(err, exifData) {
				if (err)
					console.log("Error extracting exifData: " + err);
				else
					console.log(stringify(exifData));
					newPost.meta.exifRand = stringify(exifData);
			});
		} catch (error) {
			console.log("Error extracting exifData: " + error);
		}

		var s3 = new aws.S3();
		s3.createBucket({Bucket: "photoshare1410062"}, function () {
			s3.upload({
				Bucket: "photoshare1410062",
				Key: req.file.originalname,
				Body: buf 
			}, function(err, data) {
				if (err)
					console.log(err);
				else 
					newPost.url = data["Location"];
					newPost.save(function(err) {
						if (err)
							console.log("Error in creating post: " + err);
					});
		
					res.json({
						"success": "true",
						"msg": "Post created.",
						"id": newPost._id
					});
				});
			});
		}
}

exports.image = function(req, res, done) {
	var postId = req.param("post_id");
	Post.findOne({ _id: postId }, function(err, post) {
		if (err)
			res.json({
				"success": "false",
				"msg": "Failed to retrieve image with error: " + err
			});
		else
			res.json({
				"success": "true",
				"msg": "Post with id (" + postId + ") has successfully been retrieved.",
				"url": post.url
			});	
	});
}

exports.editImage = function(req, res, done) {
	
}

exports.getDiscover = function(req, res, done) {
	Post.find().sort({"rating": -1}).limit(25).exec(function(err, posts) {
		if (err)
			res.json({
				"success": "false",
				"msg": "Failed to retrieve top posts, error: " + err
			});
		else
			res.json({
				"success": "true",
				"msg": "Top posts were successfully retrieved.",
				"posts": JSON.stringify(posts)
			});
	});		
}

exports.getHome = function(req, res, done) {
	Post.find().sort({"uploaded_at": -1}).limit(25).exec(function(err, posts) {
		if (err)
			res.json({
				"success": "false",
				"msg": "Failed to retrieve top posts, with error: " + err
			});
		else
			res.json({
				"success": "true",
				"msg": "Most recent posts were successfully retrieved.",
				"posts": JSON.stringify(posts)
			});
	});
}

exports.profile = function(req, res, done) {
	var uname = req.param("username");
	User.findOne({ username: uname }, function(err, user) {
		if (err)
			res.json({
				"success": "false",
				"msg": "Failed to retrieve user with error: " + err
			});
		else
			var respDict = {};
			respDict["name"] = user.name;
			respDict["profile_pic"] = user.profile_pic;
			respDict["username"] = user.username;
			respDict["bio"] = user.profile["bio"];
			respDict["rating"] = user.rating;		
			respDict["age"] = user.age;	
			res.json({
				"success": "true",
				"msg": "User " + uname + " has successfully been retrieved.",
				"user": respDict
			});	
	});
}

exports.getComment = function(req, res, done) {
	Comment.findOne({ _id: req.param("comment_id") }, function(err, comment) {
		if (err) {
			console.log("Error loading comment: " + err);
			res.json({
				"success": "false",
				"msg": "Error loading comment: " + req.param("comment_id")
			});
		}
		else {
			var respDict = {};
			respDict["user"] = comment.user;
			respDict["photo_id"] = comment.photo_id;
			respDict["comment_body"] = comment.comment_body;
			respDict["comment_reaction"] = comment.comment_reaction;
			respDict["posted_at"] = comment.posted_at;
			respDict["comment_id_resp"] = comment.comment_id_resp;
			respDict["rating"] = comment.rating;

			res.json({
				"success": "true",
				"msg": "Comment " + req.param("comment_id") + " loaded successfully.",
				"comment": respDict
			}); 
		}
	});
}

exports.newComment = function(req, res, done) {

	if (!req.user)
		return res.json({
			"success": "false",
			"msg": "You must be logged in to perform this action."
		});

	var userIn = req.user.username;
	var photo_idIn = req.param("photo_id");
	var comment_bodyIn = req.param("comment_body");

	//Will not be implemented in this release.
	var comment_reactionIn = req.param("comment_reaction");
	var posted_atIn = new Date();
	
	//Will not be implemented in this release.
	var comment_id_respIn = null;
	
	//Comments have a base rating of 3 when created.
	//As do posts.
	var ratingIn = 3;

	if (userIn == null || photo_idIn == null || comment_bodyIn == null || posted_atIn == null) {
		return res.json({
			"success": "false",
			"msg": "Incorrect parameters were sent. Try again later."
		});
	}

	var newComm = new Comment(); 
	newComm.user = userIn;	
	newComm.photo_id = photo_idIn;
	newComm.comment_body = comment_bodyIn;
	//newComm.comment_reaction = comment_reactionIn;
	newComm.posted_at = posted_atIn;
	newComm.save(function(err) {
		if (err != null) {
			return res.json({
				"success": "false",
				"msg": "Error creating comment."
			});
		}
		else {
			return res.json({
				"success": "true",
				"msg": "Comment successfully created."
			});
		}
	});
}

exports.editComment = function(req, res, done) {	
	
}
