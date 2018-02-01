import { VehicleMakeComponent } from './vehicleMake.component';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SearchVehicleMakeComponent } from "./search/searchVehicleMake.component";
import { VehicleMakeAddUpdateComponent } from "./addUpdate/addUpdateVehicleMake.component";
import { VehicleMakeService } from "./services/vehicleMake.service";
import { SharedModule } from "../shared/shared.module";
import { routes } from './vehicleMake.routes';
import { SearchVehicleMakeComponentV2 } from './search_v2/make.component';


@NgModule({
    imports: [
        SharedModule,
        RouterModule.forChild(routes)],
    declarations: [
        VehicleMakeComponent,
        SearchVehicleMakeComponent,
        VehicleMakeAddUpdateComponent,
        SearchVehicleMakeComponentV2
    ],
    providers: [VehicleMakeService],
})

export class VehicleMakeModule {
    static routes = routes;
}
