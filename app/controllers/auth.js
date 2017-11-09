var db = require('../db/models');
var bcrypt = require('bcrypt');

module.exports = function(app) {

  app.get('/login', function(req, res) {
    res.render('auth/login.hbs');
  })

  app.post('/login', function(req, res){
    var email = req.body.user_email;
    db.User.findOne({
      where:{
        user_email: email
      }
    }).then(function(data) {
      if(!data) {
        res.json({redirect: '/login'});
      }
      else{
        res.json({user: data.user_id, redirect: '/index/'+ data.user_id});
      }
    });
  });

  app.get('/register', function(req, res) {
    res.render('createUser');
  })

  //post data from register form.
  app.post('/register', function(req, res){
    var newUser = req.body;
    db.User.create(req.body).then(function(data){
      res.json({redirect: '/login'});
    })
    // TODO: store hashed (+salted) password in db and redirect to login
  });
};
