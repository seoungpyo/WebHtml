$(document).ready(function () {
    $("#signupForm").submit(function (event) {
      event.preventDefault();
  
      let name = $("#name").val();
      let birthdate =  $("#birthdate").val();
      let user_id = $("#user_id").val();
      let password = $("#password").val();
  
      $.ajax({
        type: "POST",
        url: "/signup",
        contentType: "application/json",
        dataType: "json",
        data: JSON.stringify({
          user_id: user_id,
          name: name,
          birthdate: birthdate,
          password: password
        }),
        success: function (response) {
          console.log(response);
          if (response.success) {
            alert("회원가입이 성공했습니다.");
            window.location.href = "/login";
          } else {
            alert("회원가입 실패: " + response.message);
          }
        },
        error: function (error) {
          console.error(error);
          alert("회원가입 실패: 서버 오류");
        }
      });
    });
  });
  