import {createEntityAdapter, EntityAdapter, EntityState} from '@ngrx/entity';
import {Action, createReducer, createSelector, on} from '@ngrx/store';
import {Todo} from '../models/todo';

import * as TodoActions from '../actions/todo.actions';
import {moveItemInArray} from '@angular/cdk/drag-drop';

export interface State extends EntityState<Todo> {
}

export const adapter: EntityAdapter<Todo> = createEntityAdapter<Todo>();

const initialState: EntityState<Todo> = adapter.getInitialState();

const todoReducer = createReducer(
  initialState,

  on(TodoActions.EditTodo, (state, {updates}) =>
    adapter.updateOne(updates, state)
  ),

  on(TodoActions.AddTodo, (state, {todo}) => {
    const todoId: number = todo.id;
    const entities = state.entities;

    return {
      ...state,
      ids: [todoId, ...state.ids],
      entities: {...entities, [todoId]: {...todo}}
    };
  }),
  // on(TodoActions.AddTodo, (state, {todo}) =>
  //  adapter.addOne(todo, state)
  // ),

  on(TodoActions.ReorderTodo, (state: EntityState<Todo>, {prevIndex, currIndex}) => {
    const todos = [...state.ids];
    moveItemInArray(todos, prevIndex, currIndex);
    return {...state, ids: todos};
  })
);

export const reducer = (state: State, action: Action) => {
  return todoReducer(state, action);
};

export const {selectEntities, selectAll} = adapter.getSelectors();

// equivalent to the select all function from adapter.getSelectors()
// export const selectAll = (state: EntityState<Todo>) =>
//   (state.ids as number[]).map((id) => state.entities[id]);

export const selectById = (id) =>
  createSelector(selectEntities, (todoEntries) => todoEntries[id]);

// export const selectUserTodosById = (id) =>
//   createSelector(selectEntities, (todoEntries) => todoEntries.entities.createdForIds);
