const deleteTask = require("./deleteTask");

/* Acess Denied */
/*test("Access Denied", async () => {
  const mockForm = {
    username: { value: "Ricardo12" },
    password: { value: "123" },
  };

  const task = {
    id: { value: 12 },
  };

  const headers = new global.Headers();
  headers.append("Content-Type", "application/json");
  headers.append("username", mockForm.username.value);
  headers.append("password", mockForm.password.value);

  const response = await deleteTask.deleteTask(mockForm, headers, task.id);
  expect(response).toBe(403);
});*/
