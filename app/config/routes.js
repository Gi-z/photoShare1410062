const passport = require('passport');
var express = require('express');
var router = express.Router();
const multer = require("multer");

const apiController = require("../controllers/apiController.js");
const postController = require("../controllers/postController.js");
const pageController = require("../controllers/pageController.js");
const ratingController = require("../controllers/ratingController.js");

router.get('/', pageController.home);

router.get("/home", pageController.home);
router.get('/register', pageController.register);
router.get('/login', pageController.login);
router.get("/upload", pageController.upload);	
router.get("/post/", postController.emptyPost);
router.get("/post/:post_id", postController.loadPost);
router.get("/profile", pageController.profile);
router.get("/profile/:username", pageController.publicProfile);
router.get("/discover", pageController.discover);
//API Routes

router.get("/api/home", apiController.getHome);
router.get("/api/discover", apiController.getDiscover);
router.get("/api/post/:post_id", apiController.getPost);
router.get("/api/image/:post_id", apiController.image);
router.get("/api/profile/:username", apiController.profile);

router.post("/api/profile/:username/rate/:rating", ratingController.rateUser);

router.post('/api/register', function (req, res, next) {
	passport.authenticate('register', function(err, user, info) {
		if (err) {
			return next(err);
		}
		console.log(req.body);	
	
		if (!user) {
			return res.status(403).json({
				"success": "false",
				"msg": "Registration failed."
			});
		}

		return res.json({
			"success": "true",
			"msg": "Registration successful!",
			"user": user.username
		});
	})(req, res, next);			
});

router.post('/api/login', function (req, res, next) {
	passport.authenticate('loggy', function(err, user, info) {
		if (err) {
			return next(err);
		}
		
		if (!user) {
			return res.status(403).json({
				"success": "false",
				"msg": "Login failed."
			});
		}

		req.logIn(user, function(err) {
			if (err) {
				return next(err);
			}
			else {	
				return res.json({
					"success": "true",
					"msg": "Login successful!",
					"user": user.username
				});
			}
		});
	})(req, res, next);			
});

router.get("/api/comment/:comment_id", apiController.getComment);
router.post("/api/comment", apiController.newComment);
//router.post("/api/comment/edit/:comment_id", apiController.editComment);

var uploading = multer({ storage: multer.memoryStorage() });                                                                                                                         var type = uploading.single("file");
router.post("/api/upload_image", type, apiController.upload);
router.post("/api/post/edit/:image_id", apiController.editImage);
router.post("/api/post/:image_id/rate/:rating", ratingController.rateImage);

app.use('/', router);
