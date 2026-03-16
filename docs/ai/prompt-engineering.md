# PROMP ENGINEERING APLICADO AL DESARROLLO
## INTRODUCCIÓN
En este documento voy a recopilar y analizar distintos prompts utilizados durante el desarrollo del proyecto TaskFlow. El objetivo es identificar qué tipo de instrucciones permiten obtener mejores resultados al utilizar diferentes herramientas de inteligencia artificial para programar, refactorizar código o generar documentación.

## Prompt 1: definir un rol

### Prompt utilizado
Actúa como un desarrollador senior de JavaScript.

Revisa el archivo app.js de este proyecto y explica qué hace cada parte del código de forma clara para un desarrollador junior.

### Para qué lo utilicé
Lo utilicé para entender mejor cómo está organizado el archivo principal del proyecto y recibir una explicación más clara del funcionamiento del código.

### Resultado
La IA analizó el archivo app.js y explicó su funcionamiento dividiéndolo en varias partes:

- estado global y persistencia de datos con localStorage
- conexión con los elementos del DOM
- renderizado de cada tarea con la función createTaskCard
- creación de tareas mediante el formulario
- carga inicial de las tareas guardadas
- sistema de búsqueda y filtrado
- cambio entre modo claro y modo oscuro

Además, detectó que había una duplicación en la función saveTasks() al inicio del archivo.

### Por qué funciona bien
Este prompt funciona bien porque al definir un rol concreto (desarrollador senior) la IA adapta su forma de responder. La explicación fue más estructurada y pensada para alguien que está aprendiendo, lo que facilita entender el código.

## Prompt 2: revisión de código con rol específico

### Prompt utilizado
Actúa como un revisor de código en un equipo de desarrollo.

Analiza el archivo app.js y sugiere mejoras para que el código sea más limpio, mantenible y siga buenas prácticas de JavaScript.

### Para qué lo utilicé
Lo utilicé para revisar el código del proyecto desde el punto de vista de un revisor de código, como si estuviera en un equipo de desarrollo real.

### Resultado
La IA revisó el archivo app.js y señaló varios aspectos que podrían mejorarse:

- detectó un problema en la función saveTasks() donde hay código duplicado y una declaración incompleta
- sugirió evitar el uso de variables globales como tasks y encapsular el estado en una estructura más organizada
- recomendó separar mejor la lógica de datos, la persistencia y la interfaz de usuario
- propuso usar delegación de eventos en lugar de añadir un addEventListener a cada tarea
- sugirió mover la configuración de prioridades fuera de la función createTaskCard
- comentó posibles mejoras de rendimiento al renderizar listas grandes
- recomendó algunas mejoras de estilo y experiencia de usuario, como evitar alert() y mostrar mensajes dentro de la interfaz

### Por qué funciona bien
Este prompt funciona bien porque define un rol muy concreto (revisor de código). La IA responde señalando errores, posibles mejoras y buenas prácticas.

## Prompt 3: few-shot prompting con ejemplos

### Prompt utilizado
Ejemplo:

Entrada: "hola mundo"  
Salida: "Hola Mundo"

Entrada: "javascript es divertido"  
Salida: "Javascript Es Divertido"

Ahora aplica la misma transformación a:
"aprendiendo programación"

### Para qué lo utilicé
Lo utilicé para probar cómo la IA puede aprender una transformación de texto a partir de ejemplos previos.

### Resultado
La IA aplicó correctamente la misma transformación a la frase "aprendiendo programación", generando la salida "Aprendiendo Programación".

### Por qué funciona bien
Funciona bien porque al darle ejemplos la IA entiende mejor lo que le estás pidiendo y puede seguir el mismo patrón en la respuesta.

## Prompt 4: few-shot prompting aplicado al proyecto

### Prompt utilizado
Ejemplo:

Código:
function sumar(a, b) {
  return a + b;
}

Explicación:
Esta función recibe dos números como parámetros y devuelve su suma.

Ejemplo:

Código:
function multiplicar(a, b) {
  return a * b;
}

Explicación:
Esta función recibe dos números y devuelve su multiplicación.

Ahora aplica el mismo tipo de explicación a esta función del proyecto:

function saveTasks() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
}

### Para qué lo utilicé
Lo utilicé para ver si la IA era capaz de seguir el mismo formato de explicación que le había dado en los ejemplos.

### Resultado
```javascript
function saveTasks() { localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));}
```
La IA mantuvo la misma estructura que en los ejemplos: primero mostró el código de la función y después generó una explicación siguiendo el mismo estilo.

### Por qué funciona bien
Funciona bien porque primero le muestras ejemplos de cómo quieres que explique el código. Después la IA intenta seguir ese mismo estilo cuando analiza la función del proyecto.

## Prompt 5: razonamiento paso a paso

### Prompt utilizado
Explica paso a paso qué ocurre en el proyecto cuando un usuario añade una nueva tarea desde el formulario hasta que se guarda en localStorage y aparece en la lista.

### Para qué lo utilicé
Lo utilicé para entender mejor todo el recorrido que sigue una tarea desde que el usuario la escribe hasta que termina guardada y visible en la aplicación.

### Resultado
La IA explicó el proceso por pasos, desde el momento en que se envía el formulario hasta que la tarea aparece en pantalla. En concreto, describió estas partes:

