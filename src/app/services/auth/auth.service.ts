import { Injectable, isDevMode } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Http } from '@angular/http';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Router } from '@angular/router';

import { environment } from '../../../environments/environment';

import * as Noty from 'noty';
import * as createDOMPurify from 'dompurify';
const DOMPurify = createDOMPurify(window);

@Injectable()
export class AuthService {
  user: any;

  private loggedIn = new BehaviorSubject<boolean>(false);
  private admin = new BehaviorSubject<boolean>(false);

  get isLoggedIn() {
   return this.loggedIn.asObservable();
  }

  get isAdmin() {
    return this.admin.asObservable();
  }

  constructor(
    private http : Http,
    private router : Router
  ) { }

  getUserToken() {
    if (this.user) {
      return this.user.token;
    } else {
      return null;
    }
  }

  signIn(email: string, password: string, form: any) {
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
        response => {
          this.user = JSON.parse(response['_body']).user
          this.loggedIn.next(true);
          if (this.user.admin) {
            this.admin.next(true);
            this.router.navigate(["/admin"]);
          } else {
            this.admin.next(false);
            this.router.navigate(["/"]);
          }
        },
        err => {
          new Noty({
            type: 'error',
            text: 'Couldn\'t sign in...',
            layout: 'topCenter',
            animation: {
                open: 'animated bounceInDown',
                close: 'animated bounceOutUp'
            },
            timeout: 3000
          }).show();
        }
      )
      if (form) {
        form.reset();
      }
  }

  signUp(email: string, password: string, password_confirmation: string, form: any) {
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
          this.signIn(credentials.credentials.email, credentials.credentials.password, null);
        },
        err => {
          new Noty({
            type: 'error',
            text: 'Couldn\'t sign up...',
            layout: 'topCenter',
            animation: {
                open: 'animated bounceInDown',
                close: 'animated bounceOutUp'
            },
            timeout: 3000
          }).show();
        }
      )
      form.reset();
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
        data => {
          this.user = null;
          this.loggedIn.next(false);
          this.admin.next(false);
          this.router.navigate(["/"]);
        },
        err => {
          new Noty({
            type: 'error',
            text: 'Couldn\'t log out...',
            layout: 'topCenter',
            animation: {
                open: 'animated bounceInDown',
                close: 'animated bounceOutUp'
            },
            timeout: 3000
          }).show();
        }
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
    return this.http.patch(environment.apiServer + '/change-password/' + this.user.id, passwords, config);
  }
}
