const passport = require('passport');
var express = require('express');
var router = express.Router();
var fs = require('fs');
var multer = require("multer");
var aws = require("aws-sdk");
const fileType = require('file-type');

var User = require('../models/user.js');

router.use("/*", function(req, res, next) {
	console.log(req.params);
	next();
});

router.get('/', function(req, res) {
	res.redirect("/home");
});

router.get("/home", function(req, res) {
	res.render('homepage', { title: "Test", message: "This is a test message" });
});

router.get('/register', function(req, res) {
	res.render('register');
});

router.get('/login', function(req, res) {
	res.render('login');
});

router.post('/login', passport.authenticate('loggy', {
	successRedirect: '/home',
	failureRedirect: '/login',
}), function(req, res) {
	console.log("this was run");
});

router.get('/register', isLoggedIn, function(req, res) {
	res.render("register");
});

router.get("/upload", isLoggedIn, function(req, res) {
	res.render('upload');
});	

//API Routes

router.get("/api/home/:username", function(req, res) {
	//RETURN ALL POSTS FROM FOLLOWED USERS (ORDERED BY DATETIME)
	var posts = [];

	return posts;
});

router.get("/api/discover", function(req, res) {
	//RETURN MOST POPULAR POSTS (ORDERED BY RATING/ENGAGEMENT)
	var posts = [];

	return posts;
});

router.get("/api/post/:post_id", function(req, res) {
	//RETURN POST WITH SPECIFIED ID
	var post;

	return post;
});

router.get("/api/image/:image_id", function(req, res) {
	//REUTRN IMAGE URL FOR IMAGE WITH SPECIFIED ID
	var imageURL;

	return imageURL;
});

router.get("/api/profile/:username", function(req, res) {
	//RETURN USER PROFILE INFORMATION FOR SPECIFIED ID.
	var user;

	return user;
});

router.post('/api/register', passport.authenticate('register'), function(req, res, done) {
	if (res.user)	
		res.json({
			"success": "true",
			"msg": "User " + req.param("username") + " successfully created."
		});
	else
		res.json({
			"success": "false",
		});		
});


var uploading = multer({ storage: multer.memoryStorage() });
var type = uploading.single("file");

router.post("/api/upload_image", type, function(req, res) {
	console.log(req);
	var buf = req.file.buffer;
	
	console.log(fileType(buf));	
	if (fileType(buf).mime.indexOf("image") == -1) {
		res.json({
			"success": "false",
			"msg": "An image file was not uploaded."
		});
	}
	else {	
		var s3 = new aws.S3();
		s3.createBucket({Bucket: "photoshare1410062"}, function () {
			s3.putObject({
				Bucket: "photoshare1410062",
				Key: req.file.originalname,
				Body: buf 
			}, function(err, data) {
				if (err)
					console.log(err);
				else
					res.json({
						"success": "true",
						"msg": "The file " + req.file.originalname + " was successfully uploaded."
					});
			});
		});
	}

});

function isLoggedIn(req, res, next) {
	if (req.isAuthenticated()) {
		return next();
	}	
	
	res.redirect('/');
}

function isLoggedInLogin(req, res, next) {
	if (req.isAuthenticated()) {
		res.redirect('/');
	}
}
app.use('/', router);
