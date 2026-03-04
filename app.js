// app.js

const STORAGE_KEY = "taskflow_tasks_v1";
let tasks = [];

function saveTasks() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
}

function loadTasks() {
  const raw = localStorage.getItem(STORAGE_KEY);
  tasks = raw ? JSON.parse(raw) : [];
}

const form = document.getElementById("task-form");
const input = document.getElementById("task-input");
const prioritySelect = document.getElementById("task-priority");
const list = document.getElementById("task-list");
const search = document.getElementById("task-search");

form.addEventListener("submit", (e) => {
  e.preventDefault(); /*para evitar que la página cambie al actualizar*/

  const text = input.value.trim();
  const priority = prioritySelect.value;

  if (text === "") return;

    const task = {
    id: crypto.randomUUID ? crypto.randomUUID() : String(Date.now()),
    text,
    priority,
  };

  tasks.push(task);
  saveTasks();

  const card = document.createElement("article");
  card.className = "task-card";
  card.dataset.id = task.id;

  const h3 = document.createElement("h3");
  h3.textContent = task.text;

  const meta = document.createElement("div");
  meta.className = "task-meta";

  const tag = document.createElement("span");
  tag.className = `tag priority ${priority}`;
  tag.textContent =
    priority === "high" ? "Alta" : priority === "medium" ? "Media" : "Baja";

  const delBtn = document.createElement("button");
  delBtn.className = "task-delete";
  delBtn.type = "button";
  delBtn.textContent = "Eliminar";

  delBtn.addEventListener("click", () => {
    tasks = tasks.filter(t => t.id !== task.id);
    saveTasks();
    card.remove();
    });

  meta.appendChild(tag);
  meta.appendChild(delBtn);
  card.appendChild(h3);
  card.appendChild(meta);

  list.appendChild(card);
  applyFilter();

  input.value = "";
  input.focus();
});

loadTasks();

function applyFilter() {
  const q = search.value.trim().toLowerCase();

  for (const card of list.querySelectorAll(".task-card")) {
    const text = card.querySelector("h3")?.textContent.toLowerCase() || "";
    card.style.display = text.includes(q) ? "" : "none";
  }
}
for (const task of tasks) {
  const card = document.createElement("article");
  card.className = "task-card";
  card.dataset.id = task.id;

  const h3 = document.createElement("h3");
  h3.textContent = task.text;

  const meta = document.createElement("div");
  meta.className = "task-meta";

  const tag = document.createElement("span");
  tag.className = `tag priority ${task.priority}`;
  tag.textContent =
    task.priority === "high" ? "Alta" : task.priority === "medium" ? "Media" : "Baja";

  const delBtn = document.createElement("button");
  delBtn.className = "task-delete";
  delBtn.type = "button";
  delBtn.textContent = "Eliminar";

  delBtn.addEventListener("click", () => {
    tasks = tasks.filter(t => t.id !== task.id);
    saveTasks();
    card.remove();
  });

  meta.appendChild(tag);
  meta.appendChild(delBtn);
  card.appendChild(h3);
  card.appendChild(meta);

  list.appendChild(card);
}

search.addEventListener("input", applyFilter);