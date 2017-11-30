import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';

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

  changePassword() {
    this.auth.changePassword(this.oldPassword, this.newPassword);
  }

}
