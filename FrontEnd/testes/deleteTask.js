async function deleteTask(user, task) {
  const headers = new Headers();
  headers.append("username", user.username);
  headers.append("password", user.password);
  headers.append("Content-Type", "application/json");

  const response = await fetch(
    `http://localhost:8080/backEnd/rest/users/deleteTask`,
    {
      method: "DELETE",
      headers: headers,
      body: JSON.stringify({ id: task.id }),
    }
  );

  return response.status;
}

module.exports = { deleteTask };
