document.getElementById("goBackButton").addEventListener("click", function () {
  window.location.href = "interface.html";
});

/* Função para ver a password através da checkbox */
function togglePasswordVisibility() {
  var passwordInput = document.getElementById("passwordInput");
  var verPasswordCheckbox = document.getElementById("showPasswordCheckbox");

  if (verPasswordCheckbox.checked) {
    passwordInput.type = "text";
  } else {
    passwordInput.type = "password";
  }
}

window.onload = async function () {
  const username = localStorage.getItem("username"); // Obtém o nome de utilizador da localStorage

  // Obtém a password da localStorage
  const password = localStorage.getItem("password");

  let user = {
    username: username,
  };

  document.getElementById("passwordInput").value = password;

  await fetch(`http://localhost:8080/backEnd/rest/users/${user.username}`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
  })
    .then(function (response) {
      if (response.status == 404) {
        console.log(user.username);
        alert("Information not found");
      } else if (response.status == 200) {
        return response.json(); // Processa o corpo da resposta como JSON
      }
    })
    .then(function (userData) {
      alert("Information found");

      document.getElementById("usernameInput").value = userData.username;
      document.getElementById("emailInput").value = userData.email;
      document.getElementById("firstNameInput").value = userData.firstName;
      document.getElementById("lastNameInput").value = userData.lastName;
      document.getElementById("phoneNumberInput").value = userData.phoneNumber;
      document.getElementById("photoInput").value = userData.profilePhoto;
    })
    .catch(function (error) {
      console.error("Error fetching user information:", error);
    });
};

document
  .getElementById("saveButton")
  .addEventListener("click", function (event) {
    event.preventDefault();
    const userData = {
      username: document.getElementById("usernameInput").value,
      password: document.getElementById("passwordInput").value,
      email: document.getElementById("emailInput").value,
      firstName: document.getElementById("firstNameInput").value,
      lastName: document.getElementById("lastNameInput").value,
      phoneNumber: document.getElementById("phoneNumberInput").value,
      profilePhoto: document.getElementById("photoInput").value,
    };

    if (
      userData.username.trim() === "" ||
      userData.password.trim() === "" ||
      userData.email.trim() === "" ||
      userData.firstName.trim() === "" ||
      userData.lastName.trim() === "" ||
      userData.phoneNumber.trim() === "" ||
      userData.profilePhoto.trim() === ""
    ) {
      alert("pls fill all the fields");
    } else {
      saveNewInfos(userData);
    }
  });
async function saveNewInfos(userData) {
  const response = await fetch(
    `http://localhost:8080/backEnd/rest/users/username/update`,
    {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify(userData),
    }
  );

  if (response.status == 200) {
    console.log("Informações do utilizador atualizadas com sucesso!");
    alert("Info changed with sucess!");
    window.location.href = "interface.html";
  } else if (response.status == 404) {
    console.error(
      `Erro ao atualizar informações do utilizador. Status: ${response.status}`
    );
  }
}
