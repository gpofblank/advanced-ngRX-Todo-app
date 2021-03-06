import {Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {Store} from '@ngrx/store';
import {Todo} from '../models/todo';
import * as TodoActions from '../actions/todo.actions';
import {RootState, selectAllUsers, selectTodoById} from '../../root.state';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {Observable, Subscription} from 'rxjs';
import {MatAutocomplete, MatAutocompleteSelectedEvent} from '@angular/material/autocomplete';
import {User} from '../../users/models/user';
import {MatChipInputEvent} from '@angular/material/chips';
import {map, startWith} from 'rxjs/operators';

@Component({
  selector: 'app-todo-edit-page',
  templateUrl: './todo-edit-page.component.html',
  styleUrls: ['./todo-edit-page.component.css']
})
export class TodoEditPageComponent implements OnInit, OnDestroy {

  public todo: Todo;
  public todoEditForm: FormGroup;
  public createdAt: FormControl;
  public text: FormControl;
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
  private todoId: number;
  //
  private allUsers: User[] = [];

  // subs
  private selectAllUsersSub$: Subscription;
  private selectTodoByIdSub$: Subscription;

  constructor(private fb: FormBuilder, private route: ActivatedRoute, private store: Store<RootState>, private router: Router) {
    this.todoId = this.route.snapshot.params.id;

    this.selectTodoByIdSub$ = this.store.select(selectTodoById(this.todoId)).subscribe((todo) => {
      this.todo = todo;

      if (!this.todo) {
        this.router.navigateByUrl('/todos');
      } else {
        this.users = todo.users.map(u => u.name);
      }
    });

    this.selectAllUsersSub$ = this.store
      .select(selectAllUsers)
      .subscribe((users) => {
        this.allUsers = users;
        users.map((u) => this.allUsersNames.push(u.name));
      });

    this.filteredUsers = this.userCtrl.valueChanges.pipe(
      startWith(null),
      map((user: string | null) => user ? this._filter(user) : this.allUsersNames.slice()));
  }

  ngOnInit() {

    this.todoEditForm = this.fb.group({
      createdAt: this.todo.createdAt,
      text: this.todo.text,
      users: [this.users]
    });

    const btn = document.getElementById('saveTodo');
    document.body.onkeydown = (e) => {
      if (e.key === 'Enter') {
        btn.click();
      }
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
    console.log(index);

    if (index >= 0) {
      this.users.splice(index, 1);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.users.push(event.option.viewValue);
    this.userInput.nativeElement.value = '';
    this.userCtrl.setValue(null);
  }

  submit() {
    if (this.todoEditForm.valid) {
      const id = this.todoId;

      const userNamesToArrOfUsers = this.allUsers.filter((u) => this.users.some(uName => uName == u.name));
      this.todoEditForm.patchValue({users: userNamesToArrOfUsers});

      const changes: Partial<Todo> = this.todoEditForm.value;

      this.store.dispatch(TodoActions.EditTodo({
          updates: {id, changes},
        })
      );
      this.router.navigateByUrl('/todos');
    }
  }

  ngOnDestroy() {
    if (this.selectTodoByIdSub$) {
      this.selectTodoByIdSub$.unsubscribe();
    }
    if (this.selectAllUsersSub$) {
      this.selectAllUsersSub$.unsubscribe();
    }
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.allUsersNames.filter(user => user.toLowerCase().indexOf(filterValue) === 0);
  }
}
