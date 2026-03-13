# FLUJO DE TRABAJO CON CURSOR
## INTRODUCCIÓN
En este archivo voy a documentar mi experiencia utilizando Cursor como entorno de desarrollo asistido por inteligencia artificial dentro del proyecto TaskFlow.

## Prueba de autocompletado
Añadí el siguiente comentario, y acto seguido utilicé el atajo de teclado "ctrl+K": // función que recibe un array de números y devuelve el número mayor
A partir de esa descripción, Cursor generó automáticamente la siguiente función en JavaScript:

```javascript
function obtenerNumeroMayor(arr) {
  return Math.max(...arr);
}
```
## Utiliza el chat contextual para pedir explicaciones de partes del código
### Código sugerido
```javascript
function loadTasks() {
  const raw = localStorage.getItem(STORAGE_KEY);
  tasks = raw ? JSON.parse(raw) : [];
}
```
### Explicación del código por parte de Cursor
// Esta función carga las tareas almacenadas en el localStorage usando la clave definida por STORAGE_KEY.
// Recupera los datos almacenados (si existen), los convierte de texto JSON a un arreglo de objetos (tareas)
// y los asigna a la variable global 'tasks'. Si no hay datos guardados, simplemente asigna un arreglo vacío.

## Utiliza la edición inline para modificar funciones existentes
### Función que escogí
```javascript
function loadTasks() {
  const raw = localStorage.getItem(STORAGE_KEY);
  ```
  ### Modificación que le pedí a Cursor
  // Convertir el texto JSON en un array de tareas

  ### Código modificado tras mi petición
  ```javascript
  if (raw) {
    try {
      const parsed = JSON.parse(raw);
      tasks = Array.isArray(parsed) ? parsed : [];
    } catch (e) {
      tasks = [];
    }
  } else {
    tasks = [];
  }
}
```
## Prueba Composer para generar cambios que afecten a varios archivos

También probé la herramienta **Composer** de Cursor, que permite generar cambios que afectan a varios archivos del proyecto al mismo tiempo.

Utilicé el chat de Cursor en modo Composer y pedí una mejora para la aplicación TaskFlow. El asistente analizó la estructura del proyecto y propuso añadir una nueva funcionalidad: marcar tareas como completadas y aplicar filtros por estado.

Cursor sugirió modificaciones en varios archivos del proyecto, entre ellos:

- `index.html` para añadir controles de filtrado.
- `app.js` para extender el modelo de datos de las tareas con una propiedad `completed`.
- `styles.css` o estilos de Tailwind para mostrar visualmente las tareas completadas.
- `README.md` para actualizar la documentación del proyecto.

Este ejemplo muestra cómo Composer puede analizar el proyecto completo y proponer cambios coordinados en diferentes archivos.

## Atajos de teclado utilizados
Durante el uso de Cursor utilicé algunos atajos de teclado que facilitan trabajar con el asistente de inteligencia artificial:

- Ctrl + K: permite editar o modificar el código seleccionado utilizando instrucciones en lenguaje natural.
- Ctrl + L: abre el chat integrado de Cursor para interactuar con el asistente.
- Ctrl + P: permite buscar rápidamente archivos dentro del proyecto.

## Mejora de código con IA
Probé la función de edición asistida de Cursor seleccionando una función del archivo app.js y usando el atajo "Ctrl + K".

En segundo lugar, le pedí que mejorara el código y añadiera comentarios para entenderlo mejor. Cursor generó una nueva versión de la función con comentarios explicando qué hace cada parte del código:
- Ejemplo: añadió comentarios que explican para qué sirve la función, qué parámetros recibe y qué hace cada paso del proceso. También explicó partes como la creación de elementos del DOM, la asignación de clases para los estilos y el evento que permite eliminar una tarea.

Gracias a estos comentarios es mucho más fácil entender lo que hace el código.

A continuación se muestra un ejemplo de una función del proyecto `TaskFlow` después de pedir a Cursor que añadiera comentarios para mejorar la comprensión del código:

## Ejemplo 1 de código mejorado por Cursor
```javascript
/**
 * Crea una tarjeta visual para la tarea y la añade al DOM.
 * @param {Object} task - La tarea para mostrar.
 * @param {string} task.id - Identificador único de la tarea.
 * @param {string} task.text - Descripción de la tarea.
 * @param {string} task.priority - Prioridad de la tarea ('high', 'medium', 'low').
 */
function createTaskCard(task) {
  // Crear el contenedor principal de la tarjeta
  const card = document.createElement("article");

  // Asignar clases de Tailwind para estilo visual
  card.className = "flex items-center justify-between bg-slate-100 dark:bg-slate-700 p-3 rounded mb-2";

  // Guardar el id de la tarea en el dataset del elemento
  card.dataset.id = task.id;

  // Crear el título de la tarea
  const h3 = document.createElement("h3");
  h3.textContent = task.text;

  // Contenedor para prioridad y acciones
  const meta = document.createElement("div");
  meta.className = "flex items-center gap-3";

  // Crear un indicador visual de prioridad
  const tag = document.createElement("span");
  ...
}
```
En este caso, Cursor añadió comentarios explicativos y documentación de parámetros que facilitan la comprensión de la función.

### Ejemplo 2 de código mejorado por Cursor
```javascript
form.addEventListener("submit", (e) => {
  // Evita que la página se recargue al enviar el formulario
  e.preventDefault();

  // Obtiene y limpia el texto de la tarea ingresada por el usuario
  const text = input.value.trim();

  // Obtiene el valor de prioridad seleccionada
  const priority = prioritySelect.value;

  // Si el campo de texto está vacío, no añade ninguna tarea
  if (text === "") return;

  // Crea un objeto para la nueva tarea con un identificador único,
  // el texto de la tarea y la prioridad seleccionada
  const task = {
    id: (typeof crypto.randomUUID === "function") 
          ? crypto.randomUUID()               // Usa crypto.randomUUID si está disponible
          : String(Date.now()),               // Fallback: usa marca de tiempo como ID único
    text: text,
    priority: priority,
  };
  ```