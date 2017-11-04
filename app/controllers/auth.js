

module.exports = function(app) {

  app.get('/login', function(req, res) {
    res.render('auth/login');
  })

  app.get('/register', function(req, res) {
    res.render('layouts/createUser');
  })

  app.post('/login', function(req, res){
    console.log(req.body);
    // tests to test the functionality of the login
    for(var i=0; i<testAuth.length; i++){
      //test if user name and password are in test var
      if(req.body.user_name === testAuth[i].user_name && req.body.password_hash === testAuth[i].password_hash){
        var userFound = {
          status: 200,
          message: testAuth[i].user_id
        }
        //respond with a user var if found
        res.json(userFound);
      }
      //if not found
      if(i===testAuth.length -1 && req.body.user_name !== testAuth[i].user_name){
        var userNotFound = {
          status: 404,
          message: "User name or password not found. Please try again or register."
        };
        //respond with a user not found message and redirect to try again or login
        res.json(userNotFound);
      }
    }
  });

  //test posted data from register form.
  app.post('/register', function(req, res){
    var newUser = req.body;
    //test to see if user is added to tesy var. in the real world this
    //would post to db. testid would be set by db etc.
    var testid = testAuth.length;
    newUser.user_id = testid;
    testAuth.push(newUser);
    console.log(newUser);
    console.log(testAuth);
    var secondTest = testAuth.length+1;
    if(secondTest > testid){
      res.json({status:200});
    }else {res.json({status: 500});}
  });
};

app.post('/logrun', function(req, res){
  
})

//test var
var testAuth = [
  {
    user_id: 1,
    name: 'mark',
    user_name: 'mark',
    email: 'mark@mark.mark',
    password_hash: '1111'
  },
  {
    user_id: 2,
    name: 'chris',
    user_name: 'chris',
    email: 'chris@chris.chris',
    password_hash: '2222'
  }
];
//end test var
