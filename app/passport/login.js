var LocalStrategy   = require('passport-local').Strategy;
var User = require('../models/user');

var scrypt = require('scrypt-async');

module.exports = function(passport) {

	passport.use('loggy', new LocalStrategy({
		passReqToCallback: true
	},
	function(req, username, password, done) {
		User.findOne({ 'username': username },
			function(err, user) {
		
				if (err)
					return done(err);

				if (!user) {
					console.log('Invalid username!');
					return done(null, false);
				}

				if (!isValidPassword(user, password)) {
					console.log('Invalid password!');
					return done(null, false);
				}

				return done(null, user);
			}
		);
	})
	
	);

	var isValidPassword = function(user, password) {
		var genKey;
		scrypt(password, user.salt, {
			N: 16384,
			r: 8,
			encoding: 'hex'
		}, function(derivedKey) {
			genKey = derivedKey;
		});

		return genKey == user.password;
	}
}
