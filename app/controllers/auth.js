let db = require('../db/models');

module.exports = function(app) {

  app.get('/login', function(req, res) {

    db.User.findAll().then(function(data) {
      console.log(data);
    })

    res.render('auth/login');
  })

  app.get('/register', function(req, res) {
    res.render('auth/register');
  })

}