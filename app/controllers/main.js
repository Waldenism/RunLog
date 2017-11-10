var db = require('../db/models');

module.exports = function(app) {

let user;
//handle get request to index
app.post('/', function(req, res){
  console.log(req.body);
  user = req.body.user
})

app.get('/', function(req,res){
  if(!user){
    res.redirect('/login');
  }else{

    db.Run.findAll({
      where: {
        user_user_id: 1
      }
    })
    .then(function(runs) {

      let events = [];
      for (let i = 0; i < runs.length; i++) {
        let entry = {}

        entry.title = String(runs[i].dataValues.run_distance) + 'km';
        entry.start = runs[i].dataValues.run_date;

        events.push(entry);
      }
      console.log(events);
      // passes the events data to the calendarView
      res.render('calendarView.hbs', {events: events[0]});
    })
    }

 })

  app.get('/logrun', function(req, res) {
    res.render('log.hbs');
  });

  app.post('/logrun', function(req,res){
    var newRun = req.body;
    db.Run.create(newRun).then(function(data){
      res.json({redirect:'/'});
      console.log(newRun);
    });
  });
};
