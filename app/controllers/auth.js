var db = require('../db/models');
var bcrypt = require('bcrypt');

module.exports = function(app) {

//login ajax
//login get
  app.get('/login', function(req, res) {
    res.render('auth/login.hbs');
  })

//login post
  app.post('/login', function(req, res){
    //get login credentials from req.body
    let user_email = req.body.user_email;
    let password_hash = req.body.password_hash;
    //look for user in database
    db.User.findOne({
      where:{
        user_email: user_email
      }
    }).then(function(data) {
      console.log(data);
      //if there is no user redirect to login
      if(data === null) {
      res.json({redirect: '/login'});
      }
      //if there is a user redirect to index by sending a json with the user and url to index
      else{
        res.json({user: data.user_id, redirect: '/'});
      }
    });
  });

  //register ajax
  //register get
  app.get('/register', function(req, res) {
    res.render('createUser');
  })

  //register post
  app.post('/register', function(req, res){
    //get user info from req.body
    var newUser = req.body;
    console.log(newUser);
    //send the info to the database
    db.User.create(req.body).then(function(data){
      //redirect to login by sending a json with login url
      res.json({redirect: '/login'});
    })
    // TODO: store hashed (+salted) password in db and redirect to login
  });
};
