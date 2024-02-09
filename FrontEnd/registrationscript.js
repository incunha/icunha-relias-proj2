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

  console.log(JSON.stringify(user));

  await fetch("http://localhost:8080/backEnd_war_exploded/rest/user/validate", {
    method: "POST",
    headers: {
      Accept: "*/*",
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
}).then(async function (response) {
    if (response.status == 401) {
      alert("please fill all fields:)")
    } else {
      await fetch("http://localhost:8080/backEnd_war_exploded/rest/user/add", {
        method: "POST",
        headers: {
          Accept: "*/*",
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify(user),
    
      }).then(function (response) {
        if (response.status == 200) {
          alert("user is added successfully :)");
          window.location.href = "index.html";
        } else {
          alert("ERRO TESTE:" + response.status);
        }
      });
    }
  });
}