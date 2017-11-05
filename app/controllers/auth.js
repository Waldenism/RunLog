let db = require('../db/models');
let bcrypt = require('bcrypt');

module.exports = function(app) {

  app.get('/login', function(req, res) {
    res.render('index.hbs');
  })

  app.post('/login', function(req, res){
    console.log(req.body);
    let email = req.body.email;
    db.User.findOne({
      where:{
        user_email: email
      }
    }).then(function(data) {
      console.log(data);
      if(data===null) {
        //send 404 back to front end to direct user to register
        //res.json({status: 404, message: "user not found try again or register"});
        res.json({userFound: false});
      }
      else{
        // send 200 to user to redirect to run page.
        res.json({userFound: true, user: data.user_id});
      }
    });
  });

  app.get('/register', function(req, res) {
    res.render('createUser');
  })

  //test posted data from register form.
  app.post('/register', function(req, res){
    var newUser = req.body;
    console.log(newUser);
    res.json({status:200});
    // TODO: store hashed (+salted) password in db and redirect to login
    res.redirect('/login');
  });
};
