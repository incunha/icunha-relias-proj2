//Listener para quando todas as acções de quando a página carrega

window.onload = function () {
  //Obtém o username da sessionStorage
  const username = localStorage.getItem("username");
  const password = localStorage.getItem("password");
  //Vai buscar o elemento que mostra o username
  let labelUsername = document.getElementById("displayUsername");
  //Coloca o username no elemento
  labelUsername.textContent = username;
  //Chama a função para mostrar a foto de perfil
  getPhotoUrl(username, password);

  displayDateTime(); // Adiciona a exibição da data e hora
  setInterval(displayDateTime, 1000); // Atualiza a cada segundo
  //Chama a função para mostrar as tarefas
  //displayTasks();
  gettasks();
};

//Obtem o botão Add Task
const addTaskButton = document.getElementById("addTaskButton");
//Obtem a modal para adicionar uma nova tarefa
const newTaskModal = document.getElementById("newTaskModal");
//Obtem o botao para cancelar a adição de uma nova tarefa
const cancelButtonAddTaskModal = document.getElementById("cancelTaskButton");
//Cria as 3 listas de objectos para as tarefas
const ToDoTasks = JSON.parse(localStorage.getItem("ToDoTasks")) || [];
const DoingTasks = JSON.parse(localStorage.getItem("DoingTasks")) || [];
const DoneTasks = JSON.parse(localStorage.getItem("DoneTasks")) || [];
//Obtem as 3 secções para as tarefas serem colocadas
const todoSection = document.getElementById("todo");
const doingSection = document.getElementById("doing");
const doneSection = document.getElementById("done");

//Obtem o modal de aviso de delete
const deleteWarning = document.getElementById("deleteWarning");
//Obtem os 2 botões do avisos de delete
const yesButton = document.getElementById("yesButtonDelete");
const noButton = document.getElementById("noButtonDelete");

//Obtem o popup menu que aparece com o click direito
const contextMenu = document.getElementById("contextMenu");
//Obtem a opcao de deconste do popup menu
const deleteTaskOption = document.getElementById("deleteTask");
//Obtem a opcao de editar do popup menu
const editTaskOption = document.getElementById("editTask");

//Obtem a modal que mostra os detalhes da tarefa
const taskDetailsModal = document.getElementById("taskDetailsModal");
//Obtem o label para o titulo da tarefa
const modalTaskTitle = document.getElementById("taskTitleinfo");
//Obtem o label para a descrição da tarefa
const modalTaskDescription = document.getElementById("taskDescriptioninfo");
//Obtem o botão para fechar a modal de detalhes da tarefa
const modalOkButton = document.getElementById("modalOkButton");

//Obtem o warning modal
const warningModal = document.getElementById("warningModal");
//Obtem o botão de ok do warning modal
const okButton = document.getElementById("modalWarningOkButton");

//Obtem o titulo e descrição do modal de adicionar uma nova tarefa
const taskTitle = document.getElementById("taskTitle").value;
const taskDescription = document.getElementById("taskDescription").value;

//Obtem o botão de logout
const botaoLogout = document.getElementById("logoutButton");

//Obtem a div que mostra a data e hora
const dateTimeDisplay = document.getElementById("dateTimeDisplay");

//Permite que uma tarefa seja largada sobre as secções
todoSection.addEventListener("drop", drop);
doingSection.addEventListener("drop", drop);
doneSection.addEventListener("drop", drop);

//Listener para quando se clica na em qualquer sitio da página
window.addEventListener("click", function (event) {
  //Se o popup menu estiver aberto e se clicar fora do popup menu, o popup menu é fechado
  if (contextMenu.style.display === "block") {
    contextMenu.style.display = "none";
  }
});

//Listener para quando o botão de logout é clicado
botaoLogout.addEventListener("click", function () {
  localStorage.clear();
  //Redireciona para a página de login
  window.location.href = "index.html";
});

//Listener para quando o botão de editar perfil é clicado
document
  .getElementById("editProfileButton")
  .addEventListener("click", function () {
    window.location.href = "editProfilePage.html";
  });

//Listener para quando o botão Add Task é clicado
addTaskButton.addEventListener("click", function () {
  //Limpas os campos de input da modal
  document.getElementById("taskTitle").value = "";
  document.getElementById("taskDescription").value = "";
  document.getElementById("editTaskPriority").value = "";
  document.getElementById("initialDate").value = "";
  document.getElementById("finalDate").value = "";

  //Mostra a modal
  newTaskModal.style.display = "block";
  //Escurece o fundo da página
  document.body.classList.add("modal-open");
});

