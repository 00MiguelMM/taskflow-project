let tasks = [];

export const obtenerTodas = () => {
  return tasks;
};

export const crearTarea = (data) => {
  const nuevaTarea = {
    id: Date.now().toString(),
    titulo: data.titulo,
    prioridad: data.prioridad
  };

  tasks.push(nuevaTarea);
  return nuevaTarea;
};

export const eliminarTarea = (id) => {
  const index = tasks.findIndex((task) => task.id === id);

  if (index === -1) {
    throw new Error("NOT_FOUND");
  }

  tasks.splice(index, 1);
};