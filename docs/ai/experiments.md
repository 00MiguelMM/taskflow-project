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