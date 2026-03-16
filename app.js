// app.js

const STORAGE_KEY = "taskflow_tasks_v1";
let tasks = [];

/**
 * Guarda la lista de tareas en localStorage.
 * Serializa el array de tareas como JSON.
 */
function saveTasks() {
  const serializedTasks = JSON.stringify(tasks);

  try {
    localStorage.setItem(STORAGE_KEY, serializedTasks);
  } catch (error) {
    console.error("Error saving tasks to localStorage:", error);
  }
}

/**
 * Carga las tareas persistidas desde localStorage (clave STORAGE_KEY) y
 * sincroniza la variable global tasks.
 *
 * @returns {void} No devuelve ningún valor; actualiza tasks en memoria.
 *
 * @throws {never} No propaga errores. Si no hay datos, el JSON es inválido o el
 * valor almacenado no es un array, registra el error en consola y deja tasks
 * como un array vacío.
 */
function loadTasks() {
  const stored = localStorage.getItem(STORAGE_KEY);

  if (!stored) {
    tasks = [];
    return;
  }

  try {
    const parsed = JSON.parse(stored);
    tasks = Array.isArray(parsed)
      ? parsed.map((task) => ({
          ...task,
          completed: task.completed ?? false,
        }))
      : [];
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
 * @param {boolean} task.completed - Indica si la tarea está completada.
 */
function createTaskCard(task) {
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
    },
  };

  const card = document.createElement("article");
  card.className = "flex items-center justify-between bg-slate-100 dark:bg-slate-700 p-3 rounded mb-2 transition-all duration-1000 opacity-0 translate-y-10";
  card.dataset.id = task.id;

  const leftSide = document.createElement("div");
  leftSide.className = "flex items-center gap-2";

  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.checked = task.completed;
  checkbox.className = "mr-2";

  const title = document.createElement("h3");
  title.textContent = task.text;
  title.className = "cursor-pointer";
  title.title = "Haz doble clic para editar";
  title.addEventListener("dblclick", () => {
  const newText = prompt("Editar tarea", task.text);
  if (newText !== null && newText.trim() !== "") {
    task.text = newText.trim();
    title.textContent = task.text;
    saveTasks();
  }
});

  if (task.completed) {
    title.style.textDecoration = "line-through";
    title.style.opacity = "0.6";
  }

  const metaBar = document.createElement("div");
  metaBar.className = "flex items-center gap-3";

  const priority = PRIORITY_CONFIG[task.priority] || PRIORITY_CONFIG.low;
  const priorityTag = document.createElement("span");
  priorityTag.className = priority.class;
  priorityTag.textContent = priority.label;

  const deleteButton = document.createElement("button");
  deleteButton.className = "text-red-500 hover:text-red-700 font-medium";
  deleteButton.type = "button";
  deleteButton.textContent = "Eliminar";

  checkbox.addEventListener("change", () => {
    task.completed = checkbox.checked;

    if (task.completed) {
      title.style.textDecoration = "line-through";
      title.style.opacity = "0.6";
    } else {
      title.style.textDecoration = "none";
      title.style.opacity = "1";
    }

    saveTasks();
  });

  deleteButton.addEventListener("click", () => {
    tasks = tasks.filter((t) => t.id !== task.id);
    saveTasks();
  
    card.classList.add("opacity-0", "translate-y-2");
  
    setTimeout(() => {
      card.remove();
    }, 300);
  });

  leftSide.appendChild(checkbox);
  leftSide.appendChild(title);

  metaBar.appendChild(priorityTag);
  metaBar.appendChild(deleteButton);

  card.appendChild(leftSide);
  card.appendChild(metaBar);

  list.appendChild(card);
  requestAnimationFrame(() => {
    card.classList.remove("opacity-0", "translate-y-2");
  });
}

/**
 * Aplica el filtro de búsqueda a las tareas mostradas en la lista.
 * Oculta aquellas que no coinciden con el texto ingresado en el campo de búsqueda.
 */
function applyFilter() {
  const q = search.value.trim().toLowerCase();

  for (const card of list.children) {
    const text = card.querySelector("h3")?.textContent.toLowerCase() || "";
    card.style.display = text.includes(q) ? "" : "none";
  }
}

/**
 * Manejador del evento submit del formulario de tareas.
 * Valida la entrada, previene duplicados y agrega la tarea si es válida.
 */
form.addEventListener("submit", (e) => {
  e.preventDefault();

  const text = input.value.trim();

  if (!text) {
    input.focus();
    return;
  }

  const priority = prioritySelect.value;

  if (!priority || !["high", "medium", "low"].includes(priority)) {
    alert("Por favor selecciona una prioridad válida.");
    prioritySelect.focus();
    return;
  }

  const task = {
    id:
      typeof crypto !== "undefined" && crypto.randomUUID
        ? crypto.randomUUID()
        : String(Date.now()),
    text: text,
    priority: priority,
    completed: false,
  };

  if (tasks.some((t) => t.text === task.text && t.priority === task.priority)) {
    alert("La tarea ya existe con la misma prioridad.");
    input.focus();
    return;
  }

  tasks.push(task);
  saveTasks();
  createTaskCard(task);
  applyFilter();

  input.value = "";
  input.focus();
});

loadTasks();

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