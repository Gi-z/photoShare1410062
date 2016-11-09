var mongoose = require('mongoose');
var User = require('./app/models/user.js');

var scrypt = require('scrypt-async');

var newUser = new User();
newUser.username = "testuser1";

var password = "thistest";

var rand = require('csprng');
var salt = rand(256, 36);

scrypt(password, salt, {
	N: 16384,
	r: 8,
	encoding: 'hex'
}, function(derivedKey) {
	newUser.password = derivedKey;
	newUser.salt = salt;
});

newUser.name = "Test User";
newUser.email = "meme@meme.com";
newUser.admin = true;

var currentTime = new Date();

newUser.created_at = currentTime;
newUser.last_accessed = currentTime;

newUser.save(function(err) {
	if (err) {
		console.log("error saving test user: " + err);
		throw err;
	}
	console.log("Test user registered.");
});


