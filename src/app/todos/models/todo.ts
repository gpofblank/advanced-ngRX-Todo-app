import {User} from '../../users/models/user';

export interface Todo {
  id: number;
  text: string;
  users: User[];
  createdAt: Date;
  completed: boolean;
}
