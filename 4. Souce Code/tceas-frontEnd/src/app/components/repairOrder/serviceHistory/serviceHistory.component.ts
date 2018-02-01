import { ServiceHistoryModel } from './../models/serviceHistory.model';
import { AppConfig } from './../../../config/app.config';
import { RepairOrderService } from './../services/repairOrder.service';

import { Component, OnInit } from '@angular/core';
@Component({
    selector: 'service-history',
    templateUrl: './serviceHistory.component.html',
    styleUrls: ['./serviceHistory.style.css']
})

export class ServiceHistoryComponent implements OnInit {

    serviceHistories: ServiceHistoryModel[];

    constructor(private repairOrderService: RepairOrderService,
        private appConfig: AppConfig) { }

    ngOnInit(): void {

    }

    async loadServiceHistories(vehicleCustomerId: any) {
        if (vehicleCustomerId) {
            this.serviceHistories = await this.repairOrderService.getRepairOrderHistories(vehicleCustomerId);
        }
        else {
            this.serviceHistories = [];
        }
    }
}