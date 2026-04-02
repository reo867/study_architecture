import { Task, TaskId } from '../../entities/Task';

export interface TaskRepository {
  getAll(): Promise<Task[]>;
  getById(id: TaskId): Promise<Task | null>;
  save(task: Task): Promise<void>;
  delete(id: TaskId): Promise<void>;
}
