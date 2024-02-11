document.getElementById("goBackButton").addEventListener("click", function () {
  window.location.href = "interface.html";
});

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
