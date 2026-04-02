import { Task, TaskId } from "../domain/models/Task";
import { TaskRepository } from "../domain/ports/TaskRepository";

export class TaskService {
  private repo: TaskRepository;

  constructor(repo: TaskRepository) {
    this.repo = repo;
  }

  async listTasks(): Promise<Task[]> {
    return this.repo.findAll();
  }

  async createTask(title: string): Promise<Task> {
    const id = require("uuid").v4();
    const task = new Task({ id, title });
    await this.repo.save(task);
    return task;
  }

  async updateTask(id: TaskId, props: { title?: string; completed?: boolean }): Promise<Task | null> {
    const task = await this.repo.findById(id);
    if (!task) return null;
    if (props.title !== undefined) task.updateTitle(props.title);
    if (props.completed) task.markCompleted();
    await this.repo.save(task);
    return task;
  }

  async deleteTask(id: TaskId): Promise<boolean> {
    const task = await this.repo.findById(id);
    if (!task) return false;
    await this.repo.delete(id);
    return true;
  }
}
