var LocalStrategy = require('passport-local').Strategy;
var User = require('../models/user');

var scrypt = require('scrypt-async');

module.exports = function(passport) {

	passport.use('register', new LocalStrategy({
		passReqToCallback: true
	},
	function(req, username, password, done) {
	
		findOrCreateUser = function() {
	
			User.findOne({ "email": req.param("email")}, function(err, user) {
				if (err) {
					console.log("Error in validation: " + err);
					return done(err);
				}
				
				if (user) {
					console.log("User with email address already exists!");
					return done(null, false);
				}
			});
				
			User.findOne({ 'username': username}, function(err, user) {
				if (err) {
					console.log('Error in Register: '+err);
					return done(err);
				}

				if (user) {
					console.log('Username has been taken: '+username);
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

					newUser.name = req.param('name');
					newUser.email = req.param('email');
					newUser.admin = false;
					newUser.created_at = new Date();
					newUser.last_accessed = new Date();
					
					newUser.save(function(err) {
						if (err) {
							console.log('Error in saving user: ' + err);
							throw err;
						}
						console.log('User registration successful.');
						return done(null, newUser);
					});
				}
			});
		};

		process.nextTick(findOrCreateUser);
	})	
	);

}
