var mongoose = require('mongoose');
var db = require('../app/config/database');

//db connect
mongoose.connect(db.url);

var User = require('../app/models/user.js');
var scrypt = require("scrypt-async");

var firstNameArray = ["Sophia", "Emma", "Olivia", "Ava", "Isabella", "Mia", "Zoe", "Lily", "Emily", "Madelyn", "Madison", "Chloe", "Charlotte", "Aubrey", "Jackson", "Aiden", "Liam", "Lucas", "Noah", "Mason", "Ethan", "Caden", "Jacob", "Logan", "Jayden", "Elijah", "Jack", "Luke"];

var lastNameArray = ["Smith", "Johnson", "Williams", "Jones", "Brown", "Davis", "Miller", "Wilson", "Moore", "Taylor", "Anderson", "Thomas", "Jackson", "White", "Harris", "Martin", "Thompson", "Garcia", "Martinez", "Robinson", "Clark", "Rodriguez", "Lewis", "Lee", "Walker", "Hall", "Allen", "Young"];

var testUserPasswords = ["xBPQ2DacLWbZ083", "Vd34erT1rBMqqcg", "EHO389zWebJ6IB9", "pIffoUOc3YQTgQT", "0DEITyB4FfiAyht", "lMm0iM0J09ied45", "NOXUqlY5Pw0DbFf", "paelCTWQfbVtGRw", "K0iI5N8NzyGYVFm", "kSt0IiEglCyRrXB", "rdofJKmzN4L5tBT", "iB8zXhurR0o3Yo3", "meUfZnRZ0HgTJbL", "vk6acSlWdDkVZRC", "fHiLo1cNwd9CN16", "7MI0uBk4WGAvcat", "RayCMI3rTl3e9kt", "SNrUGKBo3ARbf09", "TSk3wso2KzoWrA8", "TtMDl2vmE8bUymP", "jFjPfs8XqFapY1m", "BInL5KWglFSw5Qj", "dFx0i4iNQnKDbcB", "LBfq5ly1aohKtxq", "OPEfmZvRlwWShph", "7OmJgjAVwlOR6oC", "aM2paS2stTXfQ8n", "ja8JUjCZujk8W35"];

for (var i=0; i<27; i++) {
	var newTestUser = new User();

	newTestUser.username = "testUser"+i;
	var newI;
	if (i<10) {
		newI = "00"+i;
	}
	else if (i<100 && i>10) {
		newI = "0"+i;
	}
	else {
		newI = i;
	}		

	var img = "https://s3-eu-west-1.amazonaws.com/photosharetestuserdata/profile_" + i + ".gif";

	newTestUser.name = firstNameArray[i] + " " + lastNameArray[i];
	var rand = require('csprng');
	var salt = rand(256, 36);
	var password = testUserPasswords[i];

	scrypt(password, salt, {
		N: 16384,
		r: 8,
		encoding: 'hex'
	}, function(derivedKey) {
		newTestUser.password = derivedKey;
		newTestUser.salt = salt;
	});

	newTestUser.admin = false;
	newTestUser.email = "test"+i+"@test.com";
	newTestUser.profile_pic = img;
	
	newTestUser.profile = {
		age: Math.floor(Math.random() * 50) + 18,
		bio: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim.",
		rating: +((Math.random() * 5.000) + 0.001).toFixed(3)
	};
	newTestUser.created_at = new Date();
	newTestUser.last_accessed = new Date();
	
	newTestUser.save(function(err) {
		if (err) {
			console.log("Error saving test user: " + err);
			throw err;
		}
		console.log("Test user registered: " + newTestUser.username);
	});
}
	
