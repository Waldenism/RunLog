$(function(){
  var appData= {
    userId: '',
    feeling: ''
  };
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
      appData.userId = data.user;
      console.log(appData.userId);
      window.location.href = data.redirect;
    })
  });

  //register button event handdler
  $('#registerButton').on('click', function(){
    var registerInfo = {
      name: $('#registerName').val().trim(),
      user_name:$('#registerUserName').val().trim(),
      user_email:$('#registerEmail').val().trim(),
      password_hash:$('#registerPassword').val().trim(),
      profile_icon:$('#registerIcon').val().trim(),
      user_type: 0
    };
    $.post('/register', registerInfo, function(data){
      console.log('login data poasted');
      window.location.href = data.redirect;
    });
  });

  $('#logRunBtn').on('click', function(){
    console.log(appData.userId);
    window.location.href = '/logrun';
  })
  
  //listen for an event on the feeling button
  $('.feeling-button').on('click', function(){
   appData.feeling = $(this).data('feeling');
 });

   //listen for event on lig run button
   $('#logRunButton').on('click', function(){
      if(feeling === undefined){
        alert('please choose how you felt for the run');
      }
      else{
        runInfo = {
          distance: $('#logDistance').val().trim(),
          time:$('#logTime').val().trim(),
          feeling: feeling,
          message: $('#injury').val().trim()
         

        };
      }
      $.post('/logrun', runInfo, function(data){
        if(data.status === 200) {
          console.log('run added');
          window.location.href = '/calendar';
        }
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
        distance: $('#logDistance').val().trim(),
        time:$('#logTime').val().trim(),
        feeling: appData.feeling,
        message: $('#injury').val().trim()
      };
    }
    $.post('/logrun', runInfo, function(data){
      console.log(data.redirect);
      window.location.href = '/index';
    });
  });

  $('#cancelLogin').on('click', function(){
    window.location.href = '/';
  });
});
