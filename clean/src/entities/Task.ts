export type TaskId = string;

export class Task {
  constructor(
    public id: TaskId,
    public title: string,
    public completed: boolean = false
  ) {
    if (!title || title.trim().length === 0) {
      throw new Error('title is required');
    }
  }

  updateTitle(title: string) {
    if (!title || title.trim().length === 0) throw new Error('title is required');
    this.title = title;
  }

  markCompleted() {
    this.completed = true;
  }

  markPending() {
    this.completed = false;
  }
}
