import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { RestaurantService } from '../../services/restaurant/restaurant.service';

import * as Noty from 'noty';

@Component({
  selector: 'app-restaurant-show',
  templateUrl: './restaurant-show.component.html',
  styleUrls: ['./restaurant-show.component.css']
})
export class RestaurantShowComponent implements OnInit {

  restaurant: any = {};

  constructor(
    private restaurantService : RestaurantService,
    private route : ActivatedRoute,
    private router : Router
  ) { }

  ngOnInit() {
    // COME BACK TO ME
    this.route.params.forEach((param) => {
      if (param.id) {
        this.restaurantService.show(param.id)
          .subscribe(
            data => {
              this.restaurant = data.json().restaurant;
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
            }
          )
      }
    })
    if (!this.restaurant) {
      this.router.navigate(["/restaurants"]);
    }
  }

}
