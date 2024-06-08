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
      data: {
        user_id:user_id,
        name:name,
        birthdate:birthdate,
        password:password
      },
      success: function (response) {
        console.log(response);
        if (response.success) {
          alert("회원가입이 성공했습니다.");
          window.location.href = "/login";
        }
      },
      error: function (error) {
        console.error(error);
        alert("회원가입 실패: 중복된 ID 사용");
      }
    });
  });
});
