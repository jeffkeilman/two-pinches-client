import { Component, OnInit } from '@angular/core';

import { AuthService } from '../services/auth/auth.service';

import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  isLoggedIn: boolean;
  isAdmin: boolean;
  loggedInSubscription: Subscription;
  adminSubscription: Subscription;

  constructor(
    private authService : AuthService
  ) { }

  ngOnInit() {
    this.loggedInSubscription = this.authService.isLoggedIn
      .subscribe(isLoggedIn => this.isLoggedIn = isLoggedIn);
    this.adminSubscription = this.authService.isAdmin
      .subscribe(isAdmin => this.isAdmin = isAdmin );
  }

  logOut() {
    this.authService.signOut();
  }

}
