import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AdminService } from '../../services/admin/admin.service';

import * as createDOMPurify from 'dompurify';
const DOMPurify = createDOMPurify(window);

@Component({
  selector: 'app-admin-main',
  templateUrl: './admin-main.component.html',
  styleUrls: ['./admin-main.component.css']
})
export class AdminMainComponent implements OnInit {

  newSearch: String = '';

  constructor(
    private router : Router,
    private admin : AdminService
  ) { }

  ngOnInit() {
  }

  onSearch(searchBox) {
    this.newSearch = DOMPurify.sanitize(this.newSearch);
    this.newSearch = this.newSearch.trim();
    this.admin.setSearchTerm(this.newSearch);
    this.router.navigate(["admin/search"]);
  }

}
