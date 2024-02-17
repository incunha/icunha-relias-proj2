//Função chamada cada vez que a página é carregada
document.addEventListener("DOMContentLoaded", function () {
  const username = localStorage.getItem("username");
  document.getElementById("displayUsername").textContent = username;

  //Obtém a tarefa a ser editada da sessionStorage
  const taskID = sessionStorage.getItem("taskToEdite");
  getTask(taskID);

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
      if (response.status == 404) {
        alert("erro");
      } else if (response.status == 200) {
        const taskEdit = await response.json();
        console.log(taskEdit);
        document.getElementById("editarTarefaTitulo").textContent =
          taskEdit.title;
        document.getElementById("editarTarefaDescricao").textContent =
          taskEdit.description;
        document.getElementById("editTaskPriority").value = taskEdit.priority;
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
            const newTask = {
              title: document.getElementById("editarTarefaTitulo").value,
              description: document.getElementById("editarTarefaDescricao")
                .value,
              priority: document.getElementById("editTaskPriority").value,
              status: statusS,
              id: taskEdit.id,
            };

            updateTask(newTask);
          } else if (
            document.getElementById("editTaskStatus").value === "Doing"
          ) {
            let statusS = 200;
            const newTask = {
              title: document.getElementById("editarTarefaTitulo").value,
              description: document.getElementById("editarTarefaDescricao")
                .value,
              priority: document.getElementById("editTaskPriority").value,
              status: statusS,
              id: taskEdit.id,
            };

            updateTask(newTask);
          } else if (
            document.getElementById("editTaskStatus").value === "Done"
          ) {
            let statusS = 300;
            const newTask = {
              title: document.getElementById("editarTarefaTitulo").value,
              description: document.getElementById("editarTarefaDescricao")
                .value,
              priority: document.getElementById("editTaskPriority").value,
              status: statusS,
              id: taskEdit.id,
            };

            updateTask(newTask);
          }
          window.location.href = "interface.html";
        });

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
            //id: task.id,
            //priority: task.priority,
            status: task.status,
            //initialDate: task.inicalDate,
            //finalDate: task.finalDate,
          };

          await fetch(`http://localhost:8080/backEnd/rest/users/task/update`, {
            method: "PUT",
            headers: headers,
            body: JSON.stringify(taskkk),
          }).then(function (response) {
            if (response.status == 404) {
              console.log(user.username);
              alert("Information not found");
            } else if (response.status == 200) {
              console.log("Task updated.");
            }
          });
        }
      }
    });
  }

  //Preenche os campos do formulário com os detalhes da tarefa a editar
  //document.getElementById("editTaskModal").style.display = "block";
  //document.body.classList.add("modal-open");

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
