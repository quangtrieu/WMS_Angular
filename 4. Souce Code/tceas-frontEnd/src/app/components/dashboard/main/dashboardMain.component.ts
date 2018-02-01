import { TranslateService } from '@ngx-translate/core';
import { Utils } from './../../../commons/app.utils';
import { VehicleService } from './../../vehicle/services/vehicle.service';
import { Component, OnInit } from '@angular/core';
import { TimeSlot } from "../../shared/models/timeSlot.model";
import { DummyData } from "../../../../dummydata/dummydata";
declare var $: any;

@Component({
    selector: 'dashboard-main',
    templateUrl: './dashboardMain.component.html',
    styleUrls: ['./../dashboard.style.css']
})

export class DashboardMainComponent implements OnInit {

    constructor() { }

    ngOnInit(): void {
    }

    openAppoimentBoardModal() {
        $('#appointmentBoard-modal').modal('show');
    }
}