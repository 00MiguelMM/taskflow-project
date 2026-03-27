import express from "express";
import { getTasks, postTask, deleteTask } from "../controllers/task.controller.js";

const router = express.Router();

router.get("/", getTasks);
router.post("/", postTask);
router.delete("/:id", deleteTask);

export default router;