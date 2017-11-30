import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

import * as Noty from 'noty';

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => {
    new Noty({
      type: 'error',
      text: 'Unable to load Bootstrap...',
      layout: 'topCenter',
      animation: {
          open: 'animated bounceInDown',
          close: 'animated bounceOutUp'
      },
      timeout: 3000
    }).show();
  });
