const API = "http://localhost:3000";

async function obtenerUsuarios() {
  const res = await fetch(API + "/users");
  const data = await res.json();

  const lista = document.getElementById("lista");
  lista.innerHTML = "";

  data.forEach(user => {
    lista.innerHTML += `
      <li>
        ${user.name} - ${user.email}
        <button onclick="eliminarUsuario(${user.id})">X</button>
      </li>
    `;
  });
}

async function crearUsuario() {
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;

  await fetch(API + "/users", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ name, email })
  });

  obtenerUsuarios();
}

async function eliminarUsuario(id) {
  await fetch(API + "/users/" + id, {
    method: "DELETE"
  });

  obtenerUsuarios();
}

obtenerUsuarios();