import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { RestaurantMainComponent } from './restaurant-main/restaurant-main.component';

import { RestaurantService } from '../services/restaurant/restaurant.service';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FormsModule
  ],
  declarations: [
    RestaurantMainComponent
  ],
  providers: [ RestaurantService ]
})
export class RestaurantModule { }
