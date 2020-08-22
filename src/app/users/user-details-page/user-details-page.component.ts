import {Component, OnDestroy, OnInit} from '@angular/core';
import {RootState, selectAllTodos, selectTodosByUserId, selectUserById} from '../../root.state';
import {Store} from '@ngrx/store';
import {ActivatedRoute, Router} from '@angular/router';
import {Todo} from '../../todos/models/todo';
import {User} from '../models/user';
import {Subscription} from 'rxjs';
import {animate, state, style, transition, trigger} from '@angular/animations';

@Component({
  selector: 'app-user-details-page',
  templateUrl: './user-details-page.component.html',
  styleUrls: ['./user-details-page.component.css'],
  animations: [
    // the fade-in/fade-out animation.
    trigger('fadeAnimation', [

      // the "in" style determines the "resting" state of the element when it is visible.
      state('in', style({opacity: 1})),

      // fade in when created. this could also be written as transition('void => *')
      transition(':enter', [
        style({opacity: 0}),
        animate(800)
      ]),

      // fade out when destroyed. this could also be written as transition('void => *')
      transition(':leave',
        animate(600, style({opacity: 0})))
    ])
  ]
})
export class UserDetailsPageComponent implements OnInit, OnDestroy {

  private userId: number;

  public user: User;
  public todos: Todo[];

  // subs
  private userByIdSub$: Subscription;
  private selectTodosByUserIdSub$: Subscription;

  constructor(private store: Store<RootState>, private route: ActivatedRoute, private router: Router) {
    this.userId = this.route.snapshot.params.id;

    this.router.routeReuseStrategy.shouldReuseRoute = () => false;

    this.userByIdSub$ = this.store.select(selectUserById(this.userId))
      .subscribe((user) => this.user = user);

    if (!this.user) {
      this.router.navigateByUrl('/users');
    }

    this.selectTodosByUserIdSub$ = this.store.select(selectTodosByUserId(this.user.id))
       .subscribe((todos) => this.todos = todos);
  }

  ngOnInit(): void {
  }

  ngOnDestroy() {
    if (this.userByIdSub$) {
      this.userByIdSub$.unsubscribe();
    }
    if (this.selectTodosByUserIdSub$) {
      this.selectTodosByUserIdSub$.unsubscribe();
    }
  }

}
