// app.js

const STORAGE_KEY = "taskflow_tasks_v1";
let tasks = [];
let summaryFilter = "all";


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
const dateInput = document.getElementById("task-date");
const prioritySelect = document.getElementById("task-priority");
const categorySelect = document.getElementById("task-category");
const list = document.getElementById("task-list");
const search = document.getElementById("task-search");
const filterCategory = document.getElementById("filter-category");
const filterStatus = document.getElementById("filter-status");
const clearCompletedButton = document.getElementById("clear-completed");
const summaryButtons = document.querySelectorAll(".summary-btn");
const sortAge = document.getElementById("sort-age");

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
  card.className = "flex items-center justify-between p-3 rounded mb-2 transition-all duration-1000 opacity-0 translate-y-10 border";
  card.dataset.id = task.id;
  if (task.date) {
    const today = new Date();
    const dueDate = new Date(`${task.date}T00:00:00`);
  
    today.setHours(0, 0, 0, 0);
    dueDate.setHours(0, 0, 0, 0);
  
    const diffTime = dueDate - today;
    const diffDays = diffTime / (1000 * 60 * 60 * 24);
  
    card.style.borderWidth = "2px";
  
    if (diffDays < 0) {
      card.style.backgroundColor = "#fee2e2";
      card.style.borderColor = "#ef4444";
    } else if (diffDays <= 2) {
      card.style.backgroundColor = "#fef3c7";
      card.style.borderColor = "#f59e0b";
    } else {
      card.style.backgroundColor = "#f1f5f9";
      card.style.borderColor = "#cbd5e1";
    }
  } else {
    card.style.backgroundColor = "#f1f5f9";
    card.style.borderColor = "#cbd5e1";
    card.style.borderWidth = "1px";
  }

  const leftSide = document.createElement("div");
  leftSide.className = "flex items-center gap-2";

  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.checked = task.completed;
  checkbox.className = "mr-2";

  const title = document.createElement("h3");
title.textContent = task.text;

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
  const categoryTag = document.createElement("span");
  categoryTag.className = "bg-blue-200 text-slate-800 px-2 py-1 rounded text-xs";
  categoryTag.textContent = task.category || "Sin categoría";

  const deleteButton = document.createElement("button");
  deleteButton.className = "text-red-500 hover:text-red-700 font-medium";
  deleteButton.type = "button";
  deleteButton.textContent = "Eliminar";

  const editButton = document.createElement("button");
    editButton.type = "button";
    editButton.textContent = "✏️";
    editButton.className = "text-slate-600 hover:text-blue-600 text-lg";

    editButton.addEventListener("click", () => {
  const newText = prompt("Editar tarea", task.text);

  if (newText !== null && newText.trim() !== "") {
    task.text = newText.trim();
    saveTasks();
    renderTasks();
  }
});

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
    renderTasks();
  });

  deleteButton.addEventListener("click", () => {
    tasks = tasks.filter((t) => t.id !== task.id);
    saveTasks();
  
    card.classList.add("opacity-0", "translate-y-2");
  
  editButton.addEventListener("click", () => {
  const newText = prompt("Editar tarea", task.text);

  if (newText !== null && newText.trim() !== "") {
    task.text = newText.trim();
    saveTasks();
    renderTasks();
  }
});

    setTimeout(() => {
      card.remove();
    }, 300);
  });

  leftSide.appendChild(checkbox);
  leftSide.appendChild(title);

  metaBar.appendChild(priorityTag);
  metaBar.appendChild(categoryTag);
  metaBar.appendChild(editButton);
  metaBar.appendChild(deleteButton);

  card.appendChild(leftSide);
  card.appendChild(metaBar);

  list.appendChild(card);
  requestAnimationFrame(() => {
    card.classList.remove("opacity-0", "translate-y-2");
  });
}

function renderTasks() {
  list.innerHTML = "";

  const sortedTasks = sortTasksByAge(tasks);

  for (const task of sortedTasks) {
    createTaskCard(task);
  }

  updateSummary();
  applyFilter();
}

