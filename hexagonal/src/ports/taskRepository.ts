import { Task } from "../domain/task";

export interface TaskRepository {
  findAll(): Promise<Task[]>;
  findById(id: number): Promise<Task | null>;
  create(title: string): Promise<Task>;
  update(id: number, patch: Partial<Omit<Task, 'id' | 'createdAt'>>): Promise<Task | null>;
  delete(id: number): Promise<boolean>;
}
