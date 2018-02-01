import { SharedModule } from './../shared/shared.module';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { routes } from './vehicle.routes';

import { VehicleSearchComponent } from "./search/searchVehicle.component";
import { VehicleAddUpdateComponent } from "./addUpdate/addUpdateVehicle.component";
import { VehicleComponent } from "./vehicle.component";

import { Ng2Bs3ModalModule } from 'ng2-bs3-modal/ng2-bs3-modal';
import { Select2Module } from 'ng2-select2';

@NgModule({
    imports: [
        CommonModule, 
        FormsModule,
        Ng2Bs3ModalModule,
        Select2Module,
        SharedModule,
        RouterModule.forChild(routes)],
    declarations: [
        VehicleComponent,
        VehicleSearchComponent,
        VehicleAddUpdateComponent
    ],
    providers: [],
})

export class VehicleModule {
    static routes = routes;
}