function sortTasksByAge(tasksArray) {
  if (!sortAge) return tasksArray;

  const sorted = [...tasksArray];

  if (sortAge.value === "newest") {
    sorted.sort((a, b) => b.createdAt - a.createdAt);
  } else if (sortAge.value === "oldest") {
    sorted.sort((a, b) => a.createdAt - b.createdAt);
  }

  return sorted;
}

function updateSummary() {
  const totalTasks = document.getElementById("total-tasks");
  const pendingTasks = document.getElementById("pending-tasks");
  const completedTasks = document.getElementById("completed-tasks");

  const total = tasks.length;
  const completed = tasks.filter((task) => task.completed).length;
  const pending = total - completed;

  totalTasks.textContent = total;
  pendingTasks.textContent = pending;
  completedTasks.textContent = completed;
}

/**
 * Aplica el filtro de búsqueda a las tareas mostradas en la lista.
 * Oculta aquellas que no coinciden con el texto ingresado en el campo de búsqueda.
 */
function applyFilter() {
  const q = search.value.trim().toLowerCase();
  const selectedCategory = filterCategory.value;
  const selectedStatus = filterStatus.value;

  for (const card of list.children) {
    const text = card.querySelector("h3")?.textContent.toLowerCase() || "";
    const taskId = card.dataset.id;
    const task = tasks.find((t) => t.id === taskId);

    if (!task) {
      card.style.display = "none";
      continue;
    }

    const matchesText = text.includes(q);
    const matchesCategory =
      selectedCategory === "all" || task.category === selectedCategory;
    const matchesStatus =
      selectedStatus === "all" ||
      (selectedStatus === "completed" && task.completed) ||
      (selectedStatus === "pending" && !task.completed);
    
    const matchesSummary =
      summaryFilter === "all" ||
      (summaryFilter === "completed" && task.completed) ||
      (summaryFilter === "pending" && !task.completed);

    card.style.display =
      matchesText && matchesCategory && matchesStatus && matchesSummary ? "" : "none";
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
  const category = categorySelect.value;
  const date = dateInput.value;

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
    category: category,
    date: date,
    completed: false,
    createdAt: Date.now(),
  };

  if (tasks.some((t) => t.text === task.text && t.priority === task.priority)) {
    alert("La tarea ya existe con la misma prioridad.");
    input.focus();
    return;
  }

  tasks.push(task);

  tasks.sort((a, b) => {
    const order = { high: 1, medium: 2, low: 3 };
  
    if (order[a.priority] !== order[b.priority]) {
      return order[a.priority] - order[b.priority];
    }
  
    return b.createdAt - a.createdAt;
  });
  
 saveTasks();
renderTasks();

  input.value = "";
  input.focus();
});

loadTasks();

tasks.sort((a, b) => {
  const order = { high: 1, medium: 2, low: 3 };
  if (order[a.priority] !== order[b.priority]) {
    return order[a.priority] - order[b.priority];
  }
  return b.createdAt - a.createdAt;
});

renderTasks();

search.addEventListener("input", applyFilter);
filterCategory.addEventListener("change", applyFilter);
filterStatus.addEventListener("change", applyFilter);
sortAge.addEventListener("change", renderTasks);

summaryButtons.forEach((button) => {
  button.addEventListener("click", () => {
    summaryFilter = button.dataset.filter;

    // quitar estilo activo a todos
    summaryButtons.forEach((btn) => {
      btn.classList.remove("bg-blue-600", "text-white");
      btn.classList.add("bg-slate-100");
    });

    // añadir estilo activo al pulsado
    button.classList.remove("bg-slate-100");
    button.classList.add("bg-blue-600", "text-white");

    applyFilter();
  });
});

clearCompletedButton.addEventListener("click", () => {
  const completedTasks = tasks.filter((task) => task.completed);

  if (completedTasks.length === 0) {
    alert("No hay tareas realizadas para borrar.");
    return;
  }

  const confirmed = confirm("¿Seguro que quieres borrar todas las tareas realizadas?");

  if (!confirmed) {
    return;
  }

  tasks = tasks.filter((task) => !task.completed);
  saveTasks();
  renderTasks();
});

// Botón para cambiar entre modo claro y oscuro
const toggle = document.getElementById("theme-toggle");

if (toggle) {
  toggle.addEventListener("click", () => {
    document.documentElement.classList.toggle("dark");
  });
}