import { VehicleCustomerService } from './../shared/services/vehicleCustomer.service';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from "@angular/forms";
import { CustomFormsModule } from 'ng2-validation'
import { CommonModule } from "@angular/common";

import { routes } from './appointment.routes';

import { AppointmentComponent } from "./appointment.component";
import { SearchAppointmentComponent } from "./search/searchAppointment.component";
import { SharedModule } from "../shared/shared.module";
import { AddUpdateAppointmentComponent } from "./addUpdate/addUpdateAppointment.component";
import { AppointmentService } from "./services/appointment.service";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        CustomFormsModule,
        SharedModule,
        RouterModule.forChild(routes)
    ],
    declarations: [
        AppointmentComponent,
        SearchAppointmentComponent,
        AddUpdateAppointmentComponent
    ],
    providers: [AppointmentService, VehicleCustomerService],
})

export class AppointmentModule {
    static routes = routes;
}
