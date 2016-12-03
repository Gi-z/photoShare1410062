var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var scrypt = require('scrypt');
var scryptParameters = scrypt.paramsSync(0.1);

var userSchema = new Schema({
	name: String,
	username: { type: String, required: true, unique: true },
	password: { type: String, required: true },
	salt: String,
	admin: Boolean,
	email: String,
	profile_pic: String,
	rating: Number,
	profile: {
		age: Number,
		bio: String
	},
	created_at: Date,
	last_accessed: Date
});

var User = mongoose.model('User', userSchema);

module.exports = User;
