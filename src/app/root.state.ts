import * as fromTodos from './todos/reducers/todo.reducer';
import * as fromUsers from './users/reducers/user.reducer';
import { createFeatureSelector, createSelector } from '@ngrx/store';

export interface RootState {
  todos: fromTodos.State;
  users: fromUsers.State;
}

// todos
export const selectTodosState = createFeatureSelector('todos');

export const selectAllTodos = createSelector(
  selectTodosState,
  fromTodos.selectAll
);

export const selectTodoById = (todoId) =>
  createSelector(selectTodosState, fromTodos.selectById(todoId));

// users
export const selectUsersState = createFeatureSelector('users');

export const selectAllUsers = createSelector(
  selectUsersState,
  fromUsers.selectAll
);

export const selectUserById = (userId) =>
  createSelector(selectUsersState, fromUsers.selectById(userId));
