import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {StoreModule} from '@ngrx/store';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';

import {environment} from '../environments/environment';
import {MaterialModule} from './material/material.module';
import {StartComponent} from './start/start.component';
import {TodosModule} from './todos/todos.module';
import {RouterModule} from '@angular/router';

import * as fromUsers from './users/reducers/user.reducer';
import * as fromTodos from './todos/reducers/todo.reducer';


@NgModule({
  declarations: [
    AppComponent, StartComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    StoreModule.forRoot({}, {}),
    StoreDevtoolsModule.instrument({maxAge: 25, logOnly: environment.production}),
    MaterialModule,
    TodosModule,
    RouterModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
