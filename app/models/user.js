var mongoose = require('mongoose');

var userSchema = new Schema({
	name: String,
	username: { type: String, required: true, unique: true },
	password: { type: String, required: true },
	admin: Boolean,
	profile: {
		age: Number,
		bio: String,
		rating: Number,
	}
	created_at: Date,
	last_accessed: Date
});

var User = mongoose.model('User', userSchema);

module.exports = User;
