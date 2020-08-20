import {Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Todo} from '../models/todo';
import {Store} from '@ngrx/store';
import * as TodoActions from '../actions/todo.actions';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {CdkDragDrop} from '@angular/cdk/drag-drop';
import {RootState, selectAllTodos, selectAllUsers} from 'src/app/root.state';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {FormControl} from '@angular/forms';
import {MatAutocomplete, MatAutocompleteSelectedEvent} from '@angular/material/autocomplete';
import {Observable, scheduled, Subscription, throwError} from 'rxjs';
import {filter, map, startWith} from 'rxjs/operators';
import {MatChipInputEvent} from '@angular/material/chips';
import {User} from '../../users/models/user';




@Component({
  selector: 'app-todo-list-page',
  templateUrl: './todo-list-page.component.html',
  styleUrls: ['./todo-list-page.component.css'],
  animations: [
    // the fade-in/fade-out animation.
    trigger('fadeAnimation', [

      // the "in" style determines the "resting" state of the element when it is visible.
      state('in', style({opacity: 1})),

      // fade in when created. this could also be written as transition('void => *')
      transition(':enter', [
        style({opacity: 0}),
        animate(800 )
      ]),

      // fade out when destroyed. this could also be written as transition('void => *')
      transition(':leave',
        animate(600, style({opacity: 0})))
    ])
  ]
})
export class TodoListPageComponent implements OnInit, OnDestroy {

  // subs
  selectAllTodosSub$: Subscription;
  selectAllUsers$: Subscription;

  public todoText = '';

  todos: Todo[] = [];

  // chips stuff
  visible = true;
  selectable = true;
  removable = true;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  userCtrl = new FormControl();
  filteredUsers: Observable<string[]>;
  users: string[] = [];
  allUsersNames: string[] = [];

  @ViewChild('userInput') userInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto') matAutocomplete: MatAutocomplete;
  //

  private allUsers: User[] = [];

  constructor(private store: Store<RootState>) {
    this.selectAllTodosSub$ = this.store
      .select(selectAllTodos)
      .subscribe((todos) => (this.todos = todos));

    this.selectAllUsers$ = this.store
      .select(selectAllUsers)
      .subscribe((users) => {
        this.allUsers = users;
        users.map((u) => this.allUsersNames.push(u.name));
      }
  );

    this.filteredUsers = this.userCtrl.valueChanges.pipe(
      startWith(null),
      map((user: string | null) => user ? this._filter(user) : this.allUsersNames.slice()));
  }

  ngOnInit() {

    // this.store.select((state: any) => state)
    //   .subscribe((data) => {
    //     console.log(data);
    //     if (data) {
    //       this.todos = data.todoReducerState.todos;
    //     }
    //   });

    const btn = document.getElementById('addTodo');
    document.body.onkeydown = (e) => {
      if (e.key === 'Enter') {btn.click()}
    };

  }

  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    // Add our user
    if ((value || '').trim()) {
      this.users.push(value.trim());
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }

    this.userCtrl.setValue(null);
  }

  remove(user: string): void {
    const index = this.users.indexOf(user);

    if (index >= 0) {
      this.users.splice(index, 1);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.users.push(event.option.viewValue);
    this.userInput.nativeElement.value = '';
    this.userCtrl.setValue(null);
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.allUsersNames.filter(user => user.toLowerCase().indexOf(filterValue) === 0);
  }

  public addTodo() {
    if (this.todoText.length == 0) {
      return;
    }

    const id = Math.random();
    const createdForIds = this.allUsers.filter(u => this.users.includes(u.name)).map(u => u.id);
    const createdForNames = this.users;

    const todo: Todo = {
      id,
      text: this.todoText,
      completed: false,
      createdAt: new Date(),
      createdForIds,
      createdForNames
    };

    this.store.dispatch(TodoActions.AddTodo({todo}));

    this.todoText = '';
    this.userCtrl.setValue(null);
    this.users = [];
  }

  drop(event: CdkDragDrop<Todo[]>) {
    console.log('event -> ', event);
    console.log('data -> ', event.item.data);

    const prevIndex = event.previousIndex;
    const currIndex = event.currentIndex;

    // moveItemInArray(this.todos, prevIndex, currIndex);
    this.store.dispatch(TodoActions.ReorderTodo({prevIndex, currIndex}))
  }

  ngOnDestroy() {
    this.selectAllUsers$.unsubscribe();
    this.selectAllTodosSub$.unsubscribe();
  }

}
