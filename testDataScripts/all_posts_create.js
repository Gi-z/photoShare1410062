var mongoose = require('mongoose');
var db = require('../app/config/database');
var fs = require("fs");

//db connect
mongoose.connect(db.url);

var Post = require('../app/models/post.js');

var text = fs.readFileSync("titles.txt").toString();
var titleArray = text.split("\n");

var newText = fs.readFileSync("locations.txt").toString();
var locationsArray = newText.split('\n');

for (var i=0; i<170; i++) {
	var newTestPost = new Post();
	
	newTestPost.title = titleArray[i];
	newTestPost.user = "testUser"+(Math.floor(Math.random()*27)+1);
	newTestPost.uploaded_at = new Date();
	newTestPost.location = locationsArray[Math.floor(Math.random()*(locationsArray.length-1))+1];
	var newI = i;
	if (i<10) {
		newI = "00"+i;
	}
	else if (i<100 && i>10) {
		newI = "0"+i;
	}
	else {
		newI = i;
	}	

	var img = "https://s3-eu-west-1.amazonaws.com/photosharetestuserdata/photo_" + newI + ".jpg";
	newTestPost.url = img;

	newTestPost.meta = {
		caption: "Quisque rutrum. Aenean imperdiet. Etiam ultricies nisi vel augue. Curabitur ullamcorper ultricies nisi. Nam eget dui. Etiam rhoncus. Maecenas tempus, tellus eget condimentum rhoncus, sem quam semper libero, sit amet adipiscing sem neque sed ipsum.",
	};

	newTestPost.rating = +((Math.random()*5.000)+0.001).toFixed(3);
	newTestPost.save(function(err) {
		if (err) {
			console.log("Error saving test post: " + err);
			throw err;
		}
		console.log("Test post created: " + newTestPost.title);
	});
}
	
