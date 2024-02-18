const addTaskModule = require("./addTask");
/* Acess Denied*/
/*test("Acess Denied", async () => {
  const mockForm = {
    title: { value: "Ricardo" },
    description: { value: "Elias" },
    priority: { value: 100 },
    initialDate: { value: "2024-05-12" },
    finalDate: { value: "2024-04-12" },
  };

  const user = {
    username: "Ricardo",
    password: "123",
  };

  const headers = new global.Headers();
  headers.append("Content-Type", "application/json");
  headers.append("username", user.username);
  headers.append("password", user.password);

  const response = await addTaskModule.addTask(headers, mockForm);
  expect(response).toBe(403);
});*/

/* Task add with sucess*/
test("Task add with success", async () => {
  const mockForm = {
    title: { value: "Ricardoee" },
    description: { value: "Eliasee" },
    priority: { value: 100 },
    initialDate: { value: "2024-05-12" },
    finalDate: { value: "2024-04-12" },
  };

  const user = {
    username: "Ricardo12",
    password: "123",
  };

  const headers = new global.Headers();
  headers.append("Content-Type", "application/json");
  headers.append("username", user.username);
  headers.append("password", user.password);

  const response = await addTaskModule.addTask(headers, mockForm);
  expect(response).toBe(200);
});
