const getUser = require("./getUser");

/* User not found*/
test("User not found", () => {
  const mockForm = {
    username: { value: "Ricardo" },
  };

  const headers = new global.Headers();
  headers.append("Content-Type", "application/json");
  headers.append("username", mockForm.username.value);

  getUser.getUser(headers).then((response) => {
    expect(response).toBe(404);
  });
});

/* User found*/
test("User not found", () => {
  const mockForm = {
    username: { value: "Ines" },
  };

  const headers = new global.Headers();
  headers.append("Content-Type", "application/json");
  headers.append("username", mockForm.username.value);

  getUser.getUser(headers).then((response) => {
    expect(response).toBe(200);
  });
});
