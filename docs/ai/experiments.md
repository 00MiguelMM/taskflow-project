# EXPERIMENTOS CON IA EN PROGRAMACIÓN
## INTRODUCCIÓN
En este documento voy a registrar distintos experimentos realizados utilizando herramientas de inteligencia artificial, durante el desarrollo del proyecto TaskFlow. El objetivo es comparar cómo se resuelven ciertos problemas de programación con y sin asistencia de IA, analizando el tiempo invertido, la calidad del código y la comprensión del problema.

## Experimento: uso de servidores MCP en Cursor
Para esta parte de la práctica probé a conectar un servidor MCP en Cursor. Elegí `filesystem`, porque es el más sencillo para trabajar con los archivos del proyecto.

### Instalación
Lo configuré creando la carpeta `.cursor` en la raíz del proyecto y dentro el archivo `mcp.json`, donde añadí la configuración del servidor. Después recargué Cursor para que detectara el servidor MCP.

### Comprobación
Para comprobar que funcionaba, le formulé a la IA varias preguntas:

### Lee el archivo app.js y me explica para qué sirve
La respuesta mostró que podía acceder al archivo real del proyecto, porque identificó correctamente varias partes del código:
- el uso de `localStorage`
- la creación y eliminación de tareas
- el filtrado por búsqueda
- el modo oscuro
- y además detectó que había una duplicación en la función `saveTasks()`

### Analiza el archivo index.html y describe los elementos del formulario
Después le pedí a la IA que analizara el archivo `index.html` para ver si podía identificar los elementos que forman el formulario de la aplicación.

La IA detectó correctamente los tres elementos principales del formulario:

- un campo de texto (`input`) para escribir la tarea, con el id `task-input`
- un selector (`select`) para elegir la prioridad de la tarea, con el id `task-priority`
- un botón (`button`) de tipo `submit` para añadir la tarea

También identificó las distintas opciones de prioridad disponibles (Alta, Media y Baja).

### Busca en el proyecto dónde se usa localStorage
Después le pedí a la IA que buscara en el proyecto dónde se utilizaba localStorage.
La IA señaló exactamente dónde se usaba dentro del archiva app.js:
- Línea 7: localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
- Línea 14: localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
- Línea 16: console.error("Error saving tasks to localStorage:", error);
- Línea 26: const stored = localStorage.getItem(STORAGE_KEY);
- Además hay comentarios mencionando localStorage (líneas 9 y 22).

Y dentro del archivo docs/ai/cursor-workflow.md
- Línea 18: const raw = localStorage.getItem(STORAGE_KEY);
- Línea 23: Comentario explicando el uso de localStorage.
- Línea 31: Otro localStorage.getItem(STORAGE_KEY);

### Archivos JavaScript en tu proyecto
La cuarta consulta que le realicé a la IA fue que identificara los archivos JavaScript que hay en el proyecto.

Encontró dos archivos .js en taskflow-project:
- app.js
- tailwind.config.js

### Revisa el archivo styles.css y explica qué estilos afectan a las tareas
Por último le pedí a la IA que revisara el archivo `styles.css` para ver qué estilos afectan a la visualización de las tareas.

La IA explicó que en este proyecto no hay una clase específica para las tareas, sino que se utilizan muchas clases de Tailwind que luego se combinan en el HTML y en el JavaScript cuando se crean las tarjetas de tareas.

Entre los estilos que identificó destacan:

- clases de layout para organizar los elementos (como `flex`, `grid`, `gap`, etc.)
- estilos de contenedor y espaciado (`padding`, `margin`, `border`, `shadow`)
- colores de fondo que se usan para las tarjetas y prioridades
- estilos de texto como tamaño, color y peso de la fuente
- efectos de interacción como `hover` y `focus` en botones

Con esto pude comprobar que la IA también era capaz de analizar el archivo de estilos del proyecto y explicar cómo afectan al diseño de las tareas.

### ¿En qué casos puede ser útil MCP en proyectos reales?
MCP puede ser útil en proyectos reales porque permite que la inteligencia artificial tenga acceso directo a herramientas o información del propio proyecto.

Por ejemplo, la IA podría leer archivos del proyecto, revisar código, buscar dónde se usa una función o ayudar a entender partes del programa que no tenemos muy claras. También podría conectarse con repositorios de código, APIs o bases de datos.

Esto puede ayudar a los desarrolladores a trabajar más rápido y a entender mejor el código, sobre todo cuando el proyecto es grande o cuando estamos empezando y todavía no conocemos bien todo el proyecto.

# EXPERIMENTOS CON IA EN PROGRAMACIÓN

En esta sección realicé varios pequeños experimentos para comparar cómo se resuelven algunos problemas de programación sin usar inteligencia artificial y usando IA como ayuda. El objetivo es comparar el tiempo invertido, la calidad del código y la comprensión del problema.

---

## Experimento 1: filtrar números pares de un array

### Sin usar IA
Intenté resolver el problema por mi cuenta escribiendo una función en JavaScript que recorra un array y devuelva solo los números pares.

Código:

