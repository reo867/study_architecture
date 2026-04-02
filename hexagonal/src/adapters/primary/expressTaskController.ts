import express, { Request, Response } from "express";
import { TaskRepository } from "../../ports/taskRepository";

export function createTaskRouter(repo: TaskRepository) {
  const router = express.Router();

  router.get('/', async (req: Request, res: Response) => {
    const tasks = await repo.findAll();
    res.json(tasks);
  });

  router.get('/:id', async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const t = await repo.findById(id);
    if (!t) return res.status(404).json({ message: 'not found' });
    res.json(t);
  });

  router.post('/', async (req: Request, res: Response) => {
    const { title } = req.body;
    if (!title || typeof title !== 'string') return res.status(400).json({ message: 'title required' });
    const task = await repo.create(title);
    res.status(201).json(task);
  });

  router.put('/:id', async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const patch = req.body;
    const updated = await repo.update(id, patch);
    if (!updated) return res.status(404).json({ message: 'not found' });
    res.json(updated);
  });

  router.delete('/:id', async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const ok = await repo.delete(id);
    if (!ok) return res.status(404).json({ message: 'not found' });
    res.status(204).send();
  });

  return router;
}
