import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AdminMainComponent } from './admin-main/admin-main.component';
import { AdminNewComponent } from './admin-new/admin-new.component';

const routes: Routes = [
  {
    path: 'admin',
    component: AdminMainComponent,
    children: [ //create the sub sections (children) for this route
      {
          path: 'new',
          component: AdminNewComponent
      }
    ]
  }
]

@NgModule({
  imports: [ RouterModule.forChild(routes) ], // Will I need to change to forRoot?
  exports: [ RouterModule ]
})
export class AdminRoutingModule { }
