import {Component, OnDestroy, OnInit} from '@angular/core';
import {User} from '../models/user';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {Store} from '@ngrx/store';
import {RootState, selectUserById} from '../../root.state';
import * as UserActions from '../actions/user.actions';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-edit-user-page',
  templateUrl: './edit-user-page.component.html',
  styleUrls: ['./edit-user-page.component.css']
})
export class EditUserPageComponent implements OnInit, OnDestroy {

  private selectUserByIdSub$: Subscription;
  private userId;

  public user: User;
  public userEditForm: FormGroup;
  public createdAt: FormControl;
  public text: FormControl;

  constructor(private fb: FormBuilder, private route: ActivatedRoute, private store: Store<RootState>, private router: Router) {

    this.userId = this.route.snapshot.params.id;

    this.store.select(selectUserById(this.userId))
      .subscribe((user) => this.user = user);

    if (!this.user) {
      this.router.navigateByUrl('/users');
    }

    this.userEditForm = this.fb.group({
      name: this.user.name,
      email: this.user.email,
    });
  }

  ngOnInit() {
    const btn = document.getElementById('saveUser');
    document.body.onkeydown = (e) => {
      if (e.key === 'Enter') {btn.click()}
    };
  }

  submit() {
    if (this.userEditForm.valid) {
      const id = this.userId;
      const changes: User = this.userEditForm.value;

      this.store.dispatch(UserActions.EditUser({updates: {id, changes}}));

      this.router.navigateByUrl('/users');
    }
  }

  ngOnDestroy() {
    if (this.selectUserByIdSub$) {
      this.selectUserByIdSub$.unsubscribe();
    }
  }
}
