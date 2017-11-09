var exports = module.exports = {}


exports.signup = function(req,res){
	res.render('createUser'); 
}

exports.signin = function(req,res){
	res.render('auth/login'); 
}

exports.dashboard = function(req,res){
	res.render('calendarView'); 
}

exports.logout = function(req,res){
  req.session.destroy(function(err) {
  	res.render('logout');
  });

}