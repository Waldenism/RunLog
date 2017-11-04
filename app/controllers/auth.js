let db = require('../db/models');
let bcrypt = require('bcrypt');

module.exports = function(app) {

  app.get('/login', function(req, res) {
    res.render('auth/login');
  })

  app.post('/login', function(req, res) {
    let email = req.body.email

    // TODO: hash password and compare with 
    // stored hash via email/username retrieval

    db.User.findOne({
      where: {
        email: email
      }
    })
    .then(function(data) {
      // if hashed pw = stored hash
      // create valid session
      // and redirect to athlete view
      // else we reload login with express-flash
    })
  })

  app.get('/register', function(req, res) {
    res.render('auth/register');
  })

  app.post('/register', function(req, res) {
    // TODO: store hashed (+salted) password in db and redirect to login
    res.redirect('auth/login')
  })

}