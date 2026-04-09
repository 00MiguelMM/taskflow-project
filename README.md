# TaskFlow

Aplicación web de gestión de tareas desarrollada como parte del ciclo DAM.

Permite crear, visualizar y eliminar tareas mediante un frontend en JavaScript y un backend en Node.js con Express.

---

## Tecnologías utilizadas

- HTML
- CSS (Tailwind)
- JavaScript (Vanilla)
- Node.js
- Express
- Fetch API

---

## Arquitectura del proyecto

```
taskflow-project/
│
├── frontend-api/
│   └── client.js
│
├── api/
│   └── tasks.js
│
├── docs/
│   └── ai/
│
├── server/
│   └── src/
│       └── index.js
│
├── app.js
├── index.html
├── styles.css
├── tailwind.config.js
├── tailwind.css
├── package.json
└── README.md
```

---

## Explicación de la arquitectura

### Frontend

El frontend se encarga de:

- renderizar las tareas en pantalla
- recoger los datos del formulario
- enviar peticiones al backend
- mostrar estados de carga, éxito y error

Utiliza `fetch` para comunicarse con la API.

---

### Capa de red (cliente)

Se ha creado un archivo dedicado (`frontend-api/client.js`) que centraliza todas las peticiones HTTP al backend.

Permite:

- separar la lógica de red
- reutilizar código
- facilitar mantenimiento

Ejemplo:

```js
const API_URL = "/api/tasks";

export async function getTasks() {
  const response = await fetch(API_URL);
  return response.json();
}
```

---

### Backend

El backend está construido con Express y sigue una arquitectura por capas.

Se encarga de:

- gestionar rutas (endpoints)
- procesar peticiones HTTP
- devolver respuestas en JSON

---

### Arquitectura por capas

- Routes → endpoints
- Controllers → lógica de cada petición
- Services → lógica de negocio

---

## Middlewares utilizados

Los middlewares son funciones que se ejecutan antes de llegar al controlador.

Sirven para:

- procesar datos
- permitir comunicación entre dominios
- preparar peticiones

---

### express.json()

Permite leer el body en JSON.

```js
app.use(express.json());
```

---

### cors

Permite comunicación frontend-backend.

```js
app.use(cors());
```

---

## API REST

### Base URL

- Desarrollo:
http://localhost:3000/api/v1/tasks

- Producción:
```
/api/tasks
```

---

### GET /tasks

Obtiene todas las tareas.

Respuesta:

```json
[
  {
    "id": 1,
    "titulo": "Primera tarea",
    "prioridad": 2,
    "categoria": "Trabajo",
    "fecha": "2026-04-17"
  },
  {
    "id": 2,
    "titulo": "Segunda tarea",
    "prioridad": 3,
    "categoria": "Personal",
    "fecha": "2026-04-18"
  }
]
```

---

### POST /tasks

Crea una nueva tarea.

Body:

```json
{
  "titulo": "Nueva tarea",
  "prioridad": 2,
  "categoria": "Trabajo",
  "fecha": "2026-04-17"
}
```

Respuesta:

```json
{
  "message": "Tarea creada correctamente",
  "task": {
    "id": 3,
    "titulo": "Nueva tarea",
    "prioridad": 2,
    "categoria": "Trabajo",
    "fecha": "2026-04-17"
  }
}
```

---

### DELETE /tasks/:id

Elimina una tarea por su id.

Respuesta:

```json
{
  "message": "Tarea eliminada correctamente"
}
```

---

## Ejemplos de uso con fetch

### Obtener tareas

```js
fetch("/api/tasks")
  .then(res => res.json())
  .then(data => console.log(data));
```

---

### Crear tarea

```js
fetch("/api/tasks", {
  method: "POST",
  headers: {
    "Content-Type": "application/json"
  },
  body: JSON.stringify({
    titulo: "Nueva tarea",
    prioridad: 2
  })
});
```

---

### Eliminar tarea

```js
fetch("/api/tasks/1", {
  method: "DELETE"
});
```

---

## Flujo de funcionamiento

1. Usuario interactúa con la interfaz
2. Frontend hace petición HTTP
3. Backend procesa la petición
4. Backend devuelve JSON
5. Frontend renderiza los datos

---

## Estados de red en la interfaz

- Cargando → "Cargando tareas..."
- Éxito → "Tarea creada correctamente"
- Error → "No se pudo crear la tarea"

---

## Despliegue

La aplicación está desplegada en Vercel.

- Frontend → sitio estático
- Backend → Serverless Functions

---

## Pruebas realizadas

- carga de tareas desde API
- creación de tareas
- eliminación de tareas
- persistencia tras recargar
- comunicación frontend-backend
- estados de red funcionando
- control de errores

---

## Mejoras futuras

- actualizar tareas (PUT)
- base de datos (MongoDB/PostgreSQL)
- autenticación de usuarios
- documentación con Swagger
- monitorización con Sentry