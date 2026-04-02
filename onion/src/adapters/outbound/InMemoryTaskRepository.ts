import { Task, TaskId } from "../../domain/models/Task";
import { TaskRepository } from "../../domain/ports/TaskRepository";

export class InMemoryTaskRepository implements TaskRepository {
  private store: Map<TaskId, Task> = new Map();

  async findAll(): Promise<Task[]> {
    return Array.from(this.store.values());
  }

  async findById(id: TaskId): Promise<Task | null> {
    return this.store.get(id) ?? null;
  }

  async save(task: Task): Promise<void> {
    this.store.set(task.id, task);
  }

  async delete(id: TaskId): Promise<void> {
    this.store.delete(id);
  }
}
