import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { RestaurantMainComponent } from './restaurant-main/restaurant-main.component';
import { RestaurantShowComponent } from './restaurant-show/restaurant-show.component';

import { RestaurantService } from '../services/restaurant/restaurant.service';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FormsModule
  ],
  declarations: [
    RestaurantMainComponent,
    RestaurantShowComponent
  ],
  providers: [ RestaurantService ]
})
export class RestaurantModule { }
