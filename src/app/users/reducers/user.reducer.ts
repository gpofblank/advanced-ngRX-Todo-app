import {createEntityAdapter, EntityAdapter, EntityState} from '@ngrx/entity';
import {Action, createReducer, createSelector, on} from '@ngrx/store';
import {User} from '../models/user';

import * as UserActions from '../actions/user.actions';

export interface State extends EntityState<User> {
  ids: [];
  entities: {};
}

export const adapter: EntityAdapter<User> = createEntityAdapter<User>();

const initialState: EntityState<User> = adapter.getInitialState();

const userReducer = createReducer(
  initialState,

  on(UserActions.EditUser, (state, {updates}) =>
    adapter.updateOne(updates, state)
  ),

  on(UserActions.AddUser, (state, {user}) =>
    adapter.addOne(user, state)
  ),
);

export const reducer = (state: State, action: Action) => {
  return userReducer(state, action);
};

export const {selectEntities} = adapter.getSelectors();

// equal to the select all function from adapter.getSelectors()
export const selectAll = (state: EntityState<User>) =>
  (state.ids as number[]).map((id) => state.entities[id]);

export const selectById = (id) =>
  createSelector(selectEntities, (userEntries) => userEntries[id]);
