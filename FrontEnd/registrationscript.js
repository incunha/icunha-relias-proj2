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

  console.log("User data:", JSON.stringify(user));

  if (
    user.username.trim() === "" ||
    user.password.trim() === "" ||
    user.email.trim() === "" ||
    user.firstName.trim() === "" ||
    user.lastName.trim() === "" ||
    user.phoneNumber.trim() === ""
  ) {
    alert("Please fill all fields:)");
  } else {
    console.log("HERE");
    await fetch(`http://localhost:8080/backEnd/rest/users/${user.username}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    }).then(async function (response) {
      console.log("GET Response:", response);
      if (response.status === 404) {
        alert("Username available");
        await fetch("http://localhost:8080/backEnd/rest/users/register", {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
          body: JSON.stringify(user),
        }).then(function (response) {
          console.log("POST Response:", response);
          if (response.status === 200) {
            alert("User is added successfully :)");
            window.location.href = "index.html";
          } else {
            alert("Error: " + response.status);
          }
        });
      } else {
        alert("Username already exists: " + user.username);
      }
    });
  }
}
