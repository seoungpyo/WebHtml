    function login() {
    const id = $('#inputId').val();
    const password = $('#inputPassword').val();

    // 서버에 로그인 요청 
    $.ajax({
        url: '/login',
        method: 'POST',
        dataType: 'json',
        contentType: 'application/json',
        data: JSON.stringify({
            user_id: id,
            password: password
        }),
        success: function (response) {
            console.log(response);

            if (response.success) {
              const name = response.data.name;
              alert(`환영합니다, ${name}님!`);
              goToHomePage();
            }
        },
        error: function (error) {
            console.error(error);
            alert("아이디 혹은 비밀번호가 일치하지 않습니다.");
        }
    });
}
    function goToSignUpPage(){
        alert("회원가입이 페이지로 이동합니다");
        window.location.href = "../createaccount";
    }
    function goToHomePage(){
        window.location.href = "/";
    }
