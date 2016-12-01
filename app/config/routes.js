const passport = require('passport');
var express = require('express');
var router = express.Router();
const multer = require("multer");

const apiController = require("../controllers/apiController.js");
const postController = require("../controllers/postController.js");

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

router.get("/post/", postController.emptyPost);
router.get("/post/:post_id", postController.loadPost);

//API Routes

router.get("/api/home", apiController.getHome);
router.get("/api/discover", apiController.getDiscover);
router.get("/api/post/:post_id", apiController.getPost);
router.get("/api/image/:post_id", apiController.image);
router.get("/api/profile/:username", apiController.profile);

router.post('/api/register', passport.authenticate('register'), apiController.register);

router.post('/api/login', passport.authenticate('loggy'), apiController.login);

var uploading = multer({ storage: multer.memoryStorage() });                                                                                                                         var type = uploading.single("file");
router.post("/api/upload_image", type, apiController.upload);

app.use('/', router);
