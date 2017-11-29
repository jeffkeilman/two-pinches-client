import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppRoutingModule } from './app-routing.module';
import { AdminRoutingModule } from './admin/admin-routing.module';
import { AdminModule } from './admin/admin.module';
import { RestaurantModule } from './restaurant/restaurant.module';
import { RestaurantRoutingModule } from './restaurant/restaurant-routing.module';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { AuthService } from './services/auth/auth.service';
import { RestaurantService } from './services/restaurant/restaurant.service';
import { NavbarComponent } from './navbar/navbar.component';
import { HomeComponent } from './home/home.component';
import { NgbdCarouselConfig } from './carousel-config/carousel-config.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NavbarComponent,
    HomeComponent,
    NgbdCarouselConfig
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
    AdminRoutingModule,
    AdminModule,
    RestaurantModule,
    RestaurantRoutingModule,
    NgbModule.forRoot()
  ],
  providers: [AuthService, RestaurantService],
  bootstrap: [AppComponent]
})
export class AppModule { }
