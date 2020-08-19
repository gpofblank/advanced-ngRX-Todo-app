import {Todo} from '../models/todo';
import {createAction, props} from '@ngrx/store';
import {Update} from '@ngrx/entity';

export const ReorderTodo = createAction(
  '[Todos] Reorder Todo',
  props<{prevIndex: number, currIndex: number }>()
);

export const EditTodo = createAction(
  '[Todos] Edit Todo',
  props<{ updates: Update<Todo> }>()
);

export const AddTodo = createAction(
  '[Todos] Add Todo',
  props<{ todo: Todo }>()
);
