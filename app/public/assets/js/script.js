$(function(){

  //iffy to check localStorage for saved userinfo on page startup.
  (function checkForSavedUser(){
    if(localStorage.getItem('runLogSavedUser')){
      var user = JSON.parse(localStorage.getItem('runLogSavedUser'));
      $('#loginUsername').val(user.user_name);
      $('#loginPassword').val(user.password_hash);
    }
  })();
  //login button event handdler
  $('#loginButton').on('click', function(){
    var loginInfo = {
      user_name: $('#loginUsername').val().trim(),
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
      console.log(data);
      //test to test the successful login form and redirect to new view
        if(Number(data.status) === 200) {
              window.location.href = '/calendar';
        }
        //if user not found respond with not foun message.
        if(Number(data.status) === 404) {
          alert(data.message);
          $('#loginUsername').val('');
          $('#loginPassword').val('');
          console.log('login failed for '  + loginInfo.user_name);
        }
      });
    });

    //register button event handdler
    $('#registerButton').on('click', function(){
      var registerInfo = {
        name: $('#registerName').val().trim(),
        user_name:$('#registerUserName').val().trim(),
        email:$('#registerEmail').val().trim(),
        password_hash:$('#registerPassword').val().trim(),
        profile_icon:$('#registerIcon').val().trim(),
      };
      $.post('/register', registerInfo, function(data){
        console.log('login data poasted');
        if(Number(data.status === 200)){
          window.location.href = '/';
        }
        if(Number(data.status === 500)){
          alert("Something went wrong try to register again please!");
        }
      });
    });

    //if log-run-page is loaded

      var feeling;
      //listen for an even on the feeling button
      $('.feeling-button').on('click', function(){
       feeling = $(this).data('feeling');
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

});
