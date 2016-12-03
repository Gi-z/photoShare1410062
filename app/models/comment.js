var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var commentSchema = new Schema({
	user: String,
	photo_id: String,
	comment_body: String,
	comment_reaction: String,
	posted_at: Date,
	comment_id_resp: String,
	rating: Number
});

var Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;
