//Function for extract parameters from querystring
$.urlParam = function(name){
  var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
  return results[1] || 0;
}
$(function(){
  //Get user Id from querystring parameters
  var id = $.urlParam('id');
  //Create a Web Api url for getting a member info
  var url = "http://membershipwebapi977290.azurewebsites.net/api/Members/" + id;
  console.log(url);
  $.get(url, function(data, status) {
    console.log(data);
    $('#username').html(data.UserName);
    $('#password').html(data.Password);
    $('#fname').html(data.FirstName);
    $('#lname').html(data.LastName);
    $('#email').html(data.Email);
    $('#tel').html(data.Tel);
    //If user click edit, go to edituser page
    $("#edituser").click(function () {
      window.location.href = "edituser.html?id=" + data.Id;
    });
    $("#editpassword").click(function () {
      window.location.href = "editpassword.html?id=" + data.Id;
    });
  });
});
