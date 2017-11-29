import { Component, OnInit } from '@angular/core';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';

import { RestaurantService } from '../services/restaurant/restaurant.service';

import * as Noty from 'noty';

@Component({
  selector: 'ngbd-carousel-config',
  templateUrl: './carousel-config.component.html',
  styleUrls: ['./carousel-config.component.css'],
  providers: [NgbCarouselConfig] // add NgbCarouselConfig to the component providers
})
export class NgbdCarouselConfig implements OnInit {

  allRestaurants: any = [];
  featuredRestaurants: any = [];

  constructor(
    private config : NgbCarouselConfig,
    private restaurantService : RestaurantService
  ) {
    // customize default values of carousels used by this component tree
    config.interval = 10000;
    config.wrap = false;
    config.keyboard = false;
  }

  ngOnInit() {
    // do an index, get back all, filter by featured
    this.restaurantService.index()
      .subscribe(
        data => {
          this.allRestaurants = JSON.parse(data['_body']).restaurants;
          this.featuredRestaurants = this.allRestaurants.filter((restaurant) => {
            return restaurant.featured === true;
          })
          console.log(this.featuredRestaurants);
        },
        err => {
          new Noty({
            type: 'error',
            text: 'Couldn\'t load featured reviews...',
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
