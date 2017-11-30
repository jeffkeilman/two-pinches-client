import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  // New user object. Used to fix template binding
  newUser = <any>{};

  constructor(private auth: AuthService) { }

  ngOnInit() {
  }

  signUp(myForm){
    this.auth.signUp(this.newUser.email, this.newUser.password, this.newUser.password_confirmation, myForm);
  }
}
