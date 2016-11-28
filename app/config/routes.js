const passport = require('passport');
var express = require('express');
var router = express.Router();
const multer = require("multer");
const apiController = require("../controllers/apiController.js");

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

router.get("/upload", function(req, res) {
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

router.post('/api/register', passport.authenticate('register'), apiController.register);

router.post('/api/login', passport.authenticate('loggy'), apiController.login);

var uploading = multer({ storage: multer.memoryStorage() });                                                                                                                         var type = uploading.single("file");
router.post("/api/upload_image", type, apiController.upload);

app.use('/', router);
