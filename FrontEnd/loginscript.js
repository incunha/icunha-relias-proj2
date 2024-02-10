async function loginVerified(form) {
  let user = {
    username: form.username.value,
    password: form.password.value,
  };
  console.log(JSON.stringify(user));

  await fetch(
    `http://localhost:8080/backEnd_war_exploded/rest/user/verifyLogin?username=${user.username}&password=${user.password}`,
    {
      method: "GET",
      headers: {
        Accept: "*/*",
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    }
  ).then(function (response) {
    if (response.status == 401) {
      alert("username or password incorrect");
    } else if (response.status == 200) {
      alert("Bem-vindo," + user.username + "!");
      //Armazena o username na sessionStorage
      const username = form.username.value;
      sessionStorage.setItem("username", username);
      //Armazena o username na localStorage
      localStorage.setItem("username", username);
      //Redireciona para a página de interface
      window.location.href = "interface.html";
    }
  });
}