//Listener para quando o botão de cancelar da modal de adicionar uma nova tarefa é clicado
cancelButtonAddTaskModal.addEventListener("click", function () {
  //Fecha a modal
  newTaskModal.style.display = "none";
  //Remove o escurecimento do fundo da página
  document.body.classList.remove("modal-open");
});

//Previne o comportamento padrão do browser quando o cursor é arrastado sobre as secções
todoSection.addEventListener("dragover", function (event) {
  event.preventDefault();
});
doingSection.addEventListener("dragover", function (event) {
  event.preventDefault();
});
doneSection.addEventListener("dragover", function (event) {
  event.preventDefault();
});

//Listener para quando o botão de adicionar uma nova tarefa é clicado
submitTaskButton.addEventListener("click", async function () {
  // Vai buscar os valores dos inputs do titulo, descrição e prioridade da tarefa e guarda-os nas variáveis titulo, descricao e priority
  const titulo = document.getElementById("taskTitle").value;
  const descricao = document.getElementById("taskDescription").value;
  const priority = document.getElementById("editTaskPriority").value;
  const inicalDate = document.getElementById("initialDate").value;
  const finalDate = document.getElementById("finalDate").value;


  if (titulo === "" || descricao === "") {
    //Mostra o modal de aviso
    warningModal.style.display = "block";
    //Adiciona o escurecimento do fundo da página
    document.getElementById("modalOverlay2").style.display = "block";
  } else {

    //Cria um objecto com o identificador, o titulo e a descrição da tarefa
    const task = {

      title: titulo,
      description: descricao,
      priority: priority,
      initialDate: inicalDate,
      finalDate: finalDate,
    };
      const headers = new Headers();
      headers.append("username", localStorage.getItem("username"));
      headers.append("password", localStorage.getItem("password"));
      headers.append("Content-Type", "application/json");
    await fetch("http://localhost:8080/backEnd/rest/users/addTask", {
      method: "POST",
      headers: headers,
            
      body: JSON.stringify(task),
    }).then(async function (response) {
      if (response.status == 405) {
        alert("Não autorizado.");
      } else if (response.status == 200) {
        alert("HERE");
        createTaskElements(gettasks());
      }
    });
  }
});

async function gettasks() {
  let user = {
    username: localStorage.getItem("username"),
    password: localStorage.getItem("password"),
  };
  const headers = new Headers();
  headers.append("username", user.username);
  headers.append("password", user.password);
  headers.append("Content-Type", "application/json");

  await fetch("http://localhost:8080/backEnd/rest/users/tasks", {
    method: "GET",
    headers: headers,
  }).then(async function (response) {
    if (response.status == 405) {
      alert("Não autorizado");
    } else if (response.status == 200) {
      const tasks = await response.json();
      displayTasks(tasks);
    }
  });
}


//Listener para quando o botão de "Yes" do deleteWarning modal é clicado
yesButton.addEventListener("click", async function () {

    // Close the deleteWarning modal and remove the background overlay
    deleteWarning.style.display = "none";
    document.body.classList.remove("modal-open");

  //Obtem o identificador da tarefa que foi guardado no atributo data-task-id do deleteWarning modal
  const taskId = deleteWarning.getAttribute("data-task-id");


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
      const taskMoved = await response.json();
      console.log(taskMoved);
      deleteTask(taskMoved);
    }
  });
  

  //Percorre as 3 listas de tarefas para encontrar o index da tarefa que foi largada e guarda a taskList onde a tarefa se encontra
  let taskIndex = ToDoTasks.findIndex((task) => task.identificador == taskId);
  let taskList = ToDoTasks;
  //findIndex retorna -1 se não encontrar a tarefa na lista
  if (taskIndex === -1) {
    taskIndex = DoingTasks.findIndex((task) => task.identificador == taskId);
    taskList = DoingTasks;
    if (taskIndex === -1) {
      taskIndex = DoneTasks.findIndex((task) => task.identificador == taskId);
      taskList = DoneTasks;
    }
  }
  //Remove a tarefa da lista onde se encontrava
  taskList.splice(taskIndex, 1); // Remove the task from its current list

  //Chama a função para mostrar as tarefas
  displayTasks();



  
});

noButton.addEventListener("click", function () {
  //Esconde o deleteWarning modal e remove o escurecimento do fundo da página
  deleteWarning.style.display = "none";
  document.body.classList.remove("modal-open");
});





