# Backend API - Conceptos

En este documento se describen algunas herramientas comunes utilizadas en el desarrollo de APIs.

---

## Axios

Axios es una librería para hacer peticiones HTTP desde el cliente o el servidor.

Se utiliza como alternativa a fetch porque:

- tiene una sintaxis más sencilla
- maneja automáticamente JSON
- permite interceptores para modificar peticiones y respuestas
- gestiona mejor los errores

Ejemplo:
```js
axios.get("/api/tasks")
```

---

## Postman

Postman es una herramienta que permite probar APIs sin necesidad de frontend.

Se usa para:

- enviar peticiones GET, POST, PUT, DELETE
- ver respuestas del servidor
- probar endpoints durante el desarrollo

Es muy útil para comprobar si el backend funciona correctamente.

---

## Sentry

Sentry es una herramienta de monitorización de errores.

Se utiliza para:

- detectar errores en producción
- ver trazas de errores
- identificar fallos en tiempo real

Ayuda a mejorar la estabilidad de la aplicación.

---

## Swagger

Swagger es una herramienta para documentar APIs.

Permite:

- visualizar todos los endpoints
- probar la API desde el navegador
- generar documentación automática

Es muy útil para que otros desarrolladores entiendan cómo usar la API.