import {Component, Input, OnInit} from '@angular/core';
import {Todo} from '../models/todo';

import { Store } from '@ngrx/store';
import * as TodoActions from '../actions/todo.actions';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {
  @Input() todo: Todo;

  constructor(private store: Store) {
  }

  public onComplete() {
    this.store.dispatch(TodoActions.EditTodo({ updates: { id: this.todo.id, changes: {completed: true}}}));
  }

  public cancel() {
    this.store.dispatch(TodoActions.EditTodo({ updates: { id: this.todo.id, changes: {completed: false}}}));
  }

  ngOnInit(): void {}
}

