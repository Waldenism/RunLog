let db = require('../db/models');
let bcrypt = require('bcrypt');

module.exports = function(app) {

  app.get('/login', function(req, res) {
    res.render('auth/login');
  })

  app.post('/login', function(req, res) {
    let email = req.body.email
    let pw = req.body.password

    // TODO: hash password and compare with 
    // stored hash via email/username retrieval

    db.User.findOne({
      where: {
        email: email
      }
    })
    .then(function(data) {
      
      bcrypt.compare(pw, data.password_hash, function(err, res) {
        if (res) {
          // password matches
        } else {
          // passwords don't match
        }
      })

    })
  })

  app.get('/register', function(req, res) {
    res.render('auth/register');
  })

  app.post('/register', function(req, res) {

    bcrypt.hash(req.body.password, 10, function(err, hash) {
      // TODO: store all data in db as new user

      // db.User.create({})

    })

    res.redirect('auth/login')
  })

}