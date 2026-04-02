import { InMemoryTaskRepository } from './InMemoryTaskRepository';
import { TaskRepository } from '../../interfaces/repositories/TaskRepository';

export function createTaskRepository(): TaskRepository {
  return new InMemoryTaskRepository();
}
