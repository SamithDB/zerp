// This is how we add in node modules that we want to use in our application.
// Express is a web application framework, we are going to use it for our simple portfolio site.
var express = require('express'),
    app = express(),
    path = require('path'),
    port = process.env.PORT || 80;

// Telling the app to use the public folder to serve our files is a nice and clean way to manage our site assets
app.use(express.static(path.join(__dirname, 'public')));

app.set('view engine', 'ejs'); // set up ejs for templating

// routes ======================================================================
require('./app/routes.js')(app); // load our routes and pass in our app and fully configured passport

// When the app is run we're going to listen on a port so we know when we have connections from clients
app.listen(port, function () {
  console.log('App listening on port 80!')
});