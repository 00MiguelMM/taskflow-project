import express from "express";
import cors from "cors";
import { PORT } from "./config/env.js";


const app = express();


// Middlewares
app.use(cors());
app.use(express.json());

// Ruta de prueba
app.get("/", (req, res) => {
  res.send("Servidor funcionando 🚀");
});

// Arrancar servidor
app.listen(PORT, () => {
  console.log(`Servidor en http://localhost:${PORT}`);
});