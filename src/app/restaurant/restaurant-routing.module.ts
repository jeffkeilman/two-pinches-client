import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { RestaurantMainComponent } from './restaurant-main/restaurant-main.component';

const routes: Routes = [
  {
    path: 'restaurants',
    component: RestaurantMainComponent,
    children: [

    ]
  }
]

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ]
})
export class RestaurantRoutingModule { }
