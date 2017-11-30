import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { environment } from '../../../environments/environment';

import { AuthService } from '../../services/auth/auth.service';

@Injectable()
export class RestaurantService {

  constructor(
    private http : Http,
    private auth : AuthService
  ) { }

  show(id) {
    return this.http.get(environment.apiServer + '/restaurants/' + id);
  }

  index() {
    return this.http.get(environment.apiServer + '/restaurants');
  }

  addComment(text: string, restaurantId: string) {
    // Create the configuration object to be able to store the Headers > Authentication
    let config = {}

    // Set the headers key
    config['headers'] = { Authorization:'Token token=' + this.auth.getUserToken()}

    return this.http.patch(environment.apiServer + '/add-comment/' + restaurantId, { text }, config);
  }

  editComment(editedComment, restaurantId) {
    // Create the configuration object to be able to store the Headers > Authentication
    let config = {}

    // Set the headers key
    config['headers'] = { Authorization:'Token token=' + this.auth.getUserToken()}

    return this.http.patch(environment.apiServer + '/edit-comment/' + restaurantId, editedComment, config);
  }

  deleteComment(comment, restaurantId) {
    // Create the configuration object to be able to store the Headers > Authentication
    let config = {}

    // Set the headers key
    config['headers'] = { Authorization:'Token token=' + this.auth.getUserToken()}

    return this.http.patch(environment.apiServer + '/remove-comment/' + restaurantId, comment, config);
  }

}
