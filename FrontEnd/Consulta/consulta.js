await fetch(
  "http://localhost:8080/backEnd/rest/user/verifyUsername?username=" +
    user.username,
  {
    method: "POST",
    headers: {
      Accept: "*/*",
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
    body: JSON.stringify(user),
  }
).then(async function (response) {
  if (response.status == 200) {
    alert("Username already exists: " + user.username);
  } else if (response.status == 404) {
    alert("USERNAME DISPONÍVEL" + response.status);
    await fetch("http://localhost:8080/backEnd/rest/user/register", {
      method: "POST",
      headers: {
        Accept: "*/*",
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify(user),
    }).then(function (response) {
      if (response.status == 200) {
        alert("User is added successfully :)");
        window.location.href = "index.html";
      } else {
        alert("ERRO TESTE:" + response.status);
      }
    });
  }
});
