document.getElementById("goBackButton").addEventListener("click", function () {
  window.location.href = "interface.html";
});

window.onload = function () {
  const username = localStorage.getItem("username"); // Obtém o nome de utilizador da localStorage

  // Obtém a passwrod da localStorage
  const password = localStorage.getItem("password");

  document.getElementById("passwordInput").value = password;
};
