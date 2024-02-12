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

  await fetch(
    `http://localhost:8080/backEnd/rest/user/userbyusername?username=${user.username}`,
    {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    }
  )
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
      email: document.getElementById("emailInput").value,
      firstName: document.getElementById("firstNameInput").value,
      lastName: document.getElementById("lastNameInput").value,
      phoneNumber: document.getElementById("phoneNumberInput").value,
      profilePhoto: document.getElementById("photoInput").value,
    };
    saveNewInfos(userData);
  });

async function saveNewInfos(userData) {
  try {
    const response = await fetch(
      "http://localhost:8080/backEnd/rest/user/updateUser",
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
      console.log("Informações do usuário atualizadas com sucesso!");
    } else if (response.status == 404) {
      console.error(
        `Erro ao atualizar informações do usuário. Status: ${response.status}`
      );
    }
  } catch (error) {
    console.error("Erro durante a requisição:", error);
  }
}
