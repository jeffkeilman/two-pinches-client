import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from '../../services/admin/admin.service';

import * as Noty from 'noty';
import * as createDOMPurify from 'dompurify';
const DOMPurify = createDOMPurify(window);

@Component({
  selector: 'app-admin-new',
  templateUrl: './admin-new.component.html',
  styleUrls: ['./admin-new.component.css']
})
export class AdminNewComponent implements OnInit {

  newRestaurant = <any>{
    name: '',
    address: '',
    pic_url: '',
    rating: '0',
    description: '',
    featured: false
  };

  constructor(
    private router : Router,
    private adminService : AdminService
  ) { }

  ngOnInit() {
  }

  addRestaurant(myForm) {
    const errors = [];
    for (let key in this.newRestaurant) {
      if (typeof(this.newRestaurant[key]) === 'string' && key !== 'rating') {
        this.newRestaurant[key] = DOMPurify.sanitize(this.newRestaurant[key]);
        this.newRestaurant[key] = this.newRestaurant[key].trim();
        if (!this.newRestaurant[key]) {
          errors.push(key);
          document.getElementById(key).style.borderColor = "red";
        } else {
          document.getElementById(key).style.borderColor = "lightgrey";
        }
      }
    }

    if (errors.length > 0) {
      new Noty({
        type: 'error',
        text: 'Please fill out all fields correctly!',
        layout: 'topCenter',
        animation: {
            open: 'animated bounceInDown',
            close: 'animated bounceOutUp'
        },
        timeout: 3000
      }).show();
    } else {
      // all set, make the new restaurant!
      this.adminService.createRestaurant(this.newRestaurant)
        .subscribe(
          data => {
            new Noty({
              type: 'success',
              text: 'New review added!',
              layout: 'topCenter',
              animation: {
                  open: 'animated bounceInDown',
                  close: 'animated bounceOutUp'
              },
              timeout: 3000
            }).show();
            this.router.navigate(["/admin"]);
          },
          err => {
            new Noty({
              type: 'error',
              text: 'Couldn\'t add new review...',
              layout: 'topCenter',
              animation: {
                  open: 'animated bounceInDown',
                  close: 'animated bounceOutUp'
              },
              timeout: 3000
            }).show();
          }
        );
    }
  }

  cancelAdd() {
    this.router.navigate(["/admin"]);
  }

}
