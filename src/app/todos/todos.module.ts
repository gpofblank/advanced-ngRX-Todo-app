import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import * as fromTodos from './reducers/todo.reducer';
import {StoreModule} from '@ngrx/store';
import {TodoListPageComponent} from './todo-list-page/todo-list-page.component';
import {TodoEditPageComponent} from './todo-edit-page/todo-edit-page.component';
import {TodoComponent} from './todo/todo.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MaterialModule} from '../material/material.module';
import {DragDropModule} from '@angular/cdk/drag-drop';
import {AppRoutingModule} from '../app-routing.module';
import {RouterModule} from '@angular/router';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';


@NgModule({
  declarations: [
    TodoListPageComponent,
    TodoEditPageComponent,
    TodoComponent,
  ],
  exports: [
    TodoComponent
  ],
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    StoreModule.forFeature('todos', fromTodos.reducer),
    ReactiveFormsModule,
    FormsModule,
    MaterialModule,
    DragDropModule,
    RouterModule
  ]
})
export class TodosModule { }