//Listener para quando o botão de "Delete" do popup menu é clicado
deleteTaskOption.addEventListener("click", () => {
  //Esconde o popup menu
  contextMenu.style.display = "none";

  //Obtem o identificador da tarefa que foi guardado no atributo data-task-id do popup menu
  const taskId = contextMenu.getAttribute("data-task-id");

  //Guarda o identificador da tarefa no atributo data-task-id do deleteWarning modal
  deleteWarning.setAttribute("data-task-id", taskId);

  //Mostra o deleteWarning modal e escurece o fundo da página
  deleteWarning.style.display = "block";
  document.body.classList.add("modal-open");
});

//Listener para quando o botão de "Edit" do popup menu é clicado
editTaskOption.addEventListener("click", async () => {
  //Esconde o popup menu
  contextMenu.style.display = "none";

    //Obtem o identificador da tarefa que foi guardado no atributo data-task-id do popup menu
    const taskId = contextMenu.getAttribute("data-task-id");
    sessionStorage.setItem("taskToEdite", taskId);
    

    
  

  
  //Redireciona para a página de editar tarefa
  window.location.href = "editTaskPage.html";
});

//Listener para quando o botão de "Ok" do modal de detalhes da tarefa é clicado
modalOkButton.addEventListener("click", function () {
  //Esconde o modal de detalhes da tarefa e remove o escurecimento do fundo da página
  taskDetailsModal.style.display = "none";
  document.body.classList.remove("modal-open");
});

//Listener para quando o botão de "Ok" do modal de aviso é clicado
okButton.addEventListener("click", function () {
  //Esconde o modal de aviso e remove o escurecimento do fundo da página
  warningModal.style.display = "none";
  //Remove o escurecimento do fundo da página
  document.getElementById("modalOverlay2").style.display = "none";
});

//Função que permite que um elemento seja largado sobre outro elemento, prevenindo o comportamento padrão do browser
function allowDrop(event) {
  event.preventDefault();
}

async function getTaskById(taskID) {
  let userUsado = {
    username: localStorage.getItem("username"),
    password: localStorage.getItem("password"),
  };
  const headerss = new Headers();
  headerss.append("username", userUsado.username);
  headerss.append("password", userUsado.password);
  headerss.append("id", taskID);
  headerss.append("Content-Type", "application/json");
  await fetch("http://localhost:8080/backEnd/rest/users/getTask", {
    method: "GET",
    headers: headerss,
  }).then(async function (response) {
    if (response.status == 404) {
      alert("erro");
    } else if (response.status == 200) {
      const taskMoved = await response.json();
      console.log(taskMoved);
      return taskMoved;
    }
  });
}

//Função que define o que acontece quando uma tarefa é largada sobre um determinado elemento
async function drop(event) {
  //Evita o comportamento padrão do browser
  event.preventDefault();

  //Obtem o identificador da tarefa que foi largada sobre o elemento e guarda-o na variável taskId
  const taskId = event.dataTransfer.getData("data_id");

  const tasK = await getTaskById(taskId);

  console.log(tasK);
  //console.log(event.dataTransfer.getData("data_id"));

  //Obtem a secção onde a tarefa foi largada
  let targetSection = event.target;

  //Se a taskElement e a targetSection existirem
  if (taskElement && targetSection) {
    //Adiciona a tarefa à secção onde foi largada
    targetSection.appendChild(taskElement);

    updateStatusTask(taskElement);

    //Percorre as 3 listas de tarefas para encontrar o index da tarefa que foi largada e guarda a taskList onde a tarefa se encontra
    let taskIndex = ToDoTasks.findIndex((task) => task.identificador == taskId);
    let taskList = ToDoTasks;
    //findIndex retorna -1 se não encontrar a tarefa na lista
    if (taskIndex === -1) {
      taskIndex = DoingTasks.findIndex((task) => task.identificador == taskId);
      taskList = DoingTasks;
      if (taskIndex === -1) {
        taskIndex = DoneTasks.findIndex((task) => task.identificador == taskId);
        taskList = DoneTasks;
      }
    }

    //Remove a tarefa da lista onde se encontrava
    const task = taskList.splice(taskIndex, 1)[0];
  }

  //Volta a chamar a função para mostrar as tarefas
  gettasks();
}

