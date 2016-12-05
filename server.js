//Server file.

//imports

var express = require('express');
app = express();
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var mongoose = require('mongoose');
var passport = require('passport');
var session = require('express-session');
var morgan = require('morgan');
var path = require("path");
var spdy = require("spdy");
var fs = require("fs");
var constants = require('constants');
var helmet = require("helmet");
var RateLimit = require("express-rate-limit");

//Set up Rate Limiting stuff. Localise it to here too.
app.enable("trust proxy"); //Not sure if this is actually needed but I'm running out of time. It's recommended if running behind a proxy (or on AWS, but I'm using my own DNS so...?)

var apiLimiter = new RateLimit({
	windowMs: 15*60*1000,
	max: 50,
	delayMs: 0,
	message: "Dem 429s tho. Must suck to be rate limited."
});
app.use("/api/", apiLimiter);

require('dotenv').config();

//config files
var db = require('./app/config/database');

//db connect
mongoose.connect(db.url);

//app setup
app.set('views', __dirname + '/public/views');
app.set('view engine', 'pug');

app.use(morgan('dev'));
//app.use(bodyParser.json());
//app.use(bodyParser.json({ type: 'application/vnd.api+json' }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(session({ secret: process.env.SESSION_SECRET }));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/bower_components',  express.static(__dirname + '/bower_components'));
app.use('/node_modules', express.static(__dirname + '/node_modules'));
app.use(passport.initialize());
app.use(passport.session());

var ONE_YEAR = 31536000000;
app.use(helmet.hsts({
    maxAge: ONE_YEAR,
    includeSubdomains: true,
    force: true
}));

//routes
require('./app/config/routes.js');
var passportInit = require('./app/passport/init.js');
passportInit(passport);

//Set up test user if required.
//require('./makeTest.js');

//start http server to redirect users to https
var http = express();

http.get("*", function (req, res) {
	res.redirect("https://gizis.me" + req.url);
});

http.listen("80");

//start app on port 443
const options = {
	ca: fs.readFileSync(__dirname + "/certStuff/finalCerts/gizis_me/gizis_me.ca-bundle"), 
	key: fs.readFileSync(__dirname + "/certStuff/newCerts/example_com.key"),
	cert: fs.readFileSync(__dirname + "/certStuff/finalCerts/gizis_me/gizis_me.crt"),
	secureOptions: constants.SSL_OP_NO_SSLv3 | constants.SSL_OP_NO_SSLv2,
	ciphers: [
	    "ECDHE-RSA-AES256-SHA384",
	    "DHE-RSA-AES256-SHA384",
	    "ECDHE-RSA-AES256-SHA256",
	    "DHE-RSA-AES256-SHA256",
	    "ECDHE-RSA-AES128-SHA256",
	    "DHE-RSA-AES128-SHA256",
	    "HIGH",
	    "!aNULL",
	    "!eNULL",
	    "!EXPORT",
	    "!DES",
	    "!RC4",
	    "!MD5",
	    "!PSK",
	    "!SRP",
	    "!CAMELLIA"
	].join(':'),
	honorCipherOrder: true
};

spdy
	.createServer(options, app)
	.listen(443, function (error) {
		if (error) {
			console.log(error);
			return process.exit(1);
		}
		else {
			console.log("Listening on port 443.");
		}
	})

module.exports = app;
