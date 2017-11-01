let path = require('path');
let express = require("express");
let bodyParser = require("body-parser");
let handlebars = require('express-handlebars').create(
  {  
    extname         : '.hbs',
    defaultLayout   : 'main',
    layoutsDir      : 'app/views/layouts'
  });


let app = express();
let db = require('./app/db/models');

// set up handlebars view engine
app.engine('hbs', handlebars.engine);
app.set('view engine', 'hbs');
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'app/views'))

// Static files
app.use(express.static(__dirname + '/app/public'));


// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));


require("./app/controllers/auth.js")(app);
require("./app/controllers/main.js")(app);


db.sequelize.sync({ force: true }).then(function() {
  app.listen(app.get('port'), function() {
    console.log(`App listening on PORT ${app.get('port')}`);
  });  
})