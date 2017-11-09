var path = require('path');
var express = require("express");
var bodyParser = require("body-parser");
var passport   = require('passport');
var session    = require('express-session');
var env        = require('dotenv').load();
var exphbs     = require('express-handlebars');
var handlebars = require('express-handlebars').create(
  {
    extname         : '.hbs',
    defaultLayout   : 'main',
    layoutsDir      : 'app/views/layouts'
  });


var app = express();
var db = require('./app/db/models');

// set up handlebars view engine
app.engine('hbs', handlebars.engine);
app.set('view engine', 'hbs');
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'app/views'))

// Static files
app.use(express.static(__dirname + '/app/public'));

// For Passport
app.use(session({ secret: 'keyboard cat',resave: true, saveUninitialized:true})); // session secret
app.use(passport.initialize());
app.use(passport.session());

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));

//Models
var models = require("./app/db/models");

//Routes
var authRoute = require('./app/routes/auth.js')(app,passport);

//load passport strategies
require('./app/config/passport/passport.js')(passport,models.user);

require("./app/controllers/auth.js")(app);
require("./app/controllers/main.js")(app);


db.sequelize.sync({ force: true }).then(function() {
  app.listen(app.get('port'), function(err) {
    if (!err)
    	console.log(`App listening on PORT ${app.get('port')}`);
    else console.log(err);
  });  
})