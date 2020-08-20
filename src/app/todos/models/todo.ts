export interface Todo {
  id: number;
  text: string;
  createdForIds: number[] | string[];
  createdForNames: string[];
  createdAt: Date;
  completed: boolean;
}
