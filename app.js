// app.js

const STORAGE_KEY = "taskflow_tasks_v1";
let tasks = [];

function saveTasks() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
/**
 * Guarda la lista de tareas en localStorage.
 * Serializa el array de tareas como JSON.
 */
function saveTasks() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  } catch (error) {
    console.error("Error saving tasks to localStorage:", error);
  }
}


/**
 * Carga las tareas guardadas desde localStorage.
 * Si no hay datos válidos o se produce un error, inicializa un array vacío.
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

/**
 * Crea y añade al DOM una tarjeta visual para representar una tarea.
 * La apariencia del tag de prioridad se determina dinámicamente según la prioridad de la tarea.
 *
 * @param {Object} task - Objeto que representa la tarea.
 * @param {string} task.id - Identificador único de la tarea.
 * @param {string} task.text - Descripción de la tarea.
 * @param {string} task.priority - Prioridad de la tarea: "high", "medium" o "low".
 */
function createTaskCard(task) {
  // Configuración visual y etiqueta por nivel de prioridad
  const PRIORITY_CONFIG = {
    high: {
      class: "bg-red-500 text-white px-2 py-1 rounded text-xs",
      label: "Alta",
    },
    medium: {
      class: "bg-yellow-400 text-black px-2 py-1 rounded text-xs",
      label: "Media",
    },
    low: {
      class: "bg-green-500 text-white px-2 py-1 rounded text-xs",
      label: "Baja",
    }
  };

  // Contenedor principal de la tarjeta
  const card = document.createElement("article");
  card.className = "flex items-center justify-between bg-slate-100 dark:bg-slate-700 p-3 rounded mb-2";
  card.dataset.id = task.id;

  // Título/descripción de la tarea
  const title = document.createElement("h3");
  title.textContent = task.text;

  // Barra para mostrar meta-información (prioridad y botón eliminar)
  const metaBar = document.createElement("div");
  metaBar.className = "flex items-center gap-3";

  // Configuración del tag de prioridad basada en la prioridad de la tarea
  const priority = PRIORITY_CONFIG[task.priority] || PRIORITY_CONFIG.low;
  const priorityTag = document.createElement("span");
  priorityTag.className = priority.class;
  priorityTag.textContent = priority.label;

  // Botón para eliminar la tarea
  const deleteButton = document.createElement("button");
  deleteButton.className = "text-red-500 hover:text-red-700 font-medium";
  deleteButton.type = "button";
  deleteButton.textContent = "Eliminar";

  // Al hacer click en el botón, se elimina la tarea, se actualiza el storage y se quita la tarjeta del DOM
  deleteButton.addEventListener("click", () => {
    tasks = tasks.filter(t => t.id !== task.id);
    saveTasks();
    card.remove();
  });

  // Construcción y montaje de la tarjeta
  metaBar.appendChild(priorityTag);
  metaBar.appendChild(deleteButton);
  card.appendChild(title);
  card.appendChild(metaBar);
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

