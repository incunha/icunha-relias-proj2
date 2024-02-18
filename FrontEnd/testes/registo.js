async function addUser(form) {
  let user = {
    username: form.username.value,
    password: form.password.value,
    email: form.email.value,
    firstName: form.firstName.value,
    lastName: form.lastName.value,
    phoneNumber: form.phoneNumber.value,
    profilePhoto: form.photo.value,
  };

  /*if (
    user.username.trim() === "" ||
    user.password.trim() === "" ||
    user.email.trim() === "" ||
    user.firstName.trim() === "" ||
    user.lastName.trim() === "" ||
    user.phoneNumber.trim() === "" ||
    user.profilePhoto.trim() === ""
  ) {
  }*/
  const response = await fetch(
    "http://localhost:8080/backEnd/rest/users/register",
    {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify(user),
    }
  );

  return response.status; // Retorna o status da resposta
}

module.exports = { addUser };
