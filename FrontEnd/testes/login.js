async function loginVerified(form) {
  let user = {
    username: form.username.value,
    password: form.password.value,
  };

  const headers = new Headers();
  headers.append("username", user.username);
  headers.append("password", user.password);

  const response = await fetch(
    "http://localhost:8080/backEnd/rest/users/verifyLogin",
    {
      method: "GET",
      headers: headers,
    }
  );

  return response.status;
}

module.exports = { loginVerified };
