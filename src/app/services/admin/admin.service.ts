import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Router } from '@angular/router';

import { AuthService } from '../auth/auth.service';
import { environment } from '../../../environments/environment';

import * as Noty from 'noty';

@Injectable()
export class AdminService {

  constructor(
    private auth : AuthService,
    private http : Http,
    private router : Router
  ) { }

  createRestaurant(newRestaurant) {
    const userToken = this.auth.getUserToken();

    if (userToken) {
      const config = {};
      config['headers'] = { Authorization: 'Token token=' + this.auth.getUserToken()};
      this.http.post(environment.apiServer + '/restaurants', newRestaurant, config)
        .subscribe(
          data => {
            new Noty({
              type: 'success',
              text: 'New review added!',
              layout: 'topCenter',
              animation: {
                  open: 'animated bounceInDown',
                  close: 'animated bounceOutUp'
              },
              timeout: 3000
            }).show();
            this.router.navigate(["/admin"]);
          },
          err => {
            new Noty({
              type: 'error',
              text: 'Couldn\'t add new review...',
              layout: 'topCenter',
              animation: {
                  open: 'animated bounceInDown',
                  close: 'animated bounceOutUp'
              },
              timeout: 3000
            }).show();
          }
        );
    } else {
      new Noty({
        type: 'error',
        text: 'You shouldn\'t be here! Please log in as an admin.',
        layout: 'topCenter',
        animation: {
            open: 'animated bounceInDown',
            close: 'animated bounceOutUp'
        },
        timeout: 3000
      }).show();
    }
  }

  index() {
    this.http.get(environment.apiServer + '/restaurants')
      .subscribe(
        data => {
          console.log(data)
        },
        err => {
          console.error(err)
        }
      )
  }
}
