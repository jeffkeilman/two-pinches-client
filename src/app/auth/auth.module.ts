import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ChangePasswordComponent } from './change-password/change-password.component';

import { AuthService } from '../services/auth/auth.service';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FormsModule
  ],
  declarations: [
    LoginComponent,
    RegisterComponent,
    ChangePasswordComponent
  ],
  providers: [ AuthService ]
})
export class AuthModule { }
