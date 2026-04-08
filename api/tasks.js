export default function handler(req, res) {
  if (req.method === "GET") {
    return res.status(200).json([
      { id: 1, text: "Primera tarea" },
      { id: 2, text: "Segunda tarea" }
    ]);
  }

  res.status(405).json({ message: "Method not allowed" });
}