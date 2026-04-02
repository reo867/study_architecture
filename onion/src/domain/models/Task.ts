export type TaskId = string;

export class Task {
  id: TaskId;
  title: string;
  completed: boolean;

  constructor(props: { id: TaskId; title: string; completed?: boolean }) {
    this.id = props.id;
    this.title = props.title;
    this.completed = props.completed ?? false;
  }

  markCompleted() {
    this.completed = true;
  }

  updateTitle(title: string) {
    this.title = title;
  }
}
