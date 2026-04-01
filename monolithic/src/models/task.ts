export interface Task {
  id: number;
  title: string;
  completed: boolean;
  createdAt: string;
}

export interface TaskCreateInput {
  title: string;
}

export interface TaskUpdateInput {
  title?: string;
  completed?: boolean;
}
