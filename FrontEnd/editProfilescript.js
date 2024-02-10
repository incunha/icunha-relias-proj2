document.getElementById("goBackButton").addEventListener("click", function () {
  window.location.href = "interface.html";
});

window.onload = function () {
  console.log("here");
  console.log(localStorage.getItem("password"));
  const username = localStorage.getItem("username"); // Obtém o nome de utilizador da localStorage

  // Obtém a senha da localStorage e converte para string
  const password = localStorage.getItem("password") || "";
  console.log(localStorage.getItem("password"));

  document.getElementById("passwordInput").value = password;
};
