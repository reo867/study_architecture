import { Task, createTask } from "../../domain/task";
import { TaskRepository } from "../../ports/taskRepository";

export class InMemoryTaskRepository implements TaskRepository {
  private tasks: Task[] = [];
  private nextId = 1;

  async findAll(): Promise<Task[]> {
    return [...this.tasks];
  }

  async findById(id: number): Promise<Task | null> {
    return this.tasks.find(t => t.id === id) ?? null;
  }

  async create(title: string): Promise<Task> {
    const task = createTask(this.nextId++, title);
    this.tasks.push(task);
    return task;
  }

  async update(id: number, patch: Partial<Omit<Task, 'id' | 'createdAt'>>): Promise<Task | null> {
    const t = this.tasks.find(x => x.id === id);
    if (!t) return null;
    if (typeof patch.title === 'string') t.title = patch.title;
    if (typeof patch.completed === 'boolean') t.completed = patch.completed;
    return t;
  }

  async delete(id: number): Promise<boolean> {
    const idx = this.tasks.findIndex(t => t.id === id);
    if (idx === -1) return false;
    this.tasks.splice(idx, 1);
    return true;
  }
}
