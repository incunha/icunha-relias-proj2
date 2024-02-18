//Função que garante que o HTML é carregado antes de executar o script
document.addEventListener("DOMContentLoaded", function () {
  const username = localStorage.getItem("username");
  const password = localStorage.getItem("password");
  getUserData(username);
  getPhotoUrl(username, password);
  //Obtém a tarefa a ser editada da sessionStorage
  const taskID = sessionStorage.getItem("taskToEdite");
  getTask(taskID);
  //Função para verificar se a data inicial é menor que a data final
  function verifyDate(task) {
    if (task.initialDate > task.finalDate) {
      return false;
    } else return true;
  }
  //Função para ir para a página de interface
  function refresh() {
    window.location.href = "interface.html";
  }
  //Função para obter a tarefa a ser editada
  async function getTask(taskId) {
    let userUsado = {
      username: localStorage.getItem("username"),
      password: localStorage.getItem("password"),
    };
    const headerss = new Headers();
    headerss.append("username", userUsado.username);
    headerss.append("password", userUsado.password);
    headerss.append("id", taskId);
    headerss.append("Content-Type", "application/json");
    await fetch("http://localhost:8080/backEnd/rest/users/getTask", {
      method: "GET",
      headers: headerss,
    }).then(async function (response) {
      if (response.status == 403) {
        alert("Acess Denied");
      } else if (response.status == 404) {
        alert("Task not found");
      } else if (response.status == 200) {
        const taskEdit = await response.json();
        console.log(taskEdit);
        document.getElementById("editarTarefaTitulo").textContent =
          taskEdit.title;
        document.getElementById("editarTarefaDescricao").textContent =
          taskEdit.description;
        document.getElementById("initialDateEdit").value = taskEdit.initialDate;
        if (taskEdit.finalDate == '2199-12-31') {
          document.getElementById("finalDateEdit").value = "";
        }else{
        document.getElementById("finalDateEdit").value = taskEdit.finalDate;
        }
        if (taskEdit.priority == 100) {
          document.getElementById("editTaskPriority").value = "low";
        } else if (taskEdit.priority == 200) {
          document.getElementById("editTaskPriority").value = "medium";
        } else if (taskEdit.priority == 300) {
          document.getElementById("editTaskPriority").value = "high";
        }
        if (taskEdit.status == 100) {
          document.getElementById("editTaskStatus").value = "ToDo";
        } else if (taskEdit.status == 200) {
          document.getElementById("editTaskStatus").value = "Doing";
        } else if (taskEdit.status == 300) {
          document.getElementById("editTaskStatus").value = "Done";
        }
        //Obtem o botão de guardar a edição da tarefa
        const guardaEditarTarefaButton =
          document.getElementById("GuardaEditarTarefa");

        // Adiciona um listener para o botão de guardar a edição da tarefa
        guardaEditarTarefaButton.addEventListener("click", function () {
          if (document.getElementById("editTaskStatus").value === "ToDo") {
            let statusS = 100;

            if (document.getElementById("editTaskPriority").value === "low") {
              let priorityS = 100;
              let finaldate = document.getElementById("finalDateEdit").value;
              if (finaldate === "") {
                finaldate = "2199-12-31";
              }
              const newTask = {
                title: document.getElementById("editarTarefaTitulo").value,
                description: document.getElementById("editarTarefaDescricao")
                  .value,
                priority: priorityS,
                status: statusS,
                initialDate: document.getElementById("initialDateEdit").value,
                finalDate: finaldate,
                id: taskEdit.id,
              };
              if (verifyDate(newTask)) {
                updateTask(newTask);
                refresh();
              } else {
                dateError.style.display = "block";
              }
            } else if (
              document.getElementById("editTaskPriority").value === "medium"
            ) {
              let priorityS = 200;
              let finaldate = document.getElementById("finalDateEdit").value;
              if (finaldate === "") {
                finaldate = "2199-12-31";
              }
              
              const newTask = {
                title: document.getElementById("editarTarefaTitulo").value,
                description: document.getElementById("editarTarefaDescricao")
                  .value,
                priority: priorityS,
                status: statusS,
                id: taskEdit.id,
                initialDate: document.getElementById("initialDateEdit").value,
                finalDate: finaldate,
              };
              if (verifyDate(newTask)) {
                updateTask(newTask);
                refresh();
              } else {
                dateError.style.display = "block";
              }
            } else if (
              document.getElementById("editTaskPriority").value === "high"
            ) {
              let priorityS = 300;
              let finaldate = document.getElementById("finalDateEdit").value;
              if (finaldate === "") {
                finaldate = "2199-12-31";
              }
              const newTask = {
                title: document.getElementById("editarTarefaTitulo").value,
                description: document.getElementById("editarTarefaDescricao")
                  .value,
                priority: priorityS,
                status: statusS,
                id: taskEdit.id,
                initialDate: document.getElementById("initialDateEdit").value,
                finalDate: finaldate,
              };

              if (verifyDate(newTask)) {
                updateTask(newTask);
                refresh();
              } else {
                dateError.style.display = "block";
              }
            }
          } else if (
            document.getElementById("editTaskStatus").value === "Doing"
          ) {
            let statusS = 200;
            let finaldate = document.getElementById("finalDateEdit").value;
              if (finaldate === "") {
                finaldate = "2199-12-31";
              }

            if (document.getElementById("editTaskPriority").value === "low") {
              let priorityS = 100;
              const newTask = {
                title: document.getElementById("editarTarefaTitulo").value,
                description: document.getElementById("editarTarefaDescricao")
                  .value,
                priority: priorityS,
                status: statusS,
                id: taskEdit.id,
                initialDate: document.getElementById("initialDateEdit").value,
                finalDate: finaldate,
              };

              if (verifyDate(newTask)) {
                updateTask(newTask);
                refresh();
              } else {
                dateError.style.display = "block";
              }
            } else if (
              document.getElementById("editTaskPriority").value === "medium"
            ) {
              let priorityS = 200;
              let finaldate = document.getElementById("finalDateEdit").value;
              if (finaldate === "") {
                finaldate = "2199-12-31";
              }
              const newTask = {
                title: document.getElementById("editarTarefaTitulo").value,
                description: document.getElementById("editarTarefaDescricao")
                  .value,
                priority: priorityS,
                status: statusS,
                id: taskEdit.id,
                initialDate: document.getElementById("initialDateEdit").value,
                finalDate: finaldate,
              };

              if (verifyDate(newTask)) {
                updateTask(newTask);
                refresh();
              } else {
                dateError.style.display = "block";
              }
            } else if (
              document.getElementById("editTaskPriority").value === "high"
            ) {
              let priorityS = 300;
              let finaldate = document.getElementById("finalDateEdit").value;
              if (finaldate === "") {
                finaldate = "2199-12-31";
              }
              const newTask = {
                title: document.getElementById("editarTarefaTitulo").value,
                description: document.getElementById("editarTarefaDescricao")
                  .value,
                priority: priorityS,
                status: statusS,
                id: taskEdit.id,
                initialDate: document.getElementById("initialDateEdit").value,
                finalDate: finaldate,
              };
              if (verifyDate(newTask)) {
                updateTask(newTask);
                refresh();
              } else {
                dateError.style.display = "block";
              }
            }
          } else if (
            document.getElementById("editTaskStatus").value === "Done"
          ) {
            let statusS = 300;
            let finaldate = document.getElementById("finalDateEdit").value;
              if (finaldate === "") {
                finaldate = "2199-12-31";
              }

            if (document.getElementById("editTaskPriority").value === "low") {
              let priorityS = 100;
              const newTask = {
                title: document.getElementById("editarTarefaTitulo").value,
                description: document.getElementById("editarTarefaDescricao")
                  .value,
                priority: priorityS,
                status: statusS,
                id: taskEdit.id,
                initialDate: document.getElementById("initialDateEdit").value,
                finalDate: finaldate,
              };

              if (verifyDate(newTask)) {
                updateTask(newTask);
                refresh();
              } else {
                dateError.style.display = "block";
              }
            } else if (
              document.getElementById("editTaskPriority").value === "medium"
            ) {
              let priorityS = 200;
              let finaldate = document.getElementById("finalDateEdit").value;
              if (finaldate === "") {
                finaldate = "2199-12-31";
              }
              const newTask = {
                title: document.getElementById("editarTarefaTitulo").value,
                description: document.getElementById("editarTarefaDescricao")
                  .value,
                priority: priorityS,
                status: statusS,
                id: taskEdit.id,
                initialDate: document.getElementById("initialDateEdit").value,
                finalDate: finaldate,
              };

              if (verifyDate(newTask)) {
                updateTask(newTask);
                refresh();
              } else {
                dateError.style.display = "block";
              }
            } else if (
              document.getElementById("editTaskPriority").value === "high"
            ) {
              let priorityS = 300;
              let finaldate = document.getElementById("finalDateEdit").value;
              if (finaldate === "") {
                finaldate = "2199-12-31";
              }
              const newTask = {
                title: document.getElementById("editarTarefaTitulo").value,
                description: document.getElementById("editarTarefaDescricao")
                  .value,
                priority: priorityS,
                status: statusS,
                id: taskEdit.id,
                initialDate: document.getElementById("initialDateEdit").value,
                finalDate: finaldate,
              };

              if (verifyDate(newTask)) {
                updateTask(newTask);
                refresh();
              } else {
                dateError.style.display = "block";
              }
            }
          }
        });
        //Função para atualizar a tarefa
        async function updateTask(task) {
          let username = localStorage.getItem("username");
          let password = localStorage.getItem("password");

          const headers = new Headers();
          headers.append("username", username);
          headers.append("password", password);
          headers.append("id", task.id);
          headers.append("Content-Type", "application/json");

          const taskkk = {
            title: task.title,
            description: task.description,
            priority: task.priority,
            status: task.status,
            initialDate: task.initialDate,
            finalDate: task.finalDate,
          };

          console.log(taskkk.priority);

          if (taskkk.initialDate > task.finalDate) {
            dateError.style.display = "block";
          } else {
            await fetch(
              `http://localhost:8080/backEnd/rest/users/task/update`,
              {
                method: "PUT",
                headers: headers,
                body: JSON.stringify(taskkk),
              }
            ).then(function (response) {
              if (response.status == 403) {
                alert("Acess Denied");
              } else if (response.status == 404) {
                alert("Task not found");
              } else if (response.status == 200) {
                console.log("Task updated.");
              }
            });
          }
        }
      }
    });
  }
  displayDateTime(); // Adiciona a exibição da data e hora
  setInterval(displayDateTime, 1000); // Atualiza a cada segundo
  // Adiciona um listener para o botão de cancelar a edição da tarefa
  document
    .getElementById("CancelaEditarTarefa")
    .addEventListener("click", function () {
      window.location.href = "interface.html"; // Redireciona para interface.html
    });

  // Função para exibir a data e hora atuais
  function displayDateTime() {
    const currentDate = new Date();
    const options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      timeZoneName: "short",
    };
    const dateTimeString = currentDate.toLocaleDateString("en-US", options);
    dateTimeDisplay.textContent = dateTimeString;
  }
});
//Função para obter a foto de perfil do utilizador
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
    if (response.status === 200) {
      const data = await response.text();
      document.getElementById("userIcon").src = data;
    } else if (response.status === 403) {
      alert("Acess Denied");
    } else if (response.status === 404) {
      alert("User not found");
    }
  } catch (error) {
    console.error("Error:", error);
    alert("Something went wrong");
  }
}
//Função para obter os dados do utilizador
async function getUserData(username) {
  let user = {
    username: username,
  };
  const headers = new Headers();
  headers.append("username", user.username);
  await fetch("http://localhost:8080/backEnd/rest/users/getUser", {
    method: "GET",
    headers: headers,
  })
    .then(async function (response) {
      if (response.status == 404) {
        alert("User not found");
      } else if (response.status == 200) {
        const userData = await response.json();
        console.log(userData);
        document.getElementById("displayUsername").textContent =
          userData.firstName;
      }
    })
    .catch(function (error) {
      console.error("Error fetching user information:", error);
    });
}
