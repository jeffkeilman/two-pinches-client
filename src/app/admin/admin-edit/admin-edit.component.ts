import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { AdminService } from '../../services/admin/admin.service';
import { RestaurantService } from '../../services/restaurant/restaurant.service';

import * as Noty from 'noty';
import * as createDOMPurify from 'dompurify';
const DOMPurify = createDOMPurify(window);

@Component({
  selector: 'app-admin-edit',
  templateUrl: './admin-edit.component.html',
  styleUrls: ['./admin-edit.component.css']
})
export class AdminEditComponent implements OnInit {

  editRestaurant = <any>{};

  constructor(
    private route : ActivatedRoute,
    private router : Router,
    private adminService : AdminService,
    private restaurantService : RestaurantService
  ) { }

  ngOnInit() {
    this.route.params.forEach(param => {
      if (param.id) {
        this.restaurantService.show(param.id)
          .subscribe(
            data => {
              this.editRestaurant = JSON.parse(data['_body']).restaurant;
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
    });
  }

  editTheRestaurant(form) {
    this.adminService.edit(this.editRestaurant)
      .subscribe(
        data => {
          new Noty({
            type: 'success',
            text: 'Review updated!',
            layout: 'topCenter',
            animation: {
                open: 'animated bounceInDown',
                close: 'animated bounceOutUp'
            },
            timeout: 3000
          }).show();
          this.router.navigate(['admin']);
        },
        err => {
          new Noty({
            type: 'error',
            text: 'Couldn\'t update the review...',
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

  cancelEdit() {
    this.router.navigate(['admin/search']);
  }

}
