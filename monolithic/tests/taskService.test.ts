import { beforeEach, describe, expect, it } from 'vitest';
import { ValidationError } from '../src/errors/appError';
import { Task } from '../src/models/task';
import { TaskRepository } from '../src/repositories/taskRepository';
import { TaskService } from '../src/services/taskService';

class InMemoryTaskRepository implements TaskRepository {
  private tasks: Task[] = [];
  private nextId = 1;

  async list(): Promise<Task[]> {
    return [...this.tasks].sort((a, b) => b.id - a.id);
  }

  async getById(id: number): Promise<Task | null> {
    return this.tasks.find((task) => task.id === id) ?? null;
  }

  async create(input: { title: string }): Promise<Task> {
    const task: Task = {
      id: this.nextId++,
      title: input.title,
      completed: false,
      createdAt: new Date().toISOString()
    };
    this.tasks.push(task);
    return task;
  }

  async update(
    id: number,
    input: { title?: string; completed?: boolean }
  ): Promise<Task | null> {
    const task = await this.getById(id);
    if (!task) {
      return null;
    }

    task.title = input.title ?? task.title;
    task.completed = input.completed ?? task.completed;
    return task;
  }

  async delete(id: number): Promise<boolean> {
    const index = this.tasks.findIndex((task) => task.id === id);
    if (index === -1) {
      return false;
    }
    this.tasks.splice(index, 1);
    return true;
  }
}

describe('TaskService', () => {
  let service: TaskService;

  beforeEach(() => {
    service = new TaskService(new InMemoryTaskRepository());
  });

  it('creates tasks with trimmed title and default completed', async () => {
    const task = await service.createTask({ title: '  テスト  ' });

    expect(task.id).toBe(1);
    expect(task.title).toBe('テスト');
    expect(task.completed).toBe(false);
  });

  it('rejects empty titles', async () => {
    await expect(service.createTask({ title: '   ' })).rejects.toBeInstanceOf(
      ValidationError
    );
  });

  it('updates title and completed status', async () => {
    const task = await service.createTask({ title: '最初のタスク' });
    const updated = await service.updateTask(task.id, {
      title: '更新後',
      completed: true
    });

    expect(updated?.title).toBe('更新後');
    expect(updated?.completed).toBe(true);
  });

  it('throws when update has no fields', async () => {
    const task = await service.createTask({ title: 'task' });
    await expect(service.updateTask(task.id, {})).rejects.toBeInstanceOf(
      ValidationError
    );
  });
});
