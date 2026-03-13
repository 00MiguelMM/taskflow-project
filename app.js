// app.js

const STORAGE_KEY = "taskflow_tasks_v1";
let tasks = [];

function saveTasks() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
/**
 * Guarda la lista de tareas en localStorage.
 * Serializa el array de tareas como JSON.
 * @function saveTasks
 */
function saveTasks() {
  try {
    // Guardar las tareas en localStorage
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  } catch (error) {
    // Manejo básico de errores al intentar guardar
    console.error("Error saving tasks to localStorage:", error);
  }
}


/**
 * Carga las tareas almacenadas desde localStorage.
 * Si no hay datos, inicializa la lista de tareas como un array vacío.
 * Maneja errores básicos al intentar convertir los datos desde JSON.
 */
/**
 * Loads the task list from localStorage.
 * Initializes as an empty array if no valid data is found or errors occur.
 * Ensures the parsed data is always an array.
 */
function loadTasks() {
  const stored = localStorage.getItem(STORAGE_KEY);

  if (!stored) {
    tasks = [];
    return;
  }

  try {
    const parsed = JSON.parse(stored);
    tasks = Array.isArray(parsed) ? parsed : [];
  } catch (err) {
    console.error("Error parsing stored tasks:", err);
    tasks = [];
  }
}

const form = document.getElementById("task-form");
const input = document.getElementById("task-input");
const prioritySelect = document.getElementById("task-priority");
const list = document.getElementById("task-list");
const search = document.getElementById("task-search");

function createTaskCard(task) {
  const card = document.createElement("article");
  card.className = "flex items-center justify-between bg-slate-100 dark:bg-slate-700 p-3 rounded mb-2";
  card.dataset.id = task.id;

  const h3 = document.createElement("h3");
  h3.textContent = task.text;

  const meta = document.createElement("div");
  meta.className = "flex items-center gap-3";

  const tag = document.createElement("span");
  tag.className =
    task.priority === "high"
      ? "bg-red-500 text-white px-2 py-1 rounded text-xs"
      : task.priority === "medium"
      ? "bg-yellow-400 text-black px-2 py-1 rounded text-xs"
      : "bg-green-500 text-white px-2 py-1 rounded text-xs";

  tag.textContent =
    task.priority === "high" ? "Alta" : task.priority === "medium" ? "Media" : "Baja";

  const delBtn = document.createElement("button");
  delBtn.className = "text-red-500 hover:text-red-700 font-medium";
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
  createTaskCard(task);
  applyFilter();

  input.value = "";
  input.focus();
});

loadTasks();

function applyFilter() {
  const q = search.value.trim().toLowerCase();

  for (const card of list.children) {
    const text = card.querySelector("h3")?.textContent.toLowerCase() || "";
    card.style.display = text.includes(q) ? "" : "none";
  }
}

for (const task of tasks) {
  createTaskCard(task);
}

search.addEventListener("input", applyFilter);

// Botón para cambiar entre modo claro y oscuro
const toggle = document.getElementById("theme-toggle");

if (toggle) {
  toggle.addEventListener("click", () => {
    document.documentElement.classList.toggle("dark");
  });
}

