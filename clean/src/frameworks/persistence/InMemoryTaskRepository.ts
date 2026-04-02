import { Task, TaskId } from '../../entities/Task';
import { TaskRepository } from '../../interfaces/repositories/TaskRepository';

export class InMemoryTaskRepository implements TaskRepository {
  private items: Map<TaskId, Task> = new Map();

  async getAll(): Promise<Task[]> {
    return Array.from(this.items.values());
  }

  async getById(id: TaskId): Promise<Task | null> {
    return this.items.get(id) ?? null;
  }

  async save(task: Task): Promise<void> {
    this.items.set(task.id, task);
  }

  async delete(id: TaskId): Promise<void> {
    this.items.delete(id);
  }
}