```javascript
function filtrarPares(arr) {
  return arr.filter(num => num % 2 === 0);
}
```

Tiempo aproximado: 5 minutos.

### Con ayuda de IA
Le pedí a la IA que generara una función que filtre números pares de un array.

Código generado:

```javascript
function filtrarPares(arr) {
  return arr.filter(num => num % 2 === 0);
}
```

Tiempo aproximado: 1 minuto.

### Comparación
- **Tiempo:** con IA fue bastante más rápido.
- **Calidad del código:** el resultado fue prácticamente el mismo.
- **Comprensión:** hacerlo sin IA ayuda más a entender cómo funciona la lógica.

---

## Experimento 2: calcular el promedio de un array

### Sin usar IA
Intenté resolverlo sumando todos los números del array y dividiendo entre la longitud del array.

Código:

```javascript
function calcularPromedio(arr) {
  let suma = 0;
  for (let num of arr) {
    suma += num;
  }
  return arr.length === 0 ? 0 : suma / arr.length;
}
```

Tiempo aproximado: 10 minutos.

### Con ayuda de IA
Le pedí a la IA que generara una función que calcule el promedio de un array de números.

Código generado:

```javascript
function calcularPromedio(arr) {
  if (arr.length === 0) return 0;
  const suma = arr.reduce((acc, num) => acc + num, 0);
  return suma / arr.length;
}
```

Tiempo aproximado: 1 minuto.

### Comparación
- **Tiempo:** con IA fue bastante más rápido.
- **Calidad del código:** la versión de IA es más compacta.
- **Comprensión:** hacerlo manualmente ayuda a entender mejor el proceso.

---

## Experimento 3: capitalizar palabras de una frase

### Sin usar IA
Intenté crear una función que convierta la primera letra de cada palabra en mayúscula.

Código:

```javascript
function capitalizar(frase) {
  return frase
    .split(" ")
    .map(p => p.charAt(0).toUpperCase() + p.slice(1).toLowerCase())
    .join(" ");
}
```

Tiempo aproximado: 10 minutos.

### Con ayuda de IA
Le pedí a la IA que generara una función que convierta la primera letra de cada palabra en mayúscula.

Código generado:

```javascript
function capitalizar(frase) {
  return frase
    .split(" ")
    .map(p => p[0].toUpperCase() + p.slice(1).toLowerCase())
    .join(" ");
}
```

Tiempo aproximado: 1 minuto.

### Comparación
- **Tiempo:** la IA resolvió el problema mucho más rápido.
- **Calidad del código:** ambos códigos son muy similares.
- **Comprensión:** hacerlo sin IA ayuda a practicar manipulación de strings.

---

# Experimentos relacionados con el proyecto TaskFlow

## Experimento 4: validación del formulario de tareas

### Sin usar IA
Revisé el código del formulario y añadí una validación para evitar que se creen tareas con el texto vacío.

Código:

```javascript
if (!text) {
  input.focus();
  return;
}
```

Tiempo aproximado: 5 minutos.

### Con ayuda de IA
Le pedí a la IA que sugiriera cómo validar el texto antes de crear una tarea.

Código generado:

```javascript
if (!text || text.trim() === "") {
  alert("La tarea no puede estar vacía");
  input.focus();
  return;
}
```

Tiempo aproximado: 1 minuto.

### Comparación
- **Tiempo:** con IA fue más rápido.
- **Calidad del código:** la IA añadió una validación extra.
- **Comprensión:** hacerlo manualmente ayuda a entender mejor el flujo del formulario.

---

## Experimento 5: refactorizar la función saveTasks()

### Sin usar IA
Intenté simplificar la función para que fuera más clara manteniendo la misma lógica.

Código:

```javascript
function saveTasks() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
}
```

Tiempo aproximado: 10 minutos.

### Con ayuda de IA
Le pedí a la IA que refactorizara la función para mejorar su claridad.

Código generado:

```javascript
function saveTasks() {
  const serializedTasks = JSON.stringify(tasks);

  try {
    localStorage.setItem(STORAGE_KEY, serializedTasks);
  } catch (error) {
    console.error("Error saving tasks to localStorage:", error);
  }
}
```

Tiempo aproximado: 1 minuto.

### Comparación
- **Tiempo:** la IA propuso una mejora muy rápido.
- **Calidad del código:** la versión con IA es más robusta porque maneja errores.
- **Comprensión:** comparar ambas versiones ayuda a entender buenas prácticas.

---

## Experimento 6: entender la función loadTasks()

### Sin usar IA
Intenté leer el código y entender cómo funciona la carga de tareas desde `localStorage`.

Código analizado:

```javascript
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
```

Tiempo aproximado: 15 minutos.

### Con ayuda de IA
Le pedí a la IA que explicara paso a paso cómo funciona la función.

Tiempo aproximado: 1 minuto.

### Comparación
- **Tiempo:** la IA permitió entender la función mucho más rápido.
- **Calidad de la explicación:** la IA explicó claramente cada paso.
- **Comprensión:** primero intentar entender el código ayuda a aprovechar mejor la explicación de la IA.