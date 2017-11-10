$(function(){

  //iffy to check localStorage for saved userinfo on page startup.
  (function checkForSavedUser(){
    if(localStorage.getItem('runLogSavedUser')){
      var user = JSON.parse(localStorage.getItem('runLogSavedUser'));
      $('#loginUsername').val(user.user_email);
      $('#loginPassword').val(user.password_hash);
    }
  })();
  // handle request to '/' send user from session storage to server when there is a GET
  $.post('/', {user: sessionStorage.user}).done(function(data){

  })
  $.get('/').done(function(data){
    var events = data.events;
    console.log(events);
    $('#calendar').fullCalendar({
       // put your options and callbacks here
      header: {
        left:   'title',
        center: '',
        right:  'listWeek listMonth basicDay,basicWeek,month prev,next'
      },
      events: [
        {
          title: '10 miles',
          start: '2017-11-05',
        }, {
          title: '5 miles',
          start: '2017-11-06',
        }, {
          title: '3 miles',
          start: '2017-11-07',
        }, {
          title: '4 miles',
          start: '2017-11-08',
        }, {
          title: '6 miles',
          start: '2017-11-09',
        }, {
          title: '3 miles',
          start: '2017-11-10',
        }, {
          title: '5 miles',
          start: '2017-11-11',
        }

        ]

      });
  });

  //login button event handdler
  $('#loginButton').on('click', function(){
    var loginInfo = {
      user_email: $('#loginUsername').val().trim(),
      password_hash: $('#loginPassword').val().trim()
    };
    console.log(loginInfo);
    //save login in localStorage if 'Remember me' checked;
    if($('#rememberCheckbox').prop('checked')){
      localStorage.setItem('runLogSavedUser', JSON.stringify(loginInfo));
      console.log('user saved in memory');
    }
    //login ajax
    $.post('/login', loginInfo, function(data){
      sessionStorage.setItem('user', data.user);
      window.location.href = data.redirect;
    })
  });

  //register button event handdler
  $('#registerButton').on('click', function(event){
    console.log('clicked');
    event.preventDefault();
    var registerInfo = {
      user_alias:$('#registerUserName').val().trim(),
      user_name:$('#registerUserName').val().trim(),
      user_email:$('#registerEmail').val().trim(),
      password_hash:$('#registerPassword').val().trim(),
    };
    $.post('/register', registerInfo, function(data){
      console.log('login data poasted');
      window.location.href = data.redirect;
    });
  });

 //listen for event on lig run button
 $('#submitRun').on('click', function(){
      var user = sessionStorage.user;
      var runInfo = {
        user_user_id: Number(user),
        run_date: $('#datepicker').val().trim(),
        run_distance: $('#logDistance').val().trim(),
        run_time:$('#logTime').val().trim(),
      };
      console.log("date data" + runInfo.year);

    $.post('/logrun', runInfo, function(data){
      console.log(data.redirect);
      window.location.href = '/';
    });
  });

  $('#cancelLogin').on('click', function(){
    window.location.href = '/';
  });
});
