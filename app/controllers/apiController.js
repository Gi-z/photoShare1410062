const fs = require("fs");
const multer = require("multer");
const aws = require("aws-sdk");
const fileType = require("file-type");
const ExifImage = require("exif").ExifImage;
const stringify = require("node-stringify");

const User = require("../models/user.js");
const Post = require("../models/post.js");


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

	exports.upload = function(req, res, done) {
			
		var postTitle = req.query("title");
		var postCaption = req.query("caption");
		var postUser = req.user.username;
		var postUploadedAt = new Date();
		var postLocation = req.query("location");

		var buf = req.file.buffer;
		
		var newPost = new Post();
		newPost.title = postTitle;
		newPost.user = postUser;
		newPost.uploaded_at = postUploadedAt;
		newPost.location = postLocation;
		newPost.meta.caption = postCaption;

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
						console.log(data);
						newPost.url = data["Location"];
						newPost.save(function(err) {
							if (err)
								console.log("Error in creating post: " + err);
							console.log("Post created with id " + newPost._id);
						});
			
						res.json({
							"success": "true",
							"msg": "Post created with id " + newPost._id
						});
					});
				});
			}
		}
