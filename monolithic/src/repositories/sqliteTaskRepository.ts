import { getDb } from '../infrastructure/db';
import { Task, TaskCreateInput, TaskUpdateInput } from '../models/task';
import { TaskRepository } from './taskRepository';

type TaskRow = {
  id: number;
  title: string;
  completed: number;
  created_at: string;
};

function mapRow(row: TaskRow): Task {
  return {
    id: row.id,
    title: row.title,
    completed: Boolean(row.completed),
    createdAt: row.created_at
  };
}

export class SqliteTaskRepository implements TaskRepository {
  async list(): Promise<Task[]> {
    const db = await getDb();
    const rows = await db.all<TaskRow>(
      'SELECT id, title, completed, created_at FROM tasks ORDER BY id DESC'
    );
    return rows.map(mapRow);
  }

  async getById(id: number): Promise<Task | null> {
    const db = await getDb();
    const row = await db.get<TaskRow>(
      'SELECT id, title, completed, created_at FROM tasks WHERE id = ?',
      id
    );
    return row ? mapRow(row) : null;
  }

  async create(input: TaskCreateInput): Promise<Task> {
    const db = await getDb();
    const createdAt = new Date().toISOString();
    const result = await db.run(
      'INSERT INTO tasks (title, completed, created_at) VALUES (?, ?, ?)',
      input.title,
      0,
      createdAt
    );

    return {
      id: result.lastID as number,
      title: input.title,
      completed: false,
      createdAt
    };
  }

  async update(id: number, input: TaskUpdateInput): Promise<Task | null> {
    const db = await getDb();
    const existing = await db.get<TaskRow>(
      'SELECT id, title, completed, created_at FROM tasks WHERE id = ?',
      id
    );

    if (!existing) {
      return null;
    }

    const nextTitle = input.title ?? existing.title;
    const nextCompleted = input.completed ?? Boolean(existing.completed);

    await db.run(
      'UPDATE tasks SET title = ?, completed = ? WHERE id = ?',
      nextTitle,
      nextCompleted ? 1 : 0,
      id
    );

    return {
      id: existing.id,
      title: nextTitle,
      completed: nextCompleted,
      createdAt: existing.created_at
    };
  }

  async delete(id: number): Promise<boolean> {
    const db = await getDb();
    const result = await db.run('DELETE FROM tasks WHERE id = ?', id);
    return result.changes > 0;
  }
}
