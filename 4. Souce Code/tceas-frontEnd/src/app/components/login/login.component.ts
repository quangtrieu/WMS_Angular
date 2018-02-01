import { Router } from '@angular/router';
import { Component, ViewEncapsulation, OnInit } from '@angular/core';

@Component({
    selector: 'login',
    templateUrl: './login.component.html',
    encapsulation: ViewEncapsulation.None,
    providers: [],
    host: {
        class: 'login-page app'
    }
})

export class Login implements OnInit {
    constructor() {
        console.log('login completed');
    }

    ngOnInit() { }
}
