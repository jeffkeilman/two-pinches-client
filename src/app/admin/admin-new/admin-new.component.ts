import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-new',
  templateUrl: './admin-new.component.html',
  styleUrls: ['./admin-new.component.css']
})
export class AdminNewComponent implements OnInit {

  newRestaurant = <any>{};

  constructor() { }

  ngOnInit() {
  }

  addRestaurant() {
    // TODO: Actually do the thing
    console.log(JSON.stringify(this.newRestaurant));
  }

}
