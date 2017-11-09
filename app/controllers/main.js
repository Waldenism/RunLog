var db = require('../db/models');

module.exports = function(app) {

<<<<<<< 91e7487fc0ddcecb3c28dcb1bf7b4bd83964baf7
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
=======
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
    res.render('calendarView');
  }
}),
  // app.get('/', function(req,res) {
  //
    // console.log(req.body);
    // //if there is no user data sent with the GET
    // if(!req.body.user){
    //   res.redirect('/login');
    // }
    // //if there is a user sent with the GET
    // else{
    //   db.Run.findAll({
    //   where: {
    //     user_user_id: 1
    //   }
    // })
    // .then(function(runs) {
    //
    //   // let events = [];
    //   // for (let i = 0; i < runs.length; i++) {
    //   //   let entry = {}
    //   //
    //   //   entry.title = String(runs[i].dataValues.run_distance) + 'km';
    //   //   entry.start = runs[i].dataValues.run_date;
    //   //
    //   //   events.push(entry);
    //   // }
    //   // console.log(events);
    //   // // passes the events data to the calendarView
    //   // res.render('calendarView.hbs', {events: events});
    // })
    // }

//  })
>>>>>>> some work to fix

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
