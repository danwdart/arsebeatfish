module.exports = function(express, app, config) {
	var router;

	router = express.Router();
	router.get('/', function(req, res) {
		res.send('The server is working.');
	});

	app.use('/', router);
};