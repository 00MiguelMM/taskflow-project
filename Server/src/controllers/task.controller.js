import { obtenerTodas, crearTarea, eliminarTarea } from "../services/task.service.js";

export const getTasks = (req, res) => {
  const tasks = obtenerTodas();
  res.json(tasks);
};

export const postTask = (req, res) => {
  const { titulo, prioridad } = req.body;

  if (!titulo || typeof titulo !== "string" || titulo.trim().length < 3) {
    return res.status(400).json({
      error: "El título es obligatorio y debe tener al menos 3 caracteres."
    });
  }

  if (typeof prioridad !== "number" || prioridad < 1) {
    return res.status(400).json({
      error: "La prioridad debe ser un número positivo."
    });
  }

  const nuevaTarea = crearTarea({ titulo, prioridad });

  res.status(201).json(nuevaTarea);
};

export const deleteTask = (req, res, next) => {
  try {
    const { id } = req.params;

    eliminarTarea(id);

    res.status(204).send();
  } catch (error) {
    next(error);
  }
};