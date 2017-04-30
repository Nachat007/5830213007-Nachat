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
    // console.log(data);
    //Set data to form elements
    $('.username').append(data.UserName);

    $("#cancel").click(function () {
      window.location.href = "viewuser.html?id=" + data.Id;
    });
    $("#save").click(function(){
      // console.log(data.Password);
      var datapassword = data.Password;
      var oldpassword = $("#oldpassword").val();
      var newpassword = $("#newpassword").val();
      var renewpassword = $("#renewpassword").val();
      if(oldpassword == datapassword){
        if (newpassword == renewpassword) {
          var newuser = { };
          newuser.Id = data.Id;
          newuser.username = data.UserName;
          newuser.Password = $("#newpassword").val();
          newuser.firstname = data.FirstName;
          newuser.lastname = data.LastName;
          newuser.email = data.Email;
          newuser.tel = data.Tel;
          // console.log(JSON.stringify(newuser));
          var updateUrl = "http://membershipwebapi977290.azurewebsites.net/api/Members/" + data.Id;
          $.ajax({
            url: updateUrl,
            type: 'PUT',
            data: newuser,
            success: function(result) {
              alert('Updated Complete!');
              window.location.href = "signin.html?id=" + data.Id;
            }
          });
        }else{
          alert('New Password not match !');
        }
      }else{
        alert('Old Password Wrong !');
      }
    });
  });
});
