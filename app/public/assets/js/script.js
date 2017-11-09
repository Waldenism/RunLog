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
    if(appData.feeling === undefined){
      alert('please choose how you felt for the run');
    }
    else{
      runInfo = {
        user:appData.userId,
        date: $('#datepicker').val().trim(),
        distance: $('#logDistance').val().trim(),
        time:$('#logTime').val().trim(),
      };
      console.log("datepicker data" + runInfo.date);
    }
    $.post('/logrun', runInfo, function(data){
      console.log(data.redirect);
      window.location.href = '/calendar';
    });
  });

  $('#cancelLogin').on('click', function(){
    window.location.href = '/';
  });
});
