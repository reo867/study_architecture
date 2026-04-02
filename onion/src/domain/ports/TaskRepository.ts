import { Task, TaskId } from "../models/Task";

export interface TaskRepository {
  findAll(): Promise<Task[]>;
  findById(id: TaskId): Promise<Task | null>;
  save(task: Task): Promise<void>;
  delete(id: TaskId): Promise<void>;
}
