import { Component, ViewEncapsulation } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'notFound',
  templateUrl: './notFound.component.html',
  encapsulation: ViewEncapsulation.None,
  host: {
    class: 'error-page app'
  },
})
export class NotFoundComponent {
  router: Router;

  constructor(router: Router) {
    this.router = router;
  }
}
