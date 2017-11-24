import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth/auth.service'



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  // New user object. Used to fix template binding
  newUser = <any>{};
  // User object. Used to fix template binding
  user = <any>{};

  // Not bound to multiple inputs, no object needed
  oldPassword: string
  newPassword: string
  constructor(private auth: AuthService) { }

  ngOnInit() {
  }

  signOut() {
    this.auth.signOut();
  }

  signIn() {
    this.auth.signIn(this.user.email, this.user.password)
  }

  changePassword() {
    this.auth.changePassword(this.oldPassword, this.newPassword)
  }

  signUp(){
    this.auth.signUp(this.newUser.email, this.newUser.password, this.newUser.password_confirmation)
  }
}
