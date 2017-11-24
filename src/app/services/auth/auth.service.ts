import { Injectable, isDevMode } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';

import { environment } from '../../../environments/environment';

@Injectable()
export class AuthService {
  user: any

  constructor(
    private http: Http
  ) { }

  getUserToken() {
    return this.user.token
  }

  signIn(email: string, password: string) {
    // Create the credentials object.
    let credentials = {
      'credentials': {
        'email': email,
        'password': password
      }
    }

    // Make the post request. environment.apiServer contains the local server address http://localhost:4741
    this.http.post(environment.apiServer + '/sign-in', credentials)
      .subscribe(
        // Save the response to user
        response => this.user = JSON.parse(response['_body']).user,
        err => console.log(err)
      )
  }

  signUp(email: string, password: string, password_confirmation: string) {
    // Create the credentials object.
    const credentials = {
      'credentials': {
        'email': email,
        'password': password,
        'password_confirmation': password_confirmation
      }
    }

    // Make the post request. environment.apiServer contains the local server address http://localhost:4741
    this.http.post(environment.apiServer + '/sign-up', credentials)
      .subscribe(
        response => {
          // Send the existing credentials back to the server to log in the new user
          this.signIn(credentials.credentials.email, credentials.credentials.password)
        },
        err => console.log(err)
      )
  }

  signOut() {
    // Create the configuration object to be able to store the Headers > Authentication
    let config = {}

    // Set the headers key
    config['headers'] = { Authorization:'Token token=' + this.getUserToken()}
    // Make the delete request to URL, and add the token from Config.
    this.http.delete(environment.apiServer + '/sign-out/' + this.user.id, config)
      .subscribe(
        // Remove the logged in user.
        data => this.user = null,
        err => console.log(err)
      )
  }

  changePassword(oldPassword: string, newPassword: string) {
    // Create the passwords data object to send.
    let passwords = {
      'passwords': {
        'old': oldPassword,
        'new': newPassword
      }
    }

    // Create the configuration object to be able to store the Headers > Authentication
    let config = {}

    // Set the headers key
    config['headers'] = { Authorization:'Token token=' + this.getUserToken()}

    // Make the patch request to URL, add the password data and token from Config.
    this.http.patch(environment.apiServer + '/change-password/' + this.user.id, passwords, config)
      .subscribe(
        data => console.log('Success'),
        err => console.log(err)
      )
  }
}
