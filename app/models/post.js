var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var postSchema = new Schema({
	title: String,
	user: String,
	uploaded_at: Date,
	location: String,
	url: String,
	meta: {
		caption: String,
		exifRand: String,
		geotag_name: String,
		geotag_location_long: Number,
		geotag_location_lat: Number
	},
	comments: String
});

var Post = mongoose.model('Post', postSchema);

module.exports = Post;
