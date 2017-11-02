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
              window.location.href = '/runner/' + data.message;
        }
        //if user not found respond with not foun message.
        if(Number(data.status) === 404) {
          alert(data.message);
          $('#loginUsername').val('');
          $('#loginPassword').val('');
          console.log('login failed for '  + loginInfo.user_name);
        }
      })
    });
});
