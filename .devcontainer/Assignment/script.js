let token = "";
let currentPage = 1;

function login() {
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  fetch('https://reqres.in/api/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  })
  .then(res => res.json())
  .then(data => {
    if (data.token) {
      token = data.token;
      document.getElementById('loginScreen').classList.add('hidden');
      document.getElementById('userListScreen').classList.remove('hidden');
      loadUsers();
    } else {
      document.getElementById('loginError').innerText = data.error || 'Login failed';
    }
  });
}

function loadUsers() {
  fetch(`https://reqres.in/api/users?page=${currentPage++}`).then(res => res.json()).then(data => {const container = document.getElementById('usersContainer');
      data.data.forEach(user => {
        const div = document.createElement('div');
        div.className = 'user-card';
        div.innerHTML = `
          <img src="${user.avatar}" width="50" height="50" />
          <div>
            <div><strong>${user.first_name} ${user.last_name}</strong></div>
            <div>${user.email}</div>
            <button onclick="editUser(${user.id}, '${user.first_name}', '${user.last_name}', '${user.email}')">Edit</button>
            <button onclick="deleteUser(${user.id}, this)">Delete</button>
          </div>
        `;
        container.appendChild(div);
      });
    });
}

function editUser(id, firstName, lastName, email) {
  const newName = prompt(`Edit Name:, ${firstName} ${lastName}`);
  const newEmail = prompt("Edit Email:", email);
  if (!newName || !newEmail) return;

  const [first, last=""] = newName.split(" ");
  fetch(`https://reqres.in/api/users/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ first_name: first, last_name: last, email: newEmail })

  .then(res => res.json())
  .then(data => alert("User updated (simulated): " + JSON.stringify(data)))
  });

function deleteUser(id, btn) {
  fetch(`https://reqres.in/api/users/${id}`,{ method: 'DELETE' })
    .then(() => {
      btn.closest('.user-card').remove();
      alert("User deleted (simulated)");
    });
}
}