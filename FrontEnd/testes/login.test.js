const verifyLogin = require("./login");

/* Login sucess*/
test("User longin", () => {
  const mockForm = {
    username: { value: "Ines" },
    password: { value: "123" },
  };

  const headers = new global.Headers();
  headers.append("Content-Type", "application/json");
  headers.append("username", mockForm.username.value);
  headers.append("password", mockForm.password.value);

  verifyLogin.loginVerified(mockForm, headers).then((response) => {
    expect(response).toBe(200);
  });
});

/* Incorrect username or password*/

test("User is invalid", () => {
  const mockForm = {
    username: { value: "Eliasewqeqw" },
    password: { value: "123we" },
  };

  const headers = new global.Headers();
  headers.append("Content-Type", "application/json");
  headers.append("username", mockForm.username.value);
  headers.append("password", mockForm.password.value);

  verifyLogin.loginVerified(mockForm, headers).then((response) => {
    expect(response).toBe(401);
  });
});
