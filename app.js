// This is how we add in node modules that we want to use in our application.
// Express is a web application framework, we are going to use it for our simple portfolio site.
var express = require('express'),
    app = express(),
    path = require('path'),
    port = process.env.PORT || 80;
	
var session  = require('express-session');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var morgan = require('morgan');
var passport = require('passport');	
var flash    = require('connect-flash');

// Telling the app to use the public folder to serve our files is a nice and clean way to manage our site assets
app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.json());
app.set('view engine', 'ejs'); // set up ejs for templating
app.use(flash()); // use connect-flash for flash messages stored in session

app.use('/cssFiles', express.static(__dirname + '/assets')); // for CSS

require('./config/passport')(passport); // pass passport for configuration

var MySQLStore = require('express-mysql-session')(session);
 
var options = {
    host: '35.186.155.24',
    port: 3306,
    user: 'root',
    password: 'm8heNWI9wQRz',
    database: 'mydb'
};
 
var sessionStore = new MySQLStore(options);

// required for passport
app.use(session({
	secret: 'samith',
	store: sessionStore,
	resave: false,
	saveUninitialized: false
 } )); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session

// routes ======================================================================
require('./app/routes.js')(app, passport); // load our routes and pass in our app and fully configured passport

// When the app is run we're going to listen on a port so we know when we have connections from clients
app.listen(port, function () {
  console.log('App listening on port 80!')
});