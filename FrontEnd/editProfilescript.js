//Função para voltar para a página anterior
document.getElementById("goBackButton").addEventListener("click", function () {
  window.location.href = "interface.html";
});
//Função para mostrar/esconder a password
function togglePasswordVisibility() {
  var passwordInput = document.getElementById("passwordInput");
  var verPasswordCheckbox = document.getElementById("showPasswordCheckbox");

  if (verPasswordCheckbox.checked) {
    passwordInput.type = "text";
  } else {
    passwordInput.type = "password";
  }
}
//Função para carregar as informações do utilizador
window.onload = async function () {
  const username = localStorage.getItem("username"); // Obtém o nome de utilizador da localStorage

  // Obtém a password da localStorage
  const password = localStorage.getItem("password"); // Obtém a password da localStorage

  let user = {
    username: username,
  };

  getPhotoUrl(username, password);

  document.getElementById("passwordInput").value = password;

  await fetch(`http://localhost:8080/backEnd/rest/users/getUser`, {
    method: "GET",
    headers: {
      username: username,
      Accept: "application/json",
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
  })
    .then(function (response) {
      if (response.status == 404) {
        console.log(user.username);
        alert("User not found");
      } else if (response.status == 200) {
        return response.json(); // Processa o corpo da resposta como JSON
      }
    })
    .then(function (userData) {
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
//Função para obter a URL da foto de perfil do utilizador
async function getPhotoUrl(username, password) {
  let photoUrlRequest = "http://localhost:8080/backEnd/rest/users/profilePhoto";

  try {
    const response = await fetch(photoUrlRequest, {
      method: "GET",
      headers: {
        "Content-Type": "application/JSON",
        Accept: "application/JSON",
        username: username,
        password: password,
      },
    });

    if (response.status == 200) {
      const data = await response.text();

      // Defina a imagem de fundo do profilePreview para a URL da imagem
      var div = document.getElementById("profilePreview");
      div.style.backgroundImage = "url(" + data + ")";

      // Defina o valor do campo de entrada photoInput para a URL da imagem
      var photoInput = document.getElementById("photoInput");
      photoInput.value = data;

      // Adicione um ouvinte de evento ao campo de entrada photoInput para atualizar a imagem de fundo do profilePreview
      // sempre que o valor do campo de entrada for alterado
      photoInput.addEventListener("input", function () {
        div.style.backgroundImage = "url(" + this.value + ")";
      });
    } else if (response.status == 403) {
      alert("Acess Denied");
    } else if (response.status == 404) {
      alert("User not found");
    }
  } catch (error) {
    console.error("Error:", error);
    alert("Something went wrong");
  }
}

document.getElementById("photoInput").addEventListener("input", function () {
  var div = document.getElementById("profilePreview");
  div.style.backgroundImage = "url(" + this.value + ")";
});

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
      alert("please fill all the fields");
    } else if (
      userData.email.indexOf("@") === -1 ||
      userData.email.indexOf("@") !== userData.email.lastIndexOf("@") ||
      userData.email.indexOf(".") === -1
    ) {
      alert("Email is incorrect.");
    } else {
      saveNewInfos(userData);
    }
  });
  //Função para atualizar as informações do utilizador
async function saveNewInfos(userData) {
  const response = await fetch(
    `http://localhost:8080/backEnd/rest/users/update`,
    {
      method: "PUT",
      headers: {
        username: localStorage.getItem("username"),
        password: localStorage.getItem("password"),
        Accept: "application/json",
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify(userData),
    }
  );

  if (response.status == 200) {
    console.log("Informações do utilizador atualizadas com sucesso!");
    localStorage.setItem("password", userData.password);
    window.location.href = "interface.html";
  } else if (response.status == 403) {
    alert("|||||||||Acess Denied");
  } else if (response.status == 404) {
    alert("Username not found");
  } else if (response.status == 400) {
    alert("Username and password are required");
  }
}
