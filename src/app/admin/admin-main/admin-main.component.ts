import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../../services/auth/auth.service';

import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-admin-main',
  templateUrl: './admin-main.component.html',
  styleUrls: ['./admin-main.component.css']
})
export class AdminMainComponent implements OnInit {

  isAdmin: boolean;
  isAdminSubscription: Subscription;

  constructor(
    private authService : AuthService,
    private router : Router
  ) { }

  ngOnInit() {
    this.isAdminSubscription = this.authService.isAdmin
      .subscribe(isAdmin => {
        this.isAdmin = isAdmin;
        if (!this.isAdmin) {
          this.router.navigate(["/"]);
        }
      })
  }
}
