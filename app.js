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
 * Carga las tareas persistidas desde `localStorage` (clave `STORAGE_KEY`) y
 * sincroniza la variable global `tasks`.
 *
 * @returns {void} No devuelve ningún valor; actualiza `tasks` en memoria.
 *
 * @throws {never} No propaga errores. Si no hay datos, el JSON es inválido o el
 * valor almacenado no es un array, registra el error en consola y deja `tasks`
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

/**
 * Manejador del evento submit del formulario de tareas.
 * Valida la entrada, previene duplicados y agrega la tarea si es válida.
 */
form.addEventListener("submit", (e) => {
  e.preventDefault(); // Previene el recargo de la página al enviar el formulario

  // Obtiene el valor ingresado por el usuario y elimina espacios al inicio/final
  const text = input.value.trim();

  // Validación: El texto no puede estar vacío
  if (!text) {
    // Enfoca el input si está vacío para avisar visualmente al usuario
    input.focus();
    return;
  }

  // Obtiene la prioridad seleccionada
  const priority = prioritySelect.value;

  // Validación: La prioridad debe ser una de las permitidas
  if (!priority || !["high", "medium", "low"].includes(priority)) {
    alert("Por favor selecciona una prioridad válida.");
    prioritySelect.focus();
    return;
  }

  // Crea el objeto tarea con un ID único
  const task = {
    id: typeof crypto !== "undefined" && crypto.randomUUID ? crypto.randomUUID() : String(Date.now()),
    text: text,
    priority: priority,
  };

  // Validación: Evita el registro de tareas duplicadas exactamente iguales
  if (tasks.some(t => t.text === task.text && t.priority === task.priority)) {
    alert("La tarea ya existe con la misma prioridad.");
    input.focus();
    return;
  }

  // Agrega la tarea a la lista en memoria
  tasks.push(task);
  // Persiste la nueva lista de tareas en el almacenamiento
  saveTasks();
  // Muestra la nueva tarea en la interfaz
  createTaskCard(task);
  // Vuelve a aplicar el filtro actual de búsqueda
  applyFilter();

  // Limpia el campo de entrada y lo enfoca para permitir añadir otra tarea
  input.value = "";
  input.focus();
});

loadTasks();

/**
 * Aplica el filtro de búsqueda a las tareas mostradas en la lista.
 * Oculta aquellas que no coinciden con el texto ingresado en el campo de búsqueda.
 */
function applyFilter() {
  // Obtiene y normaliza el valor de búsqueda: quita espacios y convierte a minúsculas.
  const q = search.value.trim().toLowerCase();

  // Recorre todas las tarjetas de tarea existentes en la lista.
  for (const card of list.children) {
    // Extrae el texto del título (h3) y lo transforma a minúsculas para comparaciones insensibles a mayúsculas/minúsculas.
    const text = card.querySelector("h3")?.textContent.toLowerCase() || "";

    // Si el texto del título contiene la cadena de búsqueda, muestra la tarjeta;
    // de lo contrario, la oculta.
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

