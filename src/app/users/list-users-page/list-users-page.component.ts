import { Component, OnInit } from '@angular/core';
import {RootState, selectAllUsers} from '../../root.state';
import {Store} from '@ngrx/store';
import {User} from '../models/user';

@Component({
  selector: 'app-list-users-page',
  templateUrl: './list-users-page.component.html',
  styleUrls: ['./list-users-page.component.css']
})
export class ListUsersPageComponent implements OnInit {

  users: User[] = [];

  constructor(private store: Store<RootState>) {
    this.store
      .select(selectAllUsers)
      .subscribe((users) => (this.users = users));
  }

  ngOnInit(): void {
  }

}
