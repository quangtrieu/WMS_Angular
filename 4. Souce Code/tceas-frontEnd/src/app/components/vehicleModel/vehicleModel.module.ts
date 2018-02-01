import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";

import { SearchVehicleModelComponent } from "./search/searchVehicleModel.component";
import { AddUpdateVehicleModelComponent } from "./addUpdate/addUpdateVehicleModel.component";
import { SharedModule } from "../shared/shared.module";
import { routes } from './vehicleModel.routes';
import { Ng2Bs3ModalModule } from "ng2-bs3-modal/ng2-bs3-modal";
import { VehicleModelComponent } from "./vehicleModel.component";
import { VehicleModelService } from "./services/vehicleModel.service";
import { VehicleMakeService } from "../vehicleMake/services/vehicleMake.service";
/* export const routes = [
    { path: '', component: SearchVehicleModelComponent, pathMatch: 'full' }
]; */

@NgModule({
    imports: [
        SharedModule,
        Ng2Bs3ModalModule,
        RouterModule.forChild(routes)],
    declarations: [
        VehicleModelComponent,
        SearchVehicleModelComponent,
        AddUpdateVehicleModelComponent,
    ],
    providers: [VehicleModelService, VehicleMakeService],
})

export class VehicleModelModule {
    static routes = routes;
}
