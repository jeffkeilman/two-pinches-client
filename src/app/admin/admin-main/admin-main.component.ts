import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AdminService } from '../../services/admin/admin.service';

import * as Noty from 'noty';
import * as createDOMPurify from 'dompurify';
const DOMPurify = createDOMPurify(window);

@Component({
  selector: 'app-admin-main',
  templateUrl: './admin-main.component.html',
  styleUrls: ['./admin-main.component.css']
})
export class AdminMainComponent implements OnInit {

  searchTerm: string = '';
  allRestaurants: any = [];
  searchRestaurants: any = [];

  constructor(
    private router : Router,
    private admin : AdminService
  ) { }

  ngOnInit() {
  }

  onSearch(searchBox) {
    this.searchRestaurants = [];
    this.allRestaurants = [];
    this.searchTerm = DOMPurify.sanitize(this.searchTerm);
    this.searchTerm = this.searchTerm.trim();

    this.admin.index()
      .subscribe(
        data => {
          this.allRestaurants = JSON.parse(data['_body']).restaurants;
          if (!this.searchTerm) {
            // just return all restaurants
            this.searchRestaurants = this.allRestaurants.slice();
          } else {
            this.allRestaurants.forEach((restaurant) => {
              if (restaurant.name.search(new RegExp(this.searchTerm, 'i')) >= 0) {
                this.searchRestaurants.push(restaurant);
              }
            })
          }
          if (this.searchRestaurants.length === 0) {
            new Noty({
              type: 'warning',
              text: 'No restaurants found with that name...',
              layout: 'topCenter',
              animation: {
                  open: 'animated bounceInDown',
                  close: 'animated bounceOutUp'
              },
              timeout: 3000
            }).show();
          }
        },
        err => {
          new Noty({
            type: 'error',
            text: 'Unable to grab reviews...',
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

  editRestaurant(id) {
    console.log(id);
  }

  deleteRestaurant(id) {
    this.admin.delete(id)
      .subscribe(
        data => {
          for (let x = 0; x < this.searchRestaurants.length; x++) {
            if (this.searchRestaurants[x].id === id) {
              this.searchRestaurants.splice(x, 1);
              break;
            }
          }
          new Noty({
            type: 'success',
            text: 'Deleted the review!',
            layout: 'topCenter',
            animation: {
                open: 'animated bounceInDown',
                close: 'animated bounceOutUp'
            },
            timeout: 3000
          }).show();
        },
        err => {
          new Noty({
            type: 'error',
            text: 'Unable to delete review...',
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

}
