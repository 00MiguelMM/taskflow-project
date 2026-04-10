let tasks = [
  { id: 1, text: "Primera tarea", completed: false, priority: "low", category: "Sin categoría", date: "" },
  { id: 2, text: "Segunda tarea", completed: false, priority: "low", category: "Sin categoría", date: "" }
];

export default function handler(req, res) {
  if (req.method === "GET") {
    return res.status(200).json(tasks);
  }

  if (req.method === "POST") {
    const { titulo, prioridad, categoria, fecha } = req.body;

    if (!titulo || !prioridad) {
      return res.status(400).json({ message: "Faltan campos obligatorios." });
    }

    const priorityMap = {
      1: "high",
      2: "medium",
      3: "low",
    };

    const newTask = {
      id: Date.now(),
      text: titulo,
      completed: false,
      priority: priorityMap[prioridad] || "low",
      category: categoria || "Sin categoría",
      date: fecha || "",
      createdAt: Date.now(),
    };

    tasks.push(newTask);

    return res.status(201).json(newTask);
  }

  if (req.method === "DELETE") {
    const { id } = req.query;

    tasks = tasks.filter((task) => String(task.id) !== String(id));

    return res.status(200).json({ message: "Tarea eliminada correctamente." });
  }

  return res.status(405).json({ message: "Method not allowed" });
}