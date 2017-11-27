import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { AdminMainComponent } from './admin-main/admin-main.component';
import { AdminNewComponent } from './admin-new/admin-new.component';

import { AdminService } from '../services/admin/admin.service';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FormsModule
  ],
  declarations: [
    AdminMainComponent,
    AdminNewComponent
  ],
  providers: [ AdminService ]
})
export class AdminModule { }
