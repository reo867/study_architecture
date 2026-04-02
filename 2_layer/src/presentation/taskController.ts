import { Request, Response } from 'express';
import { NotFoundError, ValidationError } from './errors';
import { TaskCreateInput, TaskUpdateInput } from '../data/task';
import { TaskRepository } from '../data/taskRepository';

export class TaskController {
  constructor(private repository: TaskRepository) {}

  list = async (_req: Request, res: Response) => {
    const tasks = await this.repository.list();
    res.json(tasks);
  };

  get = async (req: Request, res: Response) => {
    const id = this.parseId(req.params.id);
    const task = await this.repository.getById(id);

    if (!task) {
      throw new NotFoundError('Task not found.');
    }

    res.json(task);
  };

  create = async (req: Request, res: Response) => {
    const input: TaskCreateInput = {
      title: this.ensureTitle(req.body?.title)
    };

    const task = await this.repository.create(input);
    res.status(201).json(task);
  };

  update = async (req: Request, res: Response) => {
    const id = this.parseId(req.params.id);
    const input: TaskUpdateInput = {};

    if (req.body?.title !== undefined) {
      input.title = this.ensureTitle(req.body.title);
    }

    if (req.body?.completed !== undefined) {
      if (typeof req.body.completed !== 'boolean') {
        throw new ValidationError('Completed must be a boolean.');
      }
      input.completed = req.body.completed;
    }

    if (input.title === undefined && input.completed === undefined) {
      throw new ValidationError('Nothing to update.');
    }

    const task = await this.repository.update(id, input);

    if (!task) {
      throw new NotFoundError('Task not found.');
    }

    res.json(task);
  };

  delete = async (req: Request, res: Response) => {
    const id = this.parseId(req.params.id);
    const deleted = await this.repository.delete(id);

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

  private ensureTitle(value: unknown): string {
    if (typeof value !== 'string') {
      throw new ValidationError('Title is required.');
    }

    const trimmed = value.trim();
    if (!trimmed) {
      throw new ValidationError('Title is required.');
    }

    return trimmed;
  }
}
