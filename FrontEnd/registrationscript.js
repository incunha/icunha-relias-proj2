//Função para adicionar um novo utilizador
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
    user.phoneNumber.trim() === "" ||
    user.profilePhoto.trim() === ""
  ) {
    alert("Please fill all fields");
  } else {
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
      if (response.status === 201) {
        alert("User created");
        window.location.href = "index.html";
      } else if (response.status === 409) {
        alert("Username or email already exists");
      } else if (response.status === 400) {
        alert("Please fill all fields");
      }
    });
  }
}
//Função para mostrar a imagem de perfil
document.getElementById("photoReg").addEventListener("input", function () {
  var div = document.getElementById("profilePreview");
  div.style.backgroundImage = "url(" + this.value + ")";
});
