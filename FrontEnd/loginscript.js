async function loginVerified(form) {
  let user = {
    username: form.username.value,
    password: form.password.value,
  };
  console.log(JSON.stringify(user));

  const headers = new Headers();
  headers.append("username", user.username);
  headers.append("password", user.password);

  await fetch("http://localhost:8080/backEnd/rest/users/verifyLogin", {
    method: "GET",
    headers: headers,
  }).then(function (response) {
    if (response.status == 401) {
      alert("username or password incorrect");
    } else if (response.status == 200) {
      alert("Bem-vindo," + user.username + "!");

      // Armazena o username na localStorage
      localStorage.setItem("username", user.username);
      // Armazena a password na localStorage
      localStorage.setItem("password", user.password);
      // Redireciona para a página de interface
      window.location.href = "interface.html";
    }
  });
}
