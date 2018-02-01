import { Component, ViewEncapsulation } from '@angular/core';
import { AppState } from "./app.service";
import { Constants } from "./config/app.constant";

/*
 * App Component
 * Top Level Component
 */
@Component({
    selector: 'app',
    encapsulation: ViewEncapsulation.None,
    styleUrls: [
        './scss/application.scss'
    ],
    template: `<router-outlet></router-outlet>`
})

export class App {
    constructor(public appState: AppState, private constant: Constants) {
        appState.set(constant.DASHBOARD_CLICK_SEARCH_CUSTOMER, false);
    }

    ngOnInit() {
        console.log('Initial App State', this.appState.state);
    }
}
