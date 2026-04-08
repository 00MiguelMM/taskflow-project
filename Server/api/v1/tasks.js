import express from "express";
import cors from "cors";
import taskRoutes from "../../src/routes/task.routes.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/v1/tasks", taskRoutes);

export default app;