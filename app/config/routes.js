var passport = require('passport');
var express = require('express');
var router = express.Router();

var User = require('../models/user.js');

router.get('/', function(req, res) {
	res.render('homepage', { title: "Test", message: "This is a test message" });
});

router.get('/register', function(req, res) {
	res.render('register');
});

router.post('/login', passport.authenticate('loggy', {
	successRedirect: '/',
	failureRedirect: '/login',
	failureFlash: true
}), function(req, res) {
	console.log("this was run");
});

router.post('/register', passport.authenticate('signup', {
	successRedirect: '/',
	failureRedirect: '/register',
	failureFlash: true
}));

app.use('/', router);
