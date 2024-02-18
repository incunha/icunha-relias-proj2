async function addTask(headers, form) {
  const task = {
    title: form.title.value,
    description: form.description.value,
    priority: form.priority.value,
    initialDate: form.initialDate.value,
    finalDate: form.finalDate.value,
  };

  const user = {
    username: headers.get("username"),
    password: headers.get("password"),
  };

  const response = await fetch(
    "http://localhost:8080/backEnd/rest/users/addTask",
    {
      method: "POST",
      headers: {
        ...headers,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...task, ...user }),
    }
  );

  return response.status;
}

module.exports = { addTask };
