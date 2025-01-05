let users = JSON.parse(localStorage.getItem("users")) || [];
let editingIndex = null;

document
  .getElementById("addUser")
  .addEventListener("click", addOrUpdateUser);

function renderTable() {
  const tableBody = document.getElementById("userTableBody");
  tableBody.innerHTML = "";

  users.forEach((user, index) => {
    const row = document.createElement("tr");
    row.innerHTML = `
            <td>${user.firstName}</td>
            <td>${user.lastName}</td>
            <td>${user.age}</td>
            <td>${user.course}</td>
            <td>${user.faculty}</td>
            
                <button class="editButton" data-index="${index}">Edit</button>
                <button class="deleteButton" data-index="${index}">Delete</button>
            </td>
        `;
    tableBody.appendChild(row);
  });

  document.querySelectorAll(".editButton").forEach((button) => {
    button.addEventListener("click", (event) => {
      const index = event.target.dataset.index;
      editUser(index);
    });
  });

  document.querySelectorAll(".deleteButton").forEach((button) => {
    button.addEventListener("click", (event) => {
      const index = event.target.dataset.index;
      deleteUser(index);
    });
  });
}

function addOrUpdateUser() {
  const firstName = document.getElementById("firstName").value.trim();
  const lastName = document.getElementById("lastName").value.trim();
  const age = document.getElementById("age").value.trim();
  const course = document.getElementById("course").value.trim();
  const faculty = document.getElementById("faculty").value.trim();

  if (!firstName || !lastName || !age || !course || !faculty) {
    alert("Please fill in all fields");
    return;
  }
  const user = { firstName, lastName, age, course, faculty};
  if (editingIndex !== null) {
    users[editingIndex] = user;
    editingIndex = null; 
  } else {
    users.push(user);
  }

  localStorage.setItem("users", JSON.stringify(users));
  renderTable();
  clearForm(); 
}

function editUser(index) {
  const user = users[index];
  document.getElementById("firstName").value = user.firstName;
  document.getElementById("lastName").value = user.lastName;
  document.getElementById("age").value = user.email;
  document.getElementById("course").value = user.course;
  document.getElementById("faculty").value = user.faculty;

  editingIndex = index; 
}

function deleteUser(index) {
  users.splice(index, 1);
  localStorage.setItem("users", JSON.stringify(users));
  renderTable();
}

function clearForm() {
  document.getElementById("firstName").value = "";
  document.getElementById("lastName").value = "";
  document.getElementById("age").value = "";
  document.getElementById("course").value = "";
  document.getElementById("faculty").value = "";
}

renderTable();