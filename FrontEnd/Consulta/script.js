async function addActivity(form) {
  let activity = {
    id: "0",
    title: form.activity_title.value,
    description: form.description.value,
  };

  console.log(activity);
  await fetch("http://localhost:8080/my_activities_backend/rest/activity/add", {
    method: "POST",
    headers: {
      Accept: "*/*",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(activity),
  }).then(function (response) {
    if (response.status == 200) {
      alert("activity is added successfully :)");
      addActivityToTable(activity);
    } else {
      alert("ERRO TESTE:" + response.status);
    }
  });
}

function addActivityToTable(activity) {
  let table = document.getElementById("activitytable");
  let row = table.insertRow();
  let cellA = row.insertCell();
  let cellB = row.insertCell();
  let cellC = row.insertCell();
  cellA.innerHTML = activity["id"];
  cellB.innerHTML = activity["title"];
  cellC.innerHTML = activity["description"];
}

async function getAllActivities() {
  await fetch("http://localhost:8080/my_activities_backend/rest/activity/all", {
    method: "GET",
    headers: {
      Accept: "application/json",
    },
  })
    .then((response) => response.json())
    .then((data) => fillActivityTable(JSON.stringify(data)));
}

function fillActivityTable(activities) {
  console.log(activities);
  data = JSON.parse(activities);
  let table = document.getElementById("activitytable");
  for (let key in data) {
    addActivityToTable(data[key]);
  }
}

getAllActivities();
