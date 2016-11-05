//grab models as required
//NONE

module.exports = function(app) {

	app.get('*', function(req, res) {
		res.send('./public/views/index.html');
	});	

};