async function updateStatusTask(task) {
  let username = localStorage.getItem("username");
  let password = localStorage.getItem("password");

  const headers = new Headers();
  headers.append("username", username);
  headers.append("password", password);
  headers.append("id", task.id);
  headers.append("Content-Type", "application/json");

  await fetch(`http://localhost:8080/backEnd/rest/users/task/update`, {
    method: "PUT",
    headers: headers,
  })
    .then(function (response) {
      if (response.status == 404) {
        console.log(user.username);
        alert("Information not found");
      } else if (response.status == 200) {
        return response.json(); // Processa o corpo da resposta como JSON
      }
    })
    .then(function (taskData) {
      alert("Information found");

      document.getElementById("taskTitle").value = taskData.title;
      document.getElementById("taskDescription").value = taskData.description;
      document.getElementById("initialDate").value = taskData.inicalDate;
      document.getElementById("finalDate").value = taskData.finalDate;
      if (targetSection.id === "todo") {
        todoSection.appendChild(task);
        document.getElementById("status").value = 100;
      } else if (targetSection.id === "doing") {
        doingSection.appendChild(task);
        document.getElementById("status").value = 200;
      } else if (targetSection.id === "done") {
        doneSection.appendChild(task);
        document.getElementById("status").value = 300;
      }
    })
    .catch(function (error) {
      console.error("Error fetching user information:", error);
    });
}

//Função que imprime as tarefas nas secções correspondentes
function displayTasks(tasks) {
  //Limpa todas as secções de tarefas
  todoSection.innerHTML = "";
  doingSection.innerHTML = "";
  doneSection.innerHTML = "";

  //Função que cria um elemento para uma tarefa na secção correspondente
  createTaskElements(tasks);
}

function createTaskElements(tasksArray) {
  let todoTasksContainer = document.getElementById("todo");
  let doingTasksContainer = document.getElementById("doing");
  let doneTasksContainer = document.getElementById("done");

  for (let i = 0; i < tasksArray.length; i++) {
    const task = tasksArray[i];

    const taskElement = document.createElement("div");
    taskElement.setAttribute("id", task.id);
    //tasksContainer.style.display = "flex";
    //tasksContainer.style.flexWrap = "wrap";
    taskElement.style.margin = "10px";
    taskElement.classList.add("task");

    taskElement.innerHTML = `
    <h3 title="${task.title}">${task.title}</h3>
`;

    //console.log(taskElement);

    taskElement.setAttribute("draggable", "true");


      //Adiciona um listener para quando o elemento div é clicado com o botão direito
  taskElement.addEventListener("contextmenu", (e) => {
    //Previnir o comportamento padrão do browser
    e.preventDefault();


    contextMenu.style.top = `${e.pageY}px`;
    contextMenu.style.left = `${e.pageX}px`;


    //Guarda o identificador e a prioridade da tarefa
    contextMenu.setAttribute("data-task-id", task.id);

    //Guarda o identificador da tarefa no sessionStorage
    sessionStorage.setItem("taskID", task.id);

    //Mostra o popup menu
    contextMenu.style.display = "block";
  });

    taskElement.addEventListener("dragstart", function (event) {
      event.dataTransfer.setData("data_id", event.target.id);
      console.log("---", target.id);
    });

    //Adiciona um listener para quando o elemento div é clicado duas vezes
    taskElement.addEventListener("dblclick", function () {
      //Coloca no modal os detalhes da tarefa o titulo e a descrição
      modalTaskTitle.textContent = task.title;
      modalTaskDescription.textContent = task.description;

      //Mostra o modal escurecendo o fundo da página
      taskDetailsModal.style.display = "block";
      document.body.classList.add("modal-open");
    });
    if (task.status == 100) {
      todoTasksContainer.appendChild(taskElement);
    } else if (task.status == 200) {
      doingTasksContainer.appendChild(taskElement);
    } else if (task.status == 300) {
      doneTasksContainer.appendChild(taskElement);
    }
  }
  //todoSection.appendChild(tasksContainer);
  //tasksContainer.style.display = "block";

  // Fecha a modal de nova tarefa e remove o escurecimento do fundo da página
  //newTaskModal.style.display = "none";
  //document.body.classList.remove("modal-open");
}

