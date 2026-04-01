import { Request, Response } from 'express';
import { NotFoundError, ValidationError } from '../errors/appError';
import { TaskService } from '../services/taskService';

export class TaskController {
  constructor(private service: TaskService) {}

  list = async (_req: Request, res: Response) => {
    const tasks = await this.service.listTasks();
    res.json(tasks);
  };

  get = async (req: Request, res: Response) => {
    const id = this.parseId(req.params.id);
    const task = await this.service.getTask(id);

    if (!task) {
      throw new NotFoundError('Task not found.');
    }

    res.json(task);
  };

  create = async (req: Request, res: Response) => {
    const task = await this.service.createTask({
      title: req.body?.title
    });

    res.status(201).json(task);
  };

  update = async (req: Request, res: Response) => {
    const id = this.parseId(req.params.id);
    const task = await this.service.updateTask(id, {
      title: req.body?.title,
      completed: req.body?.completed
    });

    if (!task) {
      throw new NotFoundError('Task not found.');
    }

    res.json(task);
  };

  delete = async (req: Request, res: Response) => {
    const id = this.parseId(req.params.id);
    const deleted = await this.service.deleteTask(id);

    if (!deleted) {
      throw new NotFoundError('Task not found.');
    }

    res.status(204).send();
  };

  private parseId(value: string): number {
    const id = Number(value);
    if (!Number.isInteger(id) || id <= 0) {
      throw new ValidationError('Invalid task id.');
    }
    return id;
  }
}
