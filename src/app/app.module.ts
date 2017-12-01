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
import { AuthModule } from './auth/auth.module';
import { AuthRoutingModule } from './auth/auth-routing.module';

import { AppComponent } from './app.component';
import { RestaurantService } from './services/restaurant/restaurant.service';
import { NavbarComponent } from './navbar/navbar.component';
import { HomeComponent } from './home/home.component';
import { NgbdCarouselConfig } from './carousel-config/carousel-config.component';
import { SecretComponent } from './secret/secret.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    NgbdCarouselConfig,
    SecretComponent
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
    AuthModule,
    AuthRoutingModule,
    NgbModule.forRoot()
  ],
  providers: [RestaurantService],
  bootstrap: [AppComponent]
})
export class AppModule { }
