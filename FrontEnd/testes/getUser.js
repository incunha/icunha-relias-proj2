async function getUser(headers) {
  const response = await fetch(
    `http://localhost:8080/backEnd/rest/users/getUser`,
    {
      method: "GET",
      headers: {
        username: headers.get("username"),
        Accept: "application/json",
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    }
  );

  return response.status;
}

module.exports = { getUser };
