document.getElementById('goBackButton').addEventListener('click', function() {
    window.location.href = 'interface.html';
  });

  window.onload = async function() {
    const username = 'exampleUser'; // substitua por o nome de usuário desejado
    const response = await fetch(`/api/user/${username}`);
    const userData = await response.json();
  
    document.getElementById('usernameInput').placeholder = userData.username;
    document.getElementById('passwordInput').placeholder = userData.password;
    document.getElementById('emailInput').placeholder = userData.email;
    document.getElementById('firstNameInput').placeholder = userData.firstName;
    document.getElementById('lastNameInput').placeholder = userData.lastName;
    document.getElementById('phoneNumberInput').placeholder = userData.phoneNumber;
    document.getElementById('photoInput').placeholder = userData.profilePhoto;
  };

document.querySelector('form').addEventListener('submit', function(event) {
  event.preventDefault();
  var formData = new FormData(event.target);

  fetch("http://localhost:8080/backEnd_war_exploded/rest/user//{username}", {
    method: 'POST',
    body: formData
  })
  .then(function(response) {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then(function(data) {
    console.log('Success:', data);
  })
  .catch(function(error) {
    console.error('Error:', error);
  });
});