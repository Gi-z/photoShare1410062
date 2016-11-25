var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var commentSchema = new Schema({
	user: String,
	photo_id: String,
	comment_body: String,
	comment_reaction: String,
	posted_at: Date,
	comment: String,
	likes: Number
});

var Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;
