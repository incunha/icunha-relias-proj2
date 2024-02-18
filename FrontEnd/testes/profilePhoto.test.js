const profilePhoto = require("./profilePhoto");

test("Acess Denied", async () => {
  const mockForm = {
    username: { value: "Ricardo12" },
    password: { value: "123" },
  };

  const headers = new global.Headers();
  headers.append("Content-Type", "application/json");
  headers.append("username", mockForm.username.value);
  headers.append("password", mockForm.password.value);

  const response = await profilePhoto.getPhotoUrl(headers);
  expect(response).toBe(403);
});
