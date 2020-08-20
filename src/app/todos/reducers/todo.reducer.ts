import {createEntityAdapter, EntityAdapter, EntityState} from '@ngrx/entity';
import {Action, createReducer, createSelector, on} from '@ngrx/store';
import {Todo} from '../models/todo';

import * as TodoActions from '../actions/todo.actions';

export interface State extends EntityState<Todo> {
}

export const adapter: EntityAdapter<Todo> = createEntityAdapter<Todo>();

const initialState: EntityState<Todo> = adapter.getInitialState();

const todoReducer = createReducer(
  initialState,

  on(TodoActions.EditTodo, (state, {updates}) =>
    adapter.updateOne(updates, state)
  ),

  on(TodoActions.AddTodo, (state, {todo}) =>
    adapter.addOne(todo, state)
  ),
);

export const reducer = (state: State, action: Action) => {
  return todoReducer(state, action);
};

export const {selectEntities} = adapter.getSelectors();

// equal to the select all function from adapter.getSelectors()
export const selectAll = (state: EntityState<Todo>) =>
  (state.ids as number[]).map((id) => state.entities[id]);

export const selectById = (id) =>
  createSelector(selectEntities, (todoEntries) => todoEntries[id]);

// export const selectUserTodosById = (id) =>
//   createSelector(selectEntities, (todoEntries) => todoEntries.entities.createdForIds);
