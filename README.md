# Taskflow Project

Aplicación web de gestión de tareas desarrollada con:
- HTML
- CSS
- JavaScript
- LocalStorage
- Tailwind CSS

## Funcionalidades
- Añadir tareas
- Eliminar tareas
- Guardado automático con LocalStorage
- Modo claro / modo oscuro
- Interfaz responsive

## Demo
https://taskflow-project-weld.vercel.app

## Autor
Miguel Martínez Acevedo

# TaskFlow
TaskFlow es una aplicación web sencilla para gestionar tareas desde el navegador.  
Permite añadir, organizar y eliminar tareas de forma rápida, manteniendo la información guardada localmente para que no se pierda al recargar la página.

Este proyecto forma parte de una práctica del ciclo formativo de Desarrollo de Aplicaciones Multiplataforma (DAM) para aprender a crear aplicaciones web interactivas con JavaScript.

---

## Funcionalidades
La aplicación incluye las siguientes características:

- Añadir nuevas tareas
- Eliminar tareas existentes
- Asignar prioridad a las tareas (alta, media o baja)
- Añadir fechas límite
- Filtrar tareas mediante un buscador
- Recordatorios visuales para tareas próximas a vencer
- Persistencia de datos usando LocalStorage
- Interfaz dinámica que responde a las acciones del usuario

---

## Tecnologías utilizadas
Este proyecto está desarrollado con tecnologías web básicas:

- HTML5 → estructura de la página
- CSS / Tailwind → estilos visuales
- JavaScript → lógica de la aplicación
- LocalStorage → almacenamiento de tareas en el navegador

---

## Cómo usar la aplicación
1. Escribe una tarea en el campo de texto.
2. Selecciona la prioridad.
3. Añade una fecha límite si lo deseas.
4. Pulsa el botón **Añadir tarea**.

La tarea aparecerá automáticamente en la lista.

Cada tarea incluye:

- un botón para eliminarla
- una etiqueta de prioridad
- la fecha límite (si se ha añadido)

Las tareas se guardan automáticamente en el navegador.

---
## Ejemplo de uso
Ejemplo de tarea añadida:

Tarea: Terminar práctica de JavaScript
Prioridad: Alta
Fecha límite: 20/03/2026


Al recargar la página, la tarea seguirá apareciendo gracias al almacenamiento local.

---

## Estructura del proyecto
TaskFlow/
	├── index.html
	├── style.css
	├── app.js
	├── README.md
	└── docs/
		└── ai/
			├── ai-comparison.md
			├── cursor-workflow.md
			├── prompt-engineering.md
			├── experiments.md
			└── reflection.md


---

## Aprendizajes del proyecto
Durante este proyecto se han trabajado conceptos como:

- Manipulación del DOM
- Eventos en JavaScript
- Gestión de arrays y objetos
- Persistencia de datos con LocalStorage
- Mejora del código mediante refactorización
- Uso de asistentes de IA para desarrollo

---

## Posibles mejoras futuras
Algunas mejoras que podrían añadirse en el futuro son:

- edición de tareas
- categorías de tareas
- modo oscuro
- sincronización en la nube
- aplicación responsive para móviles

---

## Autor
Proyecto realizado como práctica académica dentro del ciclo DAM.

## Documentación de funciones del proyecto

```javascript
/**
 * Guarda las tareas en el almacenamiento local del navegador.
 * Convierte el array de tareas en JSON antes de almacenarlo.
 */
function saveTasks() {
  const serializedTasks = JSON.stringify(tasks);
  localStorage.setItem(STORAGE_KEY, serializedTasks);
}
```

```javascript
/**
 * Carga las tareas guardadas desde LocalStorage cuando la aplicación se inicia.
 * Si existen tareas guardadas, las convierte nuevamente a objetos JavaScript.
 */
function loadTasks() {
  const savedTasks = localStorage.getItem(STORAGE_KEY);

  if (savedTasks) {
    tasks = JSON.parse(savedTasks);
  }
}
```

```javascript
/**
 * Crea visualmente una tarjeta de tarea en la interfaz.
 * @param {Object} task - Objeto que representa una tarea
 * @param {string} task.text - Texto de la tarea
 * @param {string} task.priority - Prioridad de la tarea
 * @param {string} task.dueDate - Fecha límite
 */
function createTaskCard(task) {
  // código de creación de la tarea
}
```