function createTaskElement(task) {
  //Cria um elemento div para a tarefa
  const taskElement = document.createElement("div");
  taskElement.id= task.id;
  taskElement.classList.add("task-element");

  //Cria um elemento div para o titulo da tarefa para que o mesmo possa ser estilizado
  const titleContainer = document.createElement("div");
  titleContainer.classList.add("title");
  titleContainer.textContent = task.titulo;
  taskElement.appendChild(titleContainer);
  //Atribui o id ao elemento div pelo identificador da tarefa
  taskElement.id = task.identificador;
  //Define que o elemento div é arrastável
  taskElement.draggable = true;

  //Cria um elemento img para o icon da prioridade
  const priorityIcon = document.createElement("img");
  priorityIcon.classList.add("priority-icon");

  //Define o icon da prioridade de acordo com a prioridade da tarefa
  switch (task.prioridade) {
    case "low":
      priorityIcon.src = "resources/Icons/low_priority.png";
      break;
    case "medium":
      priorityIcon.src = "resources/Icons/medium_priority.png";
      break;
    case "high":
      priorityIcon.src = "resources/Icons/high_priority.png";
      break;
    default:
      break;
  }

  //Adiciona o icon da prioridade ao elemento div
  taskElement.appendChild(priorityIcon);

  //Define que a informação do elemento arrastável é o id da tarefa
  taskElement.addEventListener("dragstart", function (event) {
    event.dataTransfer.setData("data_id", event.target.id);
  });

  //Adiciona um listener para quando o elemento div é clicado duas vezes
  taskElement.addEventListener("dblclick", function () {
    //Coloca no modal os detalhes da tarefa o titulo e a descrição
    modalTaskTitle.textContent = task.title;
    modalTaskDescription.textContent = task.description;

    //Mostra o modal escurecendo o fundo da página
    taskDetailsModal.style.display = "block";
    document.body.classList.add("modal-open");
  });

  //Adiciona um listener para quando o elemento div é clicado com o botão direito
  taskElement.addEventListener("contextmenu", (e) => {
    //Previnir o comportamento padrão do browser
    e.preventDefault();

    //Estiliza o popup menu para aparecer onde o cursor é clicado com o botão direito
    contextMenu.style.top = `${e.pageY}px`;
    contextMenu.style.left = `${e.pageX}px`;

    //Guarda o identificador e a prioridade da tarefa
    contextMenu.setAttribute("data-task-id", task.identificador);

    //Variável para guardar o nome da secção onde a tarefa se encontra
    let sectionName;

    //Verifica onde se encontra a tarefa através do identificador da tarefa e guarda-a na variável taskToEdit
    const taskToEdit =
      ToDoTasks.find((t) => t.identificador === task.identificador) ||
      DoingTasks.find((t) => t.identificador === task.identificador) ||
      DoneTasks.find((t) => t.identificador === task.identificador);

    //Verifica onde se encontra a tarefa e guarda o nome da secção na variável sectionName
    if (ToDoTasks.includes(taskToEdit)) {
      sectionName = "ToDo";
    } else if (DoingTasks.includes(taskToEdit)) {
      sectionName = "Doing";
    } else if (DoneTasks.includes(taskToEdit)) {
      sectionName = "Done";
    }

    //Grava a tarefa e o nome da secção onde se encontra na sessionStorage
    sessionStorage.setItem("taskToEdit", JSON.stringify(taskToEdit));
    sessionStorage.setItem("sectionName", sectionName);

    //Mostra o popup menu
    contextMenu.style.display = "block";
  });
  //Retorna o elemento div
  return taskElement;
}


async function deleteTask(task) {

  let username = localStorage.getItem("username");
  let password = localStorage.getItem("password");

  const headers = new Headers();
  headers.append("username", username);
  headers.append("password", password);
  headers.append("id", task.id);
  headers.append("Content-Type", "application/json");


await fetch(`http://localhost:8080/backEnd/rest/users/deleteTask`, {
  method: "DELETE",
  headers: headers
})
  .then(function (response) {
    if (response.status == 404) {
      console.log(user.username);
      alert("Information not found");
    } else if (response.status == 200) {
      console.log("task deleted");
      gettasks();
    }
  })
}




//Função que mostra a data e hora
function displayDateTime() {
  const currentDate = new Date();

  //Formata a data e hora
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

  // Atualiza o conteúdo do elemento
  dateTimeDisplay.textContent = dateTimeString;
}

//Função que vai buscar a foto de perfil do utilizador
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

    if (response.ok) {
      const data = await response.text();
      document.getElementById("userIcon").src = data;
    } else if (response.status === 401) {
      alert("Invalid credentials");
    } else if (response.status === 404) {
      alert("teste 404");
    }
  } catch (error) {
    console.error("Error:", error);
    alert("Something went wrong");
  }
}
