var LocalStrategy = require('passport-local').Strategy;
var User = require('../models/user');

var scrypt = require('scrypt-async');

module.exports = function(passport) {

	passport.use('register', new LocalStrategy({
		passReqToCallback: true
	},
	function(req, username, password, done) {
		console.log("Started here");

		var username = req.param("username");
		var password = req.param("password");
		var name = req.param("name");
		var age = req.param("age");
		var email = req.param("email");
		console.log(username + " " + password + " " + name + " " + age + " " + email);
	
	
			User.findOne({ "email": email}, function(err, user) {
				if (err) {
					return done(err);
				}
				
				if (user) {
					return done(null, false);
				}
				
			User.findOne({ 'username': username}, function(err, user) {
				if (err) {
					return done(err);
				}

				if (user) {
					return done(null, false);
				}
				else {
					var newUser = new User();

					newUser.username = username;
					
					//Generate salt.
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

					newUser.name = name;
					newUser.email = email;
			
					newUser.rating = +((Math.random() * 5.000) + 0.001).toFixed(3);
	
					//Not implemented.
					newUser.admin = false;
			
					newUser.created_at = new Date();
					newUser.last_accessed = new Date();
					
					newUser.save(function(err) {
						if (err) {
							throw err;
						}
						return done(null, newUser);
					});
				}
			});
		});
	})	
);

}
