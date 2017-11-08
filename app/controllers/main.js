let db = require('../db/models');

module.exports = function(app) {
  let user = '';

  app.get('/', function(req,res) {
    res.render('index');
  })

  app.get('/index/:id?', function(req, res) {
    var id = req.params.id
    user = id;
    if(!id){
      res.redirect('/login');
    }
    else{
      res.render('index.hbs');
    }


  app.get('/calendar', function(req, res) {
    res.render('calendarView.hbs');
  });

  app.get('/logrun', function(req, res) {
    res.render('log.hbs');
  });

  app.post('/logrun', function(req,res){
    var newRun = req.body;
    var id = req.body.user;
    console.log(newRun);
    res.json({redirect:'index/'+ user});
  });
}
