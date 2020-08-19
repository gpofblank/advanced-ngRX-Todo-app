import {User} from '../models/user';
import {createAction, props} from '@ngrx/store';
import {Update} from '@ngrx/entity';

export const ReorderUser = createAction(
  '[Users] Reorder User',
  props<{prevIndex: number, currIndex: number }>()
);

export const EditUser = createAction(
  '[Users] Edit User',
  props<{ updates: Update<User> }>()
);

export const AddUser = createAction(
  '[Users] Add User',
  props<{ user: User }>()
);
