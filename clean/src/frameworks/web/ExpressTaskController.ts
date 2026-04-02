import { Request, Response } from 'express';
import { HttpTaskController } from '../../interfaces/controllers/HttpTaskController';
import { TaskUseCase } from '../../usecases/TaskUseCase';

export function createExpressTaskController(usecase: TaskUseCase): HttpTaskController {
  return {
    async list(_req: Request, res: Response) {
      const items = await usecase.listTasks();
      res.json(items);
    },

    async create(req: Request, res: Response) {
      try {
        const { title } = req.body || {};
        const task = await usecase.createTask(title);
        res.status(201).json(task);
      } catch (e: any) {
        res.status(400).json({ error: e.message });
      }
    },

    async update(req: Request, res: Response) {
      const { id } = req.params;
      const { title, completed } = req.body || {};
      const updated = await usecase.updateTask(id, title, completed);
      if (!updated) return res.status(404).json({ error: 'not_found' });
      res.json(updated);
    },

    async remove(req: Request, res: Response) {
      const { id } = req.params;
      const ok = await usecase.deleteTask(id);
      if (!ok) return res.status(404).json({ error: 'not_found' });
      res.status(204).send();
    }
  };
}
