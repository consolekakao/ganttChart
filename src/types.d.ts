export interface IData {
  categoryId: number;
  category: string;
  tasks: ITask[];
}

export interface ITask {
  id: number;
  title: string;
  description: string;
  assignee: string;
  creator: string;
  created: string;
  deletedAt: string;
}
