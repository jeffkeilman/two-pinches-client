import { Component, OnInit } from '@angular/core';

import { AdminService } from '../../services/admin/admin.service';

@Component({
  selector: 'app-admin-search',
  templateUrl: './admin-search.component.html',
  styleUrls: ['./admin-search.component.css']
})
export class AdminSearchComponent implements OnInit {

  searchTerm: string = '';
  allRestaurants: any = [];
  searchRestaurants: any = [];

  constructor(
    private admin : AdminService
  ) { }

  ngOnInit() {
    // do the index, filter by given
    this.searchTerm = this.admin.getSearchTerm()
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

  deleteItem(id) {
    console.log(id);
  }

  editItem(id) {
    console.log(id);
  }
}
