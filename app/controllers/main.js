let db = require('../db/models');

module.exports = function(app) {

  app.get('/', function(req, res) {
    res.render('index');
  });

  app.get('/calendar', function(req,res){
    res.render('tableView.hbs');
  });

  app.get('/logrun', function(req, res) {
    res.render('log.hbs');
  });

  app.post('/logrun', function(req,res){
    var newRun = req.body;
    console.log(newRun);
    res.json({status: 200});
  });
}
