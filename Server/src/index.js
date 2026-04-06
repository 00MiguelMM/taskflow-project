import express from "express";
import cors from "cors";
import { PORT } from "./config/env.js";
import taskRoutes from "./routes/task.routes.js";

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Rutas de tareas
app.use("/api/v1/tasks", taskRoutes);

// Ruta de prueba
app.get("/", (req, res) => {
  res.send("Servidor funcionando 🚀");
});

// Middleware global de manejo de errores
app.use((err, req, res, next) => {
  if (err.message === "NOT_FOUND") {
    return res.status(404).json({
      error: "Tarea no encontrada"
    });
  }

  console.error(err);

  res.status(500).json({
    error: "Error interno del servidor"
  });
});

// Arrancar servidor
app.listen(PORT, () => {
  console.log(`Servidor en http://localhost:${PORT}`);
});

