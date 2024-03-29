var authController = require('../controllers/authcontroller.js');
var passport = require('passport')

module.exports = function(app,passport){
	app.get('/signup', authController.signup);
	app.get('/signin', authController.signin);
	app.post('/signup', passport.authenticate('local-signup',  { successRedirect: '/calendarView',
	                                                    failureRedirect: '/register'}
	                                                    ));
	app.get('/dashboard',isLoggedIn, authController.dashboard);
	app.get('/logout',authController.logout);
	app.post('/signin', passport.authenticate('local-signin',  { successRedirect: '/calendarView',
	                                                    failureRedirect: '/login'}
	                                                    ));
	function isLoggedIn(req, res, next) {
	    if (req.isAuthenticated())
	        return next();

	    res.redirect('/login');
	}
}
