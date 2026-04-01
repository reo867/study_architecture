import { ValidationError } from '../errors/appError';
import { Task, TaskCreateInput, TaskUpdateInput } from '../models/task';
import { TaskRepository } from '../repositories/taskRepository';

export class TaskService {
  constructor(private repository: TaskRepository) {}

  async listTasks(): Promise<Task[]> {
    return this.repository.list();
  }

  async getTask(id: number): Promise<Task | null> {
    return this.repository.getById(id);
  }

  async createTask(input: TaskCreateInput): Promise<Task> {
    const title = this.ensureTitle(input.title);
    return this.repository.create({ title });
  }

  async updateTask(id: number, input: TaskUpdateInput): Promise<Task | null> {
    if (input.title === undefined && input.completed === undefined) {
      throw new ValidationError('Nothing to update.');
    }

    let title: string | undefined = undefined;
    if (input.title !== undefined) {
      title = this.ensureTitle(input.title);
    }

    if (input.completed !== undefined && typeof input.completed !== 'boolean') {
      throw new ValidationError('Completed must be a boolean.');
    }

    return this.repository.update(id, {
      title,
      completed: input.completed
    });
  }

  async deleteTask(id: number): Promise<boolean> {
    return this.repository.delete(id);
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
