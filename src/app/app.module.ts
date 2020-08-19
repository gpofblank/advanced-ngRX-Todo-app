import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {TodoListPageComponent} from './todos/todo-list-page/todo-list-page.component';
import {TodoComponent} from './todos/todo/todo.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatButtonModule} from '@angular/material/button';
import {StartComponent} from './start/start.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {StoreModule} from '@ngrx/store';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';

import {environment} from '../environments/environment';
import {todoReducerState} from './todos/reducers/todo.reducer';
import { TodoEditPageComponent } from './todos/todo-edit-page/todo-edit-page.component';
import {MatCardModule} from '@angular/material/card';
import {MatIconModule} from '@angular/material/icon';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import {DragDropModule} from '@angular/cdk/drag-drop';
import { CreateUserPageComponent } from './users/create-user-page/create-user-page.component';

@NgModule({
  declarations: [
    AppComponent,
    TodoListPageComponent,
    TodoComponent,
    StartComponent,
    TodoEditPageComponent,
    CreateUserPageComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    StoreModule.forRoot({todoReducerState}),
    StoreDevtoolsModule.instrument({maxAge: 25, logOnly: environment.production}),
    MatCardModule,
    MatIconModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    DragDropModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