- el envío del formulario
- la validación del texto y de la prioridad
- la creación del objeto tarea
- la actualización del array `tasks`
- el guardado en `localStorage`
- la creación de la tarjeta en el DOM
- y la carga de tareas al recargar la página

### Por qué funciona bien
Funciona bien porque al pedirlo paso a paso la IA lo ordena todo mucho mejor y se entiende más fácil qué va pasando en cada momento.

## Prompt 6: razonamiento paso a paso sobre localStorage

### Prompt utilizado
Explica paso a paso cómo funciona el sistema de guardado y carga de tareas usando localStorage en este proyecto.

### Para qué lo utilicé
Lo utilicé para entender mejor cómo se guardan las tareas en el navegador y cómo se recuperan cuando se vuelve a abrir la aplicación.

### Resultado
La IA explicó el proceso separándolo en varias partes:

- cómo se cargan las tareas al iniciar la aplicación con `loadTasks()`
- cómo se leen los datos guardados en `localStorage`
- cómo se convierten de JSON a un array usando `JSON.parse`
- cómo se guardan las nuevas tareas con `JSON.stringify`
- cómo se actualiza el almacenamiento cuando se crea o se elimina una tarea
- y cómo después se vuelve a renderizar la lista en el DOM

### Por qué funciona bien
Funciona bien porque al pedir que lo explique paso a paso la IA organiza mejor todo el proceso y es más fácil entender cómo funciona el guardado de datos en la aplicación.

## Prompt 7: restricciones en la respuesta

### Prompt utilizado
Explica qué hace la función saveTasks() en máximo 3 líneas y usando un lenguaje sencillo.

### Para qué lo utilicé
Lo utilicé para obtener una explicación breve de una función concreta del proyecto.

### Resultado
saveTasks() guarda la lista actual de tareas en el almacenamiento del navegador (localStorage).
Para hacerlo, convierte el array tasks a texto JSON y lo guarda con la clave STORAGE_KEY.
Si falla (por ejemplo, storage lleno), captura el error y lo muestra en consola.

- La IA explica que la función guarda el array de tareas en localStorage, convirtiéndolo primero a JSON y manejando posibles errores si el guardado falla.

### Por qué funciona bien
Funciona bien porque al poner un límite de líneas la IA tiene que ir directamente a lo importante y dar una explicación más corta y clara.

## Prompt 8: refactorizar una función del proyecto

### Prompt utilizado
Refactoriza la función saveTasks() para que sea más clara, pero sin cambiar su comportamiento ni añadir nuevas funciones.

### Para qué lo utilicé
Lo utilicé para mejorar una función real del proyecto. La idea era que la IA reorganizara el código para que fuera más fácil de leer sin cambiar lo que hace.

### Resultado
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
La IA detectó que había una duplicación de la función saveTasks() y reorganizó el código para que quedara una única función más clara. También separó la serialización del array en una variable antes de guardarlo en localStorage.

## Prompt 9: generar documentación del código

### Prompt utilizado
Actúa como un desarrollador que está escribiendo documentación técnica.

Escribe un comentario JSDoc para la función loadTasks() explicando:
- qué hace
- qué devuelve
- qué posibles errores maneja

Usa un lenguaje claro y breve.

### Para qué lo utilicé
Lo utilicé para generar documentación automática para una función del proyecto. En este caso, para explicar mejor qué hace la función `loadTasks()` dentro del archivo `app.js`.

### Resultado
```javascript
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
```
La IA generó un comentario JSDoc que explica qué hace la función, qué devuelve y cómo maneja posibles errores cuando lee datos desde localStorage.

## Prompt 10: sugerir mejoras en el código

### Prompt utilizado
Sugiere tres mejoras sencillas para el archivo app.js que mejoren la claridad del código, sin cambiar la funcionalidad de la aplicación.  
Explica cada mejora en pocas líneas.

### Para qué lo utilicé
Lo utilicé para ver si la IA podía detectar pequeñas mejoras en el código del proyecto que lo hicieran más claro y fácil de mantener.

### Resultado
La IA sugirió varias mejoras relacionadas con la organización y claridad del código:

- **Extraer constantes “mágicas” a nivel superior** para que sea más claro qué valores utiliza la aplicación.  

Por ejemplo, definir algo como:
```javascript
const ALLOWED_PRIORITIES = ["high", "medium", "low"];
```
y mover la configuración de prioridades fuera de la función:

```javascript
const PRIORITY_CONFIG = {
  high: { class: "bg-red-500 text-white px-2 py-1 rounded text-xs", label: "Alta" },
  medium: { class: "bg-yellow-400 text-black px-2 py-1 rounded text-xs", label: "Media" },
  low: { class: "bg-green-500 text-white px-2 py-1 rounded text-xs", label: "Baja" }
};
```

- **Encapsular el archivo para reducir variables globales**, envolviendo todo el contenido en una función autoejecutable:

```javascript
(() => {
  // contenido de app.js
})();
```

  Esto ayuda a evitar conflictos con variables globales.

- **Crear pequeñas funciones auxiliares** para que el código sea más fácil de leer.  
  Por ejemplo, una función para normalizar texto:

```javascript
function normalize(str) {
  return str.trim().toLowerCase();
}
```
Esto evita repetir el mismo tipo de operación en distintas partes del código.

### Por qué funciona bien
Funciona bien porque el prompt deja claro que solo se buscan mejoras de claridad y no cambios en la funcionalidad. Así la IA se centra en sugerencias pequeñas que ayudan a que el código sea más fácil de entender.