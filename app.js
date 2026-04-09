// app.js

import { getTasks, createTask, deleteTask } from "./frontend-api/client.js";

let tasks = [];
let summaryFilter = "all";

/**
 * Carga las tareas persistidas desde la API y
 * sincroniza la variable global tasks.
 *
 * @returns {void} No devuelve ningún valor; actualiza tasks en memoria.
 *
 * @throws {never} No propaga errores. Si no hay datos, el JSON es inválido o el
 * valor recibido no es un array, registra el error en consola y deja tasks
 * como un array vacío.
 */
async function loadTasks() {
  try {
    setNetworkStatus("Cargando tareas...", "loading");

    const response = await getTasks();

    setNetworkStatus("Tareas cargadas correctamente.", "success");

    const data = Array.isArray(response)
      ? response
      : Array.isArray(response?.data)
      ? response.data
      : Array.isArray(response?.tasks)
      ? response.tasks
      : [];

    const priorityMap = {
      1: "high",
      2: "medium",
      3: "low",
      high: "high",
      medium: "medium",
      low: "low",
    };

    tasks = data.map((task) => ({
      id: task.id,
      text: task.titulo ?? task.text ?? "",
      priority: priorityMap[task.prioridad] || "low",
      category: task.categoria ?? task.category ?? "Sin categoría",
      date: task.fecha ?? task.date ?? "",
      completed: task.completada ?? task.completed ?? false,
      createdAt: task.createdAt ?? task.creadaEn ?? Date.now(),
    }));

    renderTasks();

  } catch (error) {
    console.error("Error al cargar tareas desde la API:", error);

    setNetworkStatus("Error al cargar tareas.", "error");

    tasks = [];
    renderTasks();
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
const networkStatus = document.getElementById("network-status");

function setNetworkStatus(message, type = "") {
  if (!networkStatus) return;

  networkStatus.textContent = message;

  // limpiar clases anteriores
  networkStatus.className = "mb-4 text-sm font-medium";

  if (type === "loading") {
    networkStatus.classList.add("text-blue-500");
  } else if (type === "success") {
    networkStatus.classList.add("text-green-500");
  } else if (type === "error") {
    networkStatus.classList.add("text-red-500");
  } else {
    networkStatus.classList.add("text-slate-700");
  }
}

/**
 * Crea y añade al DOM una tarjeta visual para representar una tarea.
 * La apariencia del tag de prioridad se determina dinámicamente según la prioridad de la tarea.
 *
 * @param {Object} task - Objeto que representa la tarea.
 * @param {string|number} task.id - Identificador único de la tarea.
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
  card.className =
    "flex items-center justify-between p-3 rounded mb-2 transition-all duration-300 opacity-0 translate-y-2 border";
  card.dataset.id = String(task.id);

  const isDarkMode = document.documentElement.classList.contains("dark");

  if (task.date) {
    const today = new Date();
    const dueDate = new Date(`${task.date}T00:00:00`);

    today.setHours(0, 0, 0, 0);
    dueDate.setHours(0, 0, 0, 0);

    const diffTime = dueDate - today;
    const diffDays = diffTime / (1000 * 60 * 60 * 24);

    card.style.borderWidth = "2px";

    if (diffDays < 0) {
      card.style.backgroundColor = isDarkMode ? "#3f1d1d" : "#fee2e2";
      card.style.borderColor = "#ef4444";
    } else if (diffDays <= 2) {
      card.style.backgroundColor = isDarkMode ? "#3a2a12" : "#fef3c7";
      card.style.borderColor = "#f59e0b";
    } else {
      card.style.backgroundColor = isDarkMode ? "#1e293b" : "#f1f5f9";
      card.style.borderColor = isDarkMode ? "#475569" : "#cbd5e1";
    }
  } else {
    card.style.backgroundColor = isDarkMode ? "#1e293b" : "#f1f5f9";
    card.style.borderColor = isDarkMode ? "#475569" : "#cbd5e1";
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
  categoryTag.className =
    "bg-blue-200 text-slate-800 px-2 py-1 rounded text-xs";
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
    alert("La edición aún no está conectada al backend.");
  });

  checkbox.addEventListener("change", () => {
    alert("Marcar tareas como completadas aún no está conectado al backend.");
    checkbox.checked = task.completed;
  });

  deleteButton.addEventListener("click", async () => {
    try {
      await deleteTask(task.id);
      await loadTasks();
    } catch (error) {
      console.error("Error al eliminar tarea:", error);
      alert("No se pudo eliminar la tarea.");
    }
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
    const task = tasks.find((t) => String(t.id) === String(taskId));

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
      matchesText && matchesCategory && matchesStatus && matchesSummary
        ? ""
        : "none";
  }
}

/**
 * Manejador del evento submit del formulario de tareas.
 * Valida la entrada, previene duplicados y agrega la tarea si es válida.
 */
form.addEventListener("submit", async (e) => {
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

  if (tasks.some((t) => t.text === text && t.priority === priority)) {
    alert("La tarea ya existe con la misma prioridad.");
    input.focus();
    return;
  }

  const priorityMap = {
    high: 1,
    medium: 2,
    low: 3,
  };

  try {
    setNetworkStatus("Guardando tarea...", "loading");

    await createTask({
      titulo: text,
      prioridad: priorityMap[priority],
      categoria: category,
      fecha: date,
    });

    await loadTasks();

    setNetworkStatus("Tarea creada correctamente.", "success");

    input.value = "";
    dateInput.value = "";
    prioritySelect.value = "medium";
    categorySelect.value = "Trabajo";
    input.focus();

    } catch (error) {
    setNetworkStatus("No se pudo crear la tarea.", "error");
    console.error("No se pudo crear la tarea:", error);
  }
});

loadTasks();

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
  alert("Borrar tareas realizadas aún no está conectado al backend.");
});

// Botón para cambiar entre modo claro y oscuro
const toggle = document.getElementById("theme-toggle");

function updateThemeIcon() {
  if (!toggle) return;

  if (document.documentElement.classList.contains("dark")) {
    toggle.textContent = "☀️";
  } else {
    toggle.textContent = "🌙";
  }
}

if (toggle) {
  toggle.addEventListener("click", () => {
    document.documentElement.classList.toggle("dark");
    updateThemeIcon();
    renderTasks();
  });

  // establecer icono correcto al cargar
  updateThemeIcon();
}