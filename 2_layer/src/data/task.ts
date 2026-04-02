export type Task = {
  id: number;
  title: string;
  completed: boolean;
  createdAt: string;
};

export type TaskCreateInput = {
  title: string;
};

export type TaskUpdateInput = {
  title?: string;
  completed?: boolean;
};
