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
          document.getElementById("editTaskStatus").value = "DoneDoing";
        }
      }
    });
  }

  //Preenche os campos do formulário com os detalhes da tarefa a editar
  document.getElementById("editTaskModal").style.display = "block";
  document.body.classList.add("modal-open");

  displayDateTime(); // Adiciona a exibição da data e hora
  setInterval(displayDateTime, 1000); // Atualiza a cada segundo
  //Esconde o modal de confirmação
  confirmationModal.style.display = "none";

  // Adiciona um listener para o botão de cancelar a edição da tarefa
  document
    .getElementById("CancelaEditarTarefa")
    .addEventListener("click", function () {
      // Redireciona para interface.html
      window.location.href = "interface.html";
    });

  //Obtem o botão de confirmar a edição da tarefa do modal de confirmação
  const confirmEditButton = document.getElementById("confirmEditButton");
  //Obtem o botão de guardar a edição da tarefa
  const guardaEditarTarefaButton =
    document.getElementById("GuardaEditarTarefa");

  // Adiciona um listener para o botão de cancelar a edição da tarefa do modal de confirmação
  const cancelEditButton = document.getElementById("cancelEditButton");
  cancelEditButton.addEventListener("click", function () {
    //Esconde o modal de confirmação e mostra o modal de edição
    confirmationModal.style.display = "none";
    modal.style.display = "block";
  });

  // Adiciona um listener para o botão de guardar a edição da tarefa
  guardaEditarTarefaButton.addEventListener("click", function () {
    alert("SAVE");
    //Obtem os valores dos campos que podem ser editados
    const editedTitulo = document.getElementById("editarTarefaTitulo").value;
    const editedDescricao = document.getElementById(
      "editarTarefaDescricao"
    ).value;
    const selectedSectionName = document.getElementById("editTaskStatus").value;
    const selectedPriority = document.getElementById("editTaskPriority").value;

    //Verifica se algum dos campos foi alterado
    if (
      editedTitulo !== originalTitulo ||
      editedDescricao !== originalDescricao ||
      selectedSectionName !== originalSectionName ||
      selectedPriority !== originalPriority
    ) {
      //Se algum dos campos foi alterado, mostra o modal de confirmação e escurece o fundo
      const confirmationModal = document.getElementById("confirmationModal");
      confirmationModal.style.display = "block";
      modal.style.display = "none";
    }
  });

  confirmEditButton.addEventListener("click", function () {
    //Obtem os valores dos campos que podem ser editados
    const editedTitulo = document.getElementById("editarTarefaTitulo").value;
    const editedDescricao = document.getElementById(
      "editarTarefaDescricao"
    ).value;
    const selectedPriority = document.getElementById("editTaskPriority").value;
    const selectedSectionName = document.getElementById("editTaskStatus").value;

    //Atualiza os valores da tarefa a ser editada
    taskToEdit.titulo = editedTitulo;
    taskToEdit.descricao = editedDescricao;
    taskToEdit.prioridade = selectedPriority;

    //Remove a tarefa da secção original
    if (originalSectionName === "ToDo") {
      ToDoTasks = ToDoTasks.filter(
        (t) => t.identificador !== taskToEdit.identificador
      );
    } else if (originalSectionName === "Doing") {
      DoingTasks = DoingTasks.filter(
        (t) => t.identificador !== taskToEdit.identificador
      );
    } else if (originalSectionName === "Done") {
      DoneTasks = DoneTasks.filter(
        (t) => t.identificador !== taskToEdit.identificador
      );
    }
    //Adiciona a tarefa à secção selecionada
    if (selectedSectionName === "ToDo") {
      ToDoTasks.push(taskToEdit);
    } else if (selectedSectionName === "Doing") {
      DoingTasks.push(taskToEdit);
    } else if (selectedSectionName === "Done") {
      DoneTasks.push(taskToEdit);
    }

    //Atualiza as listas de tarefas na localStorage com as edições feitas
    localStorage.setItem("ToDoTasks", JSON.stringify(ToDoTasks));
    localStorage.setItem("DoingTasks", JSON.stringify(DoingTasks));
    localStorage.setItem("DoneTasks", JSON.stringify(DoneTasks));

    //Redireciona para interface.html
    window.location.href = "interface.html";
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

// Restante do seu código fora do bloco DOMContentLoaded
