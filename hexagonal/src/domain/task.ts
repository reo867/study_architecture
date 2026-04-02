export type Task = {
  id: number;
  title: string;
  completed: boolean;
  createdAt: string; // ISO
};

export function createTask(id: number, title: string): Task {
  return {
    id,
    title,
    completed: false,
    createdAt: new Date().toISOString()
  };
}
