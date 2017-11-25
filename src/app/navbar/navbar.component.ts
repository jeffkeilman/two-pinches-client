import { Component, OnInit } from '@angular/core';

import { AuthService } from '../services/auth/auth.service';

import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  isLoggedIn: boolean;
  subscription: Subscription;

  constructor(
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.subscription = this.authService.isLoggedIn
      .subscribe(isLoggedIn => this.isLoggedIn = isLoggedIn);
  }

}
