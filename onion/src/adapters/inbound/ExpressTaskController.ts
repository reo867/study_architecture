import express, { Request, Response } from "express";
import bodyParser from "body-parser";
import { TaskService } from "../../application/TaskService";

export function createTaskRouter(service: TaskService) {
  const router = express.Router();
  router.use(bodyParser.json());

  router.get("/tasks", async (_req: Request, res: Response) => {
    const tasks = await service.listTasks();
    res.json(tasks);
  });

  router.post("/tasks", async (req: Request, res: Response) => {
    const { title } = req.body;
    if (!title) return res.status(400).json({ error: "title required" });
    const task = await service.createTask(title);
    res.status(201).json(task);
  });

  router.put("/tasks/:id", async (req: Request, res: Response) => {
    const id = req.params.id;
    const { title, completed } = req.body;
    const updated = await service.updateTask(id, { title, completed });
    if (!updated) return res.status(404).json({ error: "not found" });
    res.json(updated);
  });

  router.delete("/tasks/:id", async (req: Request, res: Response) => {
    const id = req.params.id;
    const ok = await service.deleteTask(id);
    if (!ok) return res.status(404).json({ error: "not found" });
    res.status(204).send();
  });

  return router;
}
