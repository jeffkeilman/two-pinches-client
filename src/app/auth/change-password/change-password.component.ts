import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';

import * as Noty from 'noty';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {

  // Not bound to multiple inputs, no object needed
  oldPassword: string
  newPassword: string

  constructor(private auth: AuthService) { }

  ngOnInit() {
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
