var express = require('express'),
	serveStatic = require('serve-static'),
	cookieParser = require('cookie-parser'),
	session = require('express-session'),
	bodyParser = require('body-parser'),
	app = express(),
	config = require('./config/config.json'),
	routes = require('./routes')
	port = process.env.PORT || process.env.VMC_APP_PORT || 3000;

app.use(serveStatic(__dirname + '/../public'));
store = new session.MemoryStore;
app.use(cookieParser());
app.use(session({
 	saveUninitialized: true,
 	resave: true,
  	secret: 'shhh',
  	store: store
}));
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());
app.use(function(err, req, res, next) {
  return res.send (500, {
    error: err.message
  });
});
routes(express, app, config);
app.listen(port, function() {
  return console.log("Listening on " + port + "\nPress CTRL-C to stop server.");
});