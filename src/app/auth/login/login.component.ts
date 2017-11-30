import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  // User object. Used to fix template binding
  user = <any>{};


  constructor(private auth: AuthService) { }

  ngOnInit() {
  }

  signIn(myForm) {
    this.auth.signIn(this.user.email, this.user.password, myForm);
  }

}
