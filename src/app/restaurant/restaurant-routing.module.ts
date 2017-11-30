import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { RestaurantMainComponent } from './restaurant-main/restaurant-main.component';
import { RestaurantShowComponent } from './restaurant-show/restaurant-show.component';

const routes: Routes = [
  {
    path: 'restaurants',
    component: RestaurantMainComponent
  },
  {
    path: 'restaurants/:id',
    component: RestaurantShowComponent
  }
]

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ]
})
export class RestaurantRoutingModule { }
