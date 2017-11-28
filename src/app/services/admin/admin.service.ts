import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { AuthService } from '../auth/auth.service';
import { environment } from '../../../environments/environment';

import * as Noty from 'noty';

@Injectable()
export class AdminService {

  constructor(
    private auth : AuthService,
    private http : Http
  ) { }

  createRestaurant(newRestaurant) {
    const userToken = this.auth.getUserToken();

    if (userToken) {
      const config = {};
      config['headers'] = { Authorization: 'Token token=' + userToken};
      return this.http.post(environment.apiServer + '/restaurants', newRestaurant, config);
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

  show(id) {
    return this.http.get(environment.apiServer + '/restaurants/' + id);
  }

  index() {
    return this.http.get(environment.apiServer + '/restaurants');
  }

  delete(id) {
    const userToken = this.auth.getUserToken();

    if (userToken) {
      const config = {};
      config['headers'] = { Authorization: 'Token token=' + userToken};
      return this.http.delete(environment.apiServer + '/restaurants/' + id, config)
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

  edit(updatedRestaurant) {
    const userToken = this.auth.getUserToken();

    if (userToken) {
      const config = {};
      config['headers'] = { Authorization: 'Token token=' + userToken};
      return this.http.patch(environment.apiServer + '/restaurants/' + updatedRestaurant.id, updatedRestaurant, config);
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

}
