import { Task, TaskId } from '../entities/Task';
import { TaskRepository } from '../interfaces/repositories/TaskRepository';

function generateId(): TaskId {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
}

export class TaskUseCase {
  constructor(private repo: TaskRepository) {}

  async listTasks(): Promise<Task[]> {
    return this.repo.getAll();
  }

  async createTask(title: string): Promise<Task> {
    const id: TaskId = generateId();
    const task = new Task(id, title);
    await this.repo.save(task);
    return task;
  }

  async updateTask(id: TaskId, title?: string, completed?: boolean): Promise<Task | null> {
    const task = await this.repo.getById(id);
    if (!task) return null;
    if (typeof title === 'string') task.updateTitle(title);
    if (typeof completed === 'boolean') {
      if (completed) task.markCompleted();
      else task.markPending();
    }
    await this.repo.save(task);
    return task;
  }

  async deleteTask(id: TaskId): Promise<boolean> {
    const existing = await this.repo.getById(id);
    if (!existing) return false;
    await this.repo.delete(id);
    return true;
  }
}
