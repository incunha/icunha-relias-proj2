async function getPhotoUrl(username, password) {
  const response = await fetch(
    `http://localhost:8080/backEnd/rest/users/profilePhoto`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/JSON",
        Accept: "application/JSON",
        username: username,
        password: password,
      },
    }
  );

  return response.status;
}

module.exports = { getPhotoUrl };
