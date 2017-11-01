let db = require('../db/models');

module.exports = function(app) {

  app.get('/', function(req, res) {
    res.render('index');
  });

}