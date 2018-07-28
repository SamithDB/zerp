// app/routes.js

	module.exports = function(app) {


	// =====================================
	// HOME PAGE ========
	// =====================================
	app.get('/', function(req, res) {
			console.log('Home')
			res.render('index.ejs'); // load the index.ejs file	
		
	});	


	
	}