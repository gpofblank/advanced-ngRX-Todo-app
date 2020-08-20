import {Component, OnInit} from '@angular/core';
import {User} from '../models/user';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {Store} from '@ngrx/store';
import {RootState, selectUserById} from '../../root.state';
import * as UserActions from '../actions/user.actions';

@Component({
  selector: 'app-edit-user-page',
  templateUrl: './edit-user-page.component.html',
  styleUrls: ['./edit-user-page.component.css']
})
export class EditUserPageComponent implements OnInit {

  private userId;
  public user: User =
    {
      id: 0,
      name: '',
      email: '',
      tasks: []
    };

  public userEditForm: FormGroup;
  public createdAt: FormControl;
  public text: FormControl;

  constructor(private fb: FormBuilder, private route: ActivatedRoute, private store: Store<RootState>, private router: Router) {

    this.userId = this.route.snapshot.params.id;

    this.store.select(selectUserById(this.userId))
      .subscribe((user) => this.user = user);

    this.userEditForm = this.fb.group({
      name: this.user.name,
      email: this.user.email,
      tasks: this.user.tasks,
    });
  }

  ngOnInit() {
  }

  submit() {
    if (this.userEditForm.valid) {
      const id = this.userId;
      const changes: User = this.userEditForm.value;

      this.store.dispatch(UserActions.EditUser({updates: {id, changes}}));

      this.router.navigateByUrl('/users');
    }
  }
}
