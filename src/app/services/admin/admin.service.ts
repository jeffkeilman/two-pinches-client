import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { AuthService } from '../auth/auth.service';
import { environment } from '../../../environments/environment';

@Injectable()
export class AdminService {

  constructor(
    private auth : AuthService,
    private http : Http
  ) { }

  createRestaurant(newRestaurant) {
    const config = {};
    // Set the headers key
    config['headers'] = { Authorization: 'Token token=' + this.auth.getUserToken()};

    this.http.post(environment.apiServer + '/restaurants', newRestaurant, config)
      .subscribe(
        data => console.log,
        err => console.error
      );
  }
}
