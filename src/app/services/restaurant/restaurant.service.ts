import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { environment } from '../../../environments/environment';

@Injectable()
export class RestaurantService {

  constructor(
    private http : Http
  ) { }

  show(id) {
    return this.http.get(environment.apiServer + '/restaurants/' + id);
  }

  index() {
    return this.http.get(environment.apiServer + '/restaurants');
  }

}
