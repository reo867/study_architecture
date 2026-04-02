import { Task, TaskCreateInput, TaskUpdateInput } from './task';

export interface TaskRepository {
  list(): Promise<Task[]>;
  getById(id: number): Promise<Task | null>;
  create(input: TaskCreateInput): Promise<Task>;
  update(id: number, input: TaskUpdateInput): Promise<Task | null>;
  delete(id: number): Promise<boolean>;
}
