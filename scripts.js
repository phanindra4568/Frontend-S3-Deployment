const API_URL = "https://YOUR_API_ID.execute-api.YOUR_REGION.amazonaws.com/prod";
const COGNITO_DOMAIN = "https://YOUR_DOMAIN.auth.YOUR_REGION.amazoncognito.com";
const CLIENT_ID = "YOUR_CLIENT_ID";
const REDIRECT_URI = "http://YOUR-S3-WEBSITE-URL";

// OAuth login
const hash = window.location.hash;
if (hash.includes("id_token")) {
  const token = hash.split("id_token=")[1].split("&")[0];
  localStorage.setItem("token", token);
  window.location.hash = "";
}

const token = localStorage.getItem("token");
if (token) {
  document.getElementById("login").style.display = "none";
  document.getElementById("logout").style.display = "inline-block";
  document.getElementById("app").style.display = "block";
  loadTasks();
}

document.getElementById("login").onclick = () => {
  window.location.href = `${COGNITO_DOMAIN}/login?client_id=${CLIENT_ID}&response_type=token&redirect_uri=${REDIRECT_URI}`;
};

document.getElementById("logout").onclick = () => {
  localStorage.removeItem("token");
  window.location.reload();
};

async function loadTasks() {
  const resp = await fetch(`${API_URL}/tasks`, {
    headers: { Authorization: token }
  });
  const data = await resp.json();

  const ul = document.getElementById("tasks");
  ul.innerHTML = "";
  data.forEach(t => {
    ul.innerHTML += `<li>${t.title}</li>`;
  });
}

async function addTask() {
  const title = document.getElementById("title").value;

  await fetch(`${API_URL}/tasks`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: token
    },
    body: JSON.stringify({ title })
  });

  loadTasks();
}

