var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var photoSchema = new Schema({
	title: String,
	user: String,
	uploaded_at: Date,
	location: String,
	meta: {
		caption: String,
		exif: {
			creation_date: Date,
			dimensions: String,
			exposure_time: Number,
			jpeg_quality: String,
			aperture: String,
			color_mode: String,
			flash_used: Boolean,
			focal_length: Number,
			iso: Number,
			jpeg_process: String,
			camera_manufacturer: String,
			metering_mode: String,
			camera_model: String,
			orientation: Number
		},
		geotag_name: String,
		geotag_location_long: Number,
		geotag_location_lat: Number
	},
	comments: String
});

var Photo = mongoose.model('Photo', photoSchema);

module.exports = Photo;
