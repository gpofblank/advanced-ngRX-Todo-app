import { Component, OnInit } from '@angular/core';
import {RootState, selectUserById} from '../../root.state';
import {Store} from '@ngrx/store';
import {ActivatedRoute} from '@angular/router';
import {Todo} from '../../todos/models/todo';
import {User} from '../models/user';

@Component({
  selector: 'app-user-details-page',
  templateUrl: './user-details-page.component.html',
  styleUrls: ['./user-details-page.component.css']
})
export class UserDetailsPageComponent implements OnInit {

  public user: User;
  private userTodos: Todo[];

  constructor(private store: Store<RootState>, private route: ActivatedRoute ) {
    const userId = this.route.snapshot.params.id;

    this.store.select(selectUserById(userId))
      .subscribe((user) => this.user = user);

    // this.store.select(select)
  }

  ngOnInit(): void {
  }

}
