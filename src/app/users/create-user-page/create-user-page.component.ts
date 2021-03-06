import { Component, OnInit } from '@angular/core';
import {User} from '../../users/models/user';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {Store} from '@ngrx/store';
import {RootState, selectUserById} from '../../root.state';
import * as UserActions from '../../users/actions/user.actions';
import * as TodoActions from '../../todos/actions/todo.actions';

@Component({
  selector: 'app-create-user-page',
  templateUrl: './create-user-page.component.html',
  styleUrls: ['./create-user-page.component.css']
})
export class CreateUserPageComponent implements OnInit {
  public user: User =
    {
      id: 0,
      name: '',
      email: '',
    };

  public userAddForm: FormGroup;
  public createdAt: FormControl;
  public text: FormControl;

  constructor(private fb: FormBuilder, private route: ActivatedRoute, private store: Store<RootState>, private router: Router) {

    this.userAddForm = this.fb.group({
      name: [this.user.name, Validators.required],
      email: [this.user.email, Validators.email],
    });
  }

  ngOnInit() {
  }

  submit() {
    if (this.userAddForm.valid) {
      const id: number = Math.random();
      const userPartial: User = this.userAddForm.value;
      const user: User = {id, ...userPartial};

      this.store.dispatch(UserActions.AddUser({user}));

      this.router.navigateByUrl('/users');
    }
  }
}
