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
├── API/
│   └── client.js
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

### Backend

El backend está construido con Express y sigue una arquitectura por capas.

Se encarga de:

- gestionar las rutas (endpoints)
- procesar las peticiones HTTP
- devolver respuestas en formato JSON

---

## Middlewares utilizados

### express.json()

Permite leer el body de las peticiones en formato JSON.

Ejemplo:
```js
app.use(express.json());
```

---

### cors

Permite la comunicación entre frontend y backend aunque estén en distintos puertos.

Ejemplo:
```js
app.use(cors());
```

---

## API REST

Base URL:
```
http://localhost:3000/api/v1/tasks
```

---

### GET /tasks

Obtiene todas las tareas.

Respuesta:
```json
[]
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

---

### DELETE /tasks/:id

Elimina una tarea por su id.

---

## Estados de red en la interfaz

Se han implementado tres estados visuales:

- Cargando → "Cargando tareas..."
- Éxito → "Tarea creada correctamente"
- Error → "No se pudo crear la tarea"

Esto mejora la experiencia del usuario al interactuar con la API.

---

## Pruebas realizadas

Durante esta fase se ha comprobado:

- carga de tareas desde la API
- creación de tareas desde el frontend
- eliminación de tareas
- persistencia tras recargar la página
- comunicación correcta entre frontend y backend
- visualización de estados de carga, éxito y error
- manejo de error cuando el backend no está disponible

---

## Mejoras futuras

- conectar la edición de tareas al backend
- permitir marcar tareas como completadas en la API
- implementar borrado de tareas completadas
- añadir validaciones más avanzadas
- mejorar la presentación visual de los estados de red
- documentar la API con Swagger