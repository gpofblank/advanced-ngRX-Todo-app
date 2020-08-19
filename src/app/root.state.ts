import * as fromTodos from './todos/reducers/todo.reducer';
import { createFeatureSelector, createSelector } from '@ngrx/store';

export interface RootState {
  todos: fromTodos.State;
  users: []; // fromUsers.State;
}

export const selectTodosState = createFeatureSelector('todos');

export const selectAllTodos = createSelector(
  selectTodosState,
  fromTodos.selectAll
);

export const selectTodoById = (todoId) =>
  createSelector(selectTodosState, fromTodos.selectById(todoId));
