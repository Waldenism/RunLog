var db = require('../db/models');

module.exports = function(app) {

  app.get('/', function(req,res) {

    // TODO: get current user from auth

    db.Run.findAll({
      where: {
        user_user_id: 1
      }
    })
    .then(function(runs) {

      var events = [];
      for (var i = 0; i < runs.length; i++) {
        var entry = {}

        entry.title = String(runs[i].dataValues.run_distance) + 'km';
        entry.start = runs[i].dataValues.run_date;

        events.push(entry);
      }
      console.log(events);
      // passes the events data to the calendarView
      res.render('calendarView.hbs', {events: events});
    })
  })


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
    res.json({redirect:'/'});
  });
};
