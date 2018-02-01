import { Component, OnInit } from '@angular/core';
import { DashboardService } from './services/dashboard.service';

declare var $: any;

@Component({
    template: `
    <router-outlet></router-outlet>
`
})

export class DashboardComponent implements OnInit {

    constructor() { }

    ngOnInit(): void {
    }

    openAppoimentBoardModal() {
        $('#appointmentBoard-modal').modal('show');
    }
}