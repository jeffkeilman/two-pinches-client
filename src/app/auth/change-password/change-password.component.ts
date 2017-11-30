import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

import { AuthService } from '../../services/auth/auth.service';

import * as Noty from 'noty';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {

  // Not bound to multiple inputs, no object needed
  oldPassword: string;
  newPassword: string;
  isLoggedIn: boolean;
  loggedInSubscription: Subscription;

  constructor(
    private auth : AuthService,
    private router : Router
  ) { }

  ngOnInit() {
    this.loggedInSubscription = this.auth.isLoggedIn
      .subscribe(isLoggedIn => {
        this.isLoggedIn = isLoggedIn;
        if (!this.isLoggedIn) {
          this.router.navigate(["/"]);
        }
      });
  }

  changePassword(myForm) {
    this.auth.changePassword(this.oldPassword, this.newPassword)
    .subscribe(
      data => {
        new Noty({
          type: 'success',
          text: 'Changed your password!',
          layout: 'topCenter',
          animation: {
              open: 'animated bounceInDown',
              close: 'animated bounceOutUp'
          },
          timeout: 3000
        }).show();
      },
      err => {
        new Noty({
          type: 'error',
          text: 'Couldn\'t change your password...',
          layout: 'topCenter',
          animation: {
              open: 'animated bounceInDown',
              close: 'animated bounceOutUp'
          },
          timeout: 3000
        }).show();
      }
    )
    myForm.reset();
  }

}
