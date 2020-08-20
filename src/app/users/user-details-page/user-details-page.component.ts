import {Component, OnDestroy, OnInit} from '@angular/core';
import {RootState, selectAllTodos, selectUserById} from '../../root.state';
import {Store} from '@ngrx/store';
import {ActivatedRoute} from '@angular/router';
import {Todo} from '../../todos/models/todo';
import {User} from '../models/user';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-user-details-page',
  templateUrl: './user-details-page.component.html',
  styleUrls: ['./user-details-page.component.css']
})
export class UserDetailsPageComponent implements OnInit, OnDestroy{

  // subs
  private userByIdSub$: Subscription;
  private allTodos$: Subscription;
  // private selectUserTodosSub$: Subscription;

  private rawTodos: Todo[];

  public user: User;
  public todos: Todo[];


  constructor(private store: Store<RootState>, private route: ActivatedRoute ) {
    const userId = this.route.snapshot.params.id;

    this.userByIdSub$ = this.store.select(selectUserById(userId))
      .subscribe((user) => this.user = user);

    this.allTodos$ = this.store.select(selectAllTodos)
      .subscribe((rawT) => this.rawTodos = rawT);

    this.todos = this.rawTodos.filter((t) => t.createdForNames.includes(this.user.name));

    // this.selectUserTodosSub$ = this.store.select(selectUserTodos(this.user.id))
    //   .subscribe((todos) => this.todos = todos);
  }

  ngOnInit(): void {
  }

  ngOnDestroy() {
    this.userByIdSub$.unsubscribe();
    this.allTodos$.unsubscribe();
    // this.selectUserTodosSub$.unsubscribe();
  }

}
