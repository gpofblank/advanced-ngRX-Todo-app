import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {TodoListPageComponent} from './todos/todo-list-page/todo-list-page.component';
import {StartComponent} from './start/start.component';
import {TodoEditPageComponent} from './todos/todo-edit-page/todo-edit-page.component';
import {ListUsersPageComponent} from './users/list-users-page/list-users-page.component';
import {CreateUserPageComponent} from './users/create-user-page/create-user-page.component';
import {EditUserPageComponent} from './users/edit-user-page/edit-user-page.component';
import {UserDetailsPageComponent} from './users/user-details-page/user-details-page.component';

const routes: Routes = [
  // start
  {path: '', component: StartComponent},
  // todos
  {
    path: 'todos',
    children: [
      {path: '', component: TodoListPageComponent},
      {path: 'edit/:id', component: TodoEditPageComponent},
    ],
  },
  // users
  {
    path: 'users',
    children: [
      {path: '', component: ListUsersPageComponent},
      {path: 'create', component: CreateUserPageComponent},
      {path: 'edit/:id', component: EditUserPageComponent},
      {path: 'details/:id', component: UserDetailsPageComponent},
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})

export class AppRoutingModule {
}
