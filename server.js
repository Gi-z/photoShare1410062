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
require('dotenv').config();

//config files
var db = require('./app/config/database');

//db connect
mongoose.connect(db.url);

//app setup
app.set('views', __dirname + '/public/views');
app.set('view engine', 'pug');

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({ secret: process.env.SESSION_SECRET }));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/bower_components',  express.static(__dirname + '/bower_components'));
app.use('/node_modules', express.static(__dirname + '/node_modules'));
app.use(passport.initialize());
app.use(passport.session());

//routes
require('./app/config/routes.js');
var passportInit = require('./app/passport/init.js');
passportInit(passport);

//Set up test user if required.
//require('./makeTest.js');

//start app on port 8080
app.listen(8080);

console.log("Listening on port 8080.");

module.exports = app;
