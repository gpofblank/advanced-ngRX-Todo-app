import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {TodoListPageComponent} from './todos/todo-list-page/todo-list-page.component';
import {AppComponent} from './app.component';
import {StartComponent} from './start/start.component';
import {TodoEditPageComponent} from './todos/todo-edit-page/todo-edit-page.component';


const routes: Routes = [
  {path: '', component: StartComponent},
  {path: 'todos', component: TodoListPageComponent},
  {path: 'todos/edit/:id', component: TodoEditPageComponent},
  // {path: 'users', component: U}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
