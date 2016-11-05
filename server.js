//Server file.

//imports

var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var mongoose = require('mongoose');

//config files
var db = require('./app/config/database');

//db connect
mongoose.connect(db.url);

//app setup

app.use(bodyParser.json());
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));

//routes
require('./app/config/routes')(app);

//start app on port 8080
app.listen(8080);

console.log("Listening on port 8080.");

exports = module.exports = app;
