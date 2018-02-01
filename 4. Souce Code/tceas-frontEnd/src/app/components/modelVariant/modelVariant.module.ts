import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";

import { SearchModelVariantComponent } from "./search/searchModelVariant.component";
import { AddUpdateModelVariantComponent } from "./addUpdate/addUpdateModelVariant.component";
import { SharedModule } from "../shared/shared.module";
import { ModelVariantComponent } from "./modelVariant.component";
import { ModelVariantService } from "./services/modelVariant.service";
import { VehicleMakeService } from "../vehicleMake/services/vehicleMake.service";
import { VehicleModelService } from "../vehicleModel/services/vehicleModel.service";
import { Ng2Bs3ModalModule } from "ng2-bs3-modal/ng2-bs3-modal";
import { routes } from "./modelVariant.routes";

/* export const routes = [
    { path: '', component: SearchModelVariantComponent, pathMatch: 'full' }
]; */

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        SharedModule,
        Ng2Bs3ModalModule,
        RouterModule.forChild(routes)
    ],
    declarations: [
        ModelVariantComponent,
        SearchModelVariantComponent,
        AddUpdateModelVariantComponent,
    ],
    providers: [ModelVariantService, VehicleMakeService, VehicleModelService],
})

export class ModelVariantModule {
    static routes = routes;
}
