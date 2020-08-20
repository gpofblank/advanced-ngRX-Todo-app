export interface Todo {
  id: number;
  text: string;
  createdForIds?: number[] | string[];
  createdForNames?: number[] | string[];
  createdAt: Date;
  completed: boolean;
}
