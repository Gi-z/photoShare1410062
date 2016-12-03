const passport = require('passport');
var express = require('express');
var router = express.Router();
const multer = require("multer");

const apiController = require("../controllers/apiController.js");
const postController = require("../controllers/postController.js");
const pageController = require("../controllers/pageController.js");
const ratingController = require("../controllers/ratingController.js");

router.use("/*", function(req, res, next) {
	console.log(req.params);
	next();
});

router.get('/', pageController.home);
router.get("/F2A0339688B5C035FD8AD4FD5AB8AC27.txt", function (req, res, done) {
	res.sendFile(__dirname + "/F2A0339688B5C035FD8AD4FD5AB8AC27.txt");
});

router.get("/home", pageController.home);
router.get('/register', pageController.register);
router.get('/login', pageController.login);
router.get("/upload", pageController.upload);	
router.get("/post/", postController.emptyPost);
router.get("/post/:post_id", postController.loadPost);
router.get("/profile", pageController.profile);
router.get("/discover", pageController.discover);
//API Routes

router.get("/api/home", apiController.getHome);
router.get("/api/discover", apiController.getDiscover);
router.get("/api/post/:post_id", apiController.getPost);
router.get("/api/image/:post_id", apiController.image);
router.get("/api/profile/:username", apiController.profile);

router.post("/api/profile/:username/rate", ratingController.rateUser);

router.post('/api/register', passport.authenticate('register'), apiController.register);
router.post('/api/login', passport.authenticate('loggy'), apiController.login);

router.get("/api/comment/:comment_id", apiController.getComment);
router.post("/api/comment", apiController.newComment);
router.post("/api/comment/edit/:comment_id", apiController.editComment);

var uploading = multer({ storage: multer.memoryStorage() });                                                                                                                         var type = uploading.single("file");
router.post("/api/upload_image", type, apiController.upload);
router.post("/api/post/edit/:image_id", apiController.editImage);
router.post("/api/post/:image_id/rate", ratingController.rateImage);

app.use('/', router);
