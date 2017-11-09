$(function(){

  //iffy to check localStorage for saved userinfo on page startup.
  (function checkForSavedUser(){
    if(localStorage.getItem('runLogSavedUser')){
      var user = JSON.parse(localStorage.getItem('runLogSavedUser'));
      $('#loginUsername').val(user.user_email);
      $('#loginPassword').val(user.password_hash);
    }
  })();
  // handle request to '/'
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
      window.location.href = data.redirect;
    })
  });

  //register button event handdler
  $('#registerButton').on('click', function(){
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
    var date = {
        year: $('#logTimeYear').val(),
        month: $('#logTimeMonth').val().trim(),
        day: $('#logTimeDay').val().trim(),
      };

      var runInfo = {
        user_user_id: 1,
        run_date: date.year+'-'+date.month+'-'+date.day,
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
