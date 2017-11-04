module.exports = function(app) {

  app.get('/', function(req, res) {
    res.render('index');
  });
  app.get('/calendar/:runner', function(req,res){

    res.render('runHistory.hbs');
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
