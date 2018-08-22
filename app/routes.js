// app/routes.js

	var dbconfig = require('../config/database');
	var mysql = require('mysql');
	var connection = mysql.createConnection(dbconfig.connection);
	var cookieParser = require('cookie-parser');
		
	connection.query('USE ' + dbconfig.database);

	module.exports = function(app, passport) {


	// =====================================
	// HOME PAGE ========
	// =====================================
	app.get('/home', function(req, res) {
			console.log('Home')
			res.render('index.ejs'); // load the index.ejs file	
		
	});	
	
	// =====================================
	// Signin PAGE ========
	// =====================================
	app.get('/', function(req, res) {
			console.log('SignIn')
			res.render('signin.ejs', { message: req.flash('loginMessage') });
		
	});	
	
	app.post('/login', passport.authenticate('local-login', {
            successRedirect : '/home', // redirect to the secure home section
            failureRedirect : '/login', // redirect back to the signup page if there is an error
            failureFlash : true // allow flash messages
		}),
        function(req, res) {
            console.log("hello");

            if (req.body.remember) {
              req.session.cookie.maxAge = 1000 * 60 * 3;
            } else {
              req.session.cookie.expires = false;
            }
        res.redirect('/');
    });
	
	// =====================================
	// Signup PAGE ========
	// =====================================
	app.get('/signup', function(req, res) {
			console.log('SignIn')
			res.render('signup.ejs', { message: req.flash('loginMessage') });
		
	});


	
	}