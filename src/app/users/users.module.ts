import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AppRoutingModule} from '../app-routing.module';
import {StoreModule} from '@ngrx/store';
import * as fromUsers from '../users/reducers/user.reducer';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MaterialModule} from '../material/material.module';
import {DragDropModule} from '@angular/cdk/drag-drop';
import {RouterModule} from '@angular/router';
import {CreateUserPageComponent} from './create-user-page/create-user-page.component';
import {EditUserPageComponent} from './edit-user-page/edit-user-page.component';
import {ListUsersPageComponent} from './list-users-page/list-users-page.component';
import {UserDetailsPageComponent} from './user-details-page/user-details-page.component';
import {UserComponent} from './user/user.component';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';
import {environment} from '../../environments/environment';


@NgModule({
  declarations: [
    CreateUserPageComponent,
    EditUserPageComponent,
    ListUsersPageComponent,
    UserDetailsPageComponent,
    UserComponent,
  ],
  imports: [
    CommonModule,
    AppRoutingModule,
    StoreModule.forFeature('users', fromUsers.reducer),
    ReactiveFormsModule,
    FormsModule,
    MaterialModule,
    DragDropModule,
    RouterModule
  ]
})
export class UsersModule {
}
