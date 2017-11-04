module.exports = function(app) {

  app.get('/', function(req, res) {
    res.render('index');
  });
  app.get('/calendar/:runner', function(req,res){

    res.render('layouts/runHistory.hbs');
  });
}
