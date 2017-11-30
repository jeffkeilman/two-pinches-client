import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { RestaurantService } from '../../services/restaurant/restaurant.service';
import { AuthService } from '../../services/auth/auth.service';

import * as Noty from 'noty';
import * as createDOMPurify from 'dompurify';
const DOMPurify = createDOMPurify(window);

@Component({
  selector: 'app-restaurant-show',
  templateUrl: './restaurant-show.component.html',
  styleUrls: ['./restaurant-show.component.css']
})
export class RestaurantShowComponent implements OnInit {

  restaurant: any = {};
  restaurantComments: any = [];
  userEmail: string = '';
  isAdmin: boolean = false;
  isLoggedIn: boolean = false;
  newComment: string = '';
  selectedComment: any = {};

  constructor(
    private restaurantService : RestaurantService,
    private authService : AuthService,
    private route : ActivatedRoute,
    private router : Router
  ) { }

  ngOnInit() {
    this.route.params.forEach((param) => {
      if (param.id) {
        this.restaurantService.show(param.id)
          .subscribe(
            data => {
              this.restaurant = data.json().restaurant;
              this.userEmail = this.authService.getUserEmail();
              if (this.userEmail) { this.isLoggedIn = true; }
              this.mapComments();
            },
            err => {
              new Noty({
                type: 'error',
                text: 'Couldn\'t find the restaurant to edit...',
                layout: 'topCenter',
                animation: {
                    open: 'animated bounceInDown',
                    close: 'animated bounceOutUp'
                },
                timeout: 3000
              }).show();
              this.router.navigate(["/restaurants"]);
            }
          )
      }
    })
  }

  addNewComment(form) {
    this.newComment = DOMPurify.sanitize(this.newComment);
    this.restaurantService.addComment(this.newComment, this.restaurant.id)
      .subscribe(
        data => {
          const comment = data.json().comment;
          comment.isOwner = this.userEmail === comment.user;
          this.restaurantComments.push(comment);
        },
        err => {
          new Noty({
            type: 'error',
            text: 'Couldn\'t post your comment...',
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

  editComment(id) {
    const comment = this.restaurantComments.find((comment) => comment._id === id);
    // make a shallow copy
    this.selectedComment = Object.assign({}, comment);
  }

  saveEdit() {
    this.restaurantService.editComment(this.selectedComment, this.restaurant.id)
      .subscribe(
        data => {
          const comment = data.json().comment;
          comment.isOwner = this.userEmail === comment.user;
          for (let x = 0; x < this.restaurantComments.length; x++) {
            if (this.restaurantComments[x]._id === comment._id) {
              this.restaurantComments.splice(x, 1, comment);
              break;
            }
          }
        },
        err => {
          new Noty({
            type: 'error',
            text: 'Couldn\'t update your comment...',
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

  deleteComment(id) {
    const comment = this.restaurantComments.find((comment) => comment._id === id);
    this.selectedComment = Object.assign({}, comment);
    this.restaurantService.deleteComment(this.selectedComment, this.restaurant.id)
      .subscribe(
        data => {
          for (let x = 0; x < this.restaurantComments.length; x++) {
            if (this.restaurantComments[x]._id === comment._id) {
              this.restaurantComments.splice(x, 1);
              break;
            }
          }
        },
        err => {
          new Noty({
            type: 'error',
            text: 'Couldn\'t delete your comment...',
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

  private mapComments() {
    if (this.restaurant.comments.length > 0) {
      this.restaurantComments = this.restaurant.comments.map((comment) => {
        comment.isOwner = this.userEmail === comment.user;
        return comment;
      });
    }
  }

}
