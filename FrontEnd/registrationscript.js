async function addTask(form) {
  let user = {
    username: form.username.value,
    password: form.password.value,
    email: form.email.value,
    firstName: form.firstName.value,
    lastName: form.lastName.value,
    phoneNumber: form.phoneNumber.value,
    profilePhoto: form.photo.value,
  };

  console.log(user);
  await fetch("http://localhost:8080/backEnd/rest/user/add", {
    method: "POST",
    headers: {
      Accept: "*/*",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(task),
  }).then(function (response) {
    if (response.status == 200) {
      alert("task is added successfully :)");
    } else {
      alert("ERRO TESTE:" + response.status);
    }
  });
}
