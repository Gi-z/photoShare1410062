var login = require('./login');
var register = require('./register');
var User = require('../models/user');

module.exports = function(passport) {

	passport.serializeUser(function(user, done) {
		console.log('Serializing user: ', user);
		done(null, user._id);
	});

	passport.deserializeUser(function(id, done) {
		User.findById(id, function(er, user) {
			console.log('Deserializing User: ', user);
			done(er, user);
		});
	});

	login(passport);
	register(passport);

}
