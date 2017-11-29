import { Component, OnInit } from '@angular/core';

import { RestaurantService } from '../../services/restaurant/restaurant.service';

@Component({
  selector: 'app-restaurant-main',
  templateUrl: './restaurant-main.component.html',
  styleUrls: ['./restaurant-main.component.css']
})
export class RestaurantMainComponent implements OnInit {

  restaurants: any = [];

  constructor(
    private restaurantService : RestaurantService
  ) { }

  ngOnInit() {
    this.restaurantService.index()
      .subscribe(
        data => {
          this.restaurants = JSON.parse(data['_body']).restaurants;
          console.log(this.restaurants);
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

}